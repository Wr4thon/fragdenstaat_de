from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _

from cms.models.pluginmodel import CMSPlugin
from cms.models.fields import PageField
from cms.extensions import PageExtension
from cms.extensions.extension_pool import extension_pool

from filer.fields.image import FilerImageField
from filer.fields.file import FilerFileField

from taggit.models import Tag

from filingcabinet.models import PageAnnotation

from froide.foirequest.models import FoiRequest, FoiProject
from froide.publicbody.models import (
    Jurisdiction, Category, Classification, PublicBody
)
from froide.document.models import Document, DocumentCollection


@extension_pool.register
class FdsPageExtension(PageExtension):
    search_index = models.BooleanField(default=True)
    image = FilerImageField(
        null=True, blank=True, default=None,
        on_delete=models.SET_NULL, verbose_name=_("image")
    )


class PageAnnotationCMSPlugin(CMSPlugin):
    page_annotation = models.ForeignKey(
        PageAnnotation, related_name='+',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return str(self.page_annotation)


class DocumentEmbedCMSPlugin(CMSPlugin):
    doc = models.ForeignKey(
        Document, related_name='+',
        on_delete=models.CASCADE
    )
    page_number = models.PositiveIntegerField(default=1)
    settings = models.TextField(default='{}')

    def __str__(self):
        return 'Embed %s' % (self.doc,)


class DocumentCollectionEmbedCMSPlugin(CMSPlugin):
    collection = models.ForeignKey(
        DocumentCollection, related_name='+',
        on_delete=models.CASCADE
    )
    settings = models.TextField(default='{}')

    def __str__(self):
        return 'Embed %s' % (self.collection,)


class DocumentPagesCMSPlugin(CMSPlugin):
    title = models.CharField(max_length=255, blank=True)
    doc = models.ForeignKey(
        Document, related_name='+',
        on_delete=models.CASCADE
    )
    pages = models.CharField(max_length=255, blank=True)
    size = models.CharField(
        default='small',
        max_length=10, choices=(
            ('small', _('Small')),
            ('normal', _('Normal')),
            ('large', _('Large')),
        )
    )

    def __str__(self):
        return '%s: %s' % (self.doc, self.pages)

    def get_pages(self):
        page_numbers = list(self.get_page_numbers())
        pages = self.doc.page_set.filter(number__in=page_numbers)
        for page in pages:
            page.image_url = getattr(page, 'image_' + self.size, 'image_small').url
        return pages

    def get_page_numbers(self):
        if not self.pages:
            yield from range(1, self.doc.num_pages + 1)
            return
        parts = self.pages.split(',')
        for part in parts:
            part = part.strip()
            if '-' in part:
                start_stop = part.split('-')
                yield from range(int(start_stop[0]), int(start_stop[1]) + 1)
            else:
                yield int(part)


class PrimaryLinkCMSPlugin(CMSPlugin):
    TEMPLATES = [
        ('', _('Default template')),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    image = FilerImageField(null=True, blank=True, default=None,
        on_delete=models.SET_NULL, verbose_name=_("image"))

    url = models.CharField(_("link"), max_length=255,
        blank=True, null=True,
        help_text=_("if present image will be clickable"))
    page_link = PageField(null=True, blank=True,
        help_text=_("if present image will be clickable"),
        verbose_name=_("page link"))
    anchor = models.CharField(_("anchor"),
        max_length=128, blank=True, help_text=_("Page anchor."))

    template = models.CharField(_('Template'), choices=TEMPLATES,
                                default='', max_length=50, blank=True)

    def __str__(self):
        return self.title

    def link(self):
        if self.url:
            link = self.url
        elif self.page_link_id:
            link = self.page_link.get_absolute_url()
        else:
            link = ""
        if self.anchor:
            link += '#' + self.anchor
        return link


class FoiRequestListCMSPlugin(CMSPlugin):
    """
    CMS Plugin for displaying FoiRequests
    """

    TEMPLATES = [
        ('', _('Default template')),
    ]

    resolution = models.CharField(
        blank=True, max_length=50,
        choices=FoiRequest.RESOLUTION_FIELD_CHOICES
    )

    status = models.CharField(
        blank=True, max_length=50,
        choices=FoiRequest.STATUS_FIELD_CHOICES
    )

    project = models.ForeignKey(
        FoiProject, null=True, blank=True,
        on_delete=models.SET_NULL)

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True,
        on_delete=models.SET_NULL
    )

    tags = models.ManyToManyField(
        Tag, verbose_name=_('tags'), blank=True)

    jurisdiction = models.ForeignKey(
        Jurisdiction, null=True, blank=True,
        on_delete=models.SET_NULL
    )
    category = models.ForeignKey(
        Category, null=True, blank=True,
        on_delete=models.SET_NULL
    )
    classification = models.ForeignKey(
        Classification, null=True, blank=True,
        on_delete=models.SET_NULL
    )
    publicbody = models.ForeignKey(
        PublicBody, null=True, blank=True,
        on_delete=models.SET_NULL
    )

    number_of_entries = models.PositiveIntegerField(
        _('number of entries'), default=1,
        help_text=_('0 means all the entries'))
    offset = models.PositiveIntegerField(
        _('offset'), default=0,
        help_text=_('number of entries to skip from top of list'))
    template = models.CharField(
        _('template'), blank=True,
        max_length=250, choices=TEMPLATES,
        help_text=_('template used to display the plugin'))

    def __str__(self):
        return _('%s FOI requests') % self.number_of_entries

    @property
    def render_template(self):
        """
        Override render_template to use
        the template_to_render attribute
        """
        return self.template_to_render

    def copy_relations(self, old_instance):
        """
        Duplicate ManyToMany relations on plugin copy
        """
        self.tags.set(old_instance.tags.all())


class OneClickFoiRequestCMSPlugin(CMSPlugin):
    TEMPLATES = [
        ('', _('Default template')),
    ]

    foirequest = models.ForeignKey(
        FoiRequest, related_name='+',
        on_delete=models.CASCADE
    )
    redirect_url = models.CharField(default='', max_length=255, blank=True)
    reference = models.CharField(default='', max_length=255, blank=True)

    template = models.CharField(_('Template'), choices=TEMPLATES,
                                default='', max_length=50, blank=True)

    def __str__(self):
        return _('One click form for {}').format(self.foirequest)


class VegaChartCMSPlugin(CMSPlugin):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    vega_json = models.TextField(
        default='',
    )

    def __str__(self):
        return self.title


class SVGImageCMSPlugin(CMSPlugin):
    title = models.CharField(max_length=255)

    svg = FilerFileField(
        null=True, blank=True, default=None,
        on_delete=models.SET_NULL, verbose_name=_("image")
    )

    def __str__(self):
        return self.title


class DesignContainerCMSPlugin(CMSPlugin):
    TEMPLATES = [
        ('', _('Default template')),
        ('cms/plugins/designs/speech_bubble.html', _('Speech bubble')),
    ]
    BACKGROUND = [
        ('primary', _('Primary')),
        ('secondary', _('Secondary')),
        ('info', _('Info')),
        ('light', _('Light')),
        ('dark', _('Dark')),
        ('success', _('Success')),
        ('warning', _('Warning')),
        ('danger', _('Danger')),
        ('purple', _('Purple')),
        ('pink', _('Pink')),
        ('yellow', _('Yellow')),
        ('cyan', _('Cyan')),
        ('gray', _('Gray')),
        ('gray-dark', _('Gray Dark')),
        ('white', _('White')),
    ]
    STYLES = [
        ('', _('Default')),
        ('heavy', _('Heavy')),
    ]

    template = models.CharField(
        _('Template'), choices=TEMPLATES,
        default='', max_length=50, blank=True
    )
    background = models.CharField(
        _('Background'), choices=BACKGROUND,
        default='', max_length=50, blank=True
    )
    style = models.CharField(
        _('Style'), choices=STYLES,
        default='', max_length=50, blank=True
    )
