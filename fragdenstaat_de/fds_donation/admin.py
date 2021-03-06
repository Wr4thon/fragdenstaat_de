from io import BytesIO

from django.db.models import Sum, Avg, Count
from django.contrib import admin, messages
from django.conf.urls import url
from django.contrib.admin.views.main import ChangeList
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect

from froide.helper.admin_utils import ForeignKeyFilter, make_nullfilter

from .models import DonationGift, Donor, Donation
from .external import import_banktransfers, import_paypal
from .filters import DateRangeFilter
from .services import send_donation_email


class DonorAdmin(admin.ModelAdmin):
    list_display = (
        'get_name', 'city',
        'active',
        'last_donation'
    )
    list_filter = (
        'active',
        make_nullfilter('subscription', _('Dauerspende')),
        'subscription__plan__amount_year',
        'email_confirmed', 'contact_allowed',
        'become_user',
        'receipt',
        'invalid',
        make_nullfilter('user_id', _('has user')),
        ('user', ForeignKeyFilter),
    )
    date_hierarchy = 'first_donation'
    search_fields = (
        'email', 'last_name', 'first_name', 'identifier', 'note'
    )
    raw_id_fields = ('user', 'subscription')

    def get_name(self, obj):
        return str(obj)
    get_name.short_description = 'Name'


class DonationChangeList(ChangeList):
    def get_results(self, *args, **kwargs):
        ret = super().get_results(*args, **kwargs)
        q = self.queryset.aggregate(
            amount_sum=Sum('amount'),
            amount_avg=Avg('amount'),
            amount_received_sum=Sum('amount_received'),
            donor_count=Count('donor_id', distinct=True),
        )
        self.amount_sum = q['amount_sum']
        self.amount_avg = round(q['amount_avg']) if q['amount_avg'] is not None else '-'
        self.amount_received_sum = q['amount_received_sum']
        self.donor_count = q['donor_count']
        return ret


class DonationAdmin(admin.ModelAdmin):
    def get_changelist(self, request):
        return DonationChangeList

    list_display = (
        'donor', 'timestamp', 'amount', 'completed', 'received',
        'purpose',
        'reference', 'method', 'recurring',
    )
    list_filter = (
        'completed', 'received',
        ('timestamp', DateRangeFilter),
        'method',
        'purpose',
        'reference',
        'recurring',
        'receipt_given',
        ('donor', ForeignKeyFilter),
    )
    date_hierarchy = 'timestamp'
    raw_id_fields = ('donor', 'order', 'payment')
    search_fields = (
        'donor__email', 'donor__last_name', 'donor__first_name',
    )

    actions = ['resend_donation_mail']

    def resend_donation_mail(self, request, queryset):
        resent = 0
        sent = 0
        for donation in queryset:
            if donation.email_sent:
                resent += 1
            donation.email_sent = None
            result = send_donation_email(donation)
            if result:
                sent += 1

        self.message_user(
            request, _('Send %s donation mails (%s resent).') % (
                sent, resent
            ),
            level=messages.INFO
        )
    resend_donation_mail.short_description = _('Resend donation email')

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            url(r'^import-banktransfers/$',
                self.admin_site.admin_view(self.import_banktransfers),
                name='fds_donation-donation-import_banktransfers'),
            url(r'^import-paypal/$',
                self.admin_site.admin_view(self.import_paypal),
                name='fds_donation-donation-import_paypal'),
        ]
        return my_urls + urls

    def import_banktransfers(self, request):
        if not request.method == 'POST':
            raise PermissionDenied
        if not self.has_change_permission(request):
            raise PermissionDenied

        xls_file = request.FILES.get('file')
        xls_file = BytesIO(xls_file.read())

        count, new_count = import_banktransfers(xls_file)

        self.message_user(
            request, _('Imported %s rows, %s new rows.') % (
                count, new_count
            ),
            level=messages.INFO
        )

        return redirect('admin:fds_donation_donation_changelist')

    def import_paypal(self, request):
        if not request.method == 'POST':
            raise PermissionDenied
        if not self.has_change_permission(request):
            raise PermissionDenied

        csv_file = request.FILES.get('file')
        csv_file = BytesIO(csv_file.read())

        count, new_count = import_paypal(csv_file)

        self.message_user(
            request, _('Imported %s rows, %s new rows.') % (
                count, new_count
            ),
            level=messages.INFO
        )

        return redirect('admin:fds_donation_donation_changelist')


class DonationGiftAdmin(admin.ModelAdmin):
    list_display = ('name', 'category_slug')
    list_filter = ('category_slug',)
    search_fields = ('name',)


admin.site.register(Donor, DonorAdmin)
admin.site.register(Donation, DonationAdmin)
admin.site.register(DonationGift, DonationGiftAdmin)
