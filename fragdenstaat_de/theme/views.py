from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.http import require_POST
from django.contrib import messages

from froide.foirequest.models import FoiRequest, FoiMessage
from froide.foirequest.views.request_actions import allow_write_foirequest
from froide.publicbody.models import PublicBody
from froide.frontpage.models import FeaturedRequest
from froide.helper.cache import cache_anonymous_page

from .glyphosat import get_glyphosat_document


@cache_anonymous_page(15 * 60)
def index(request):
    successful_foi_requests = FoiRequest.published.successful()[:6]
    featured = (FeaturedRequest.objects.all()
                                       .order_by("-timestamp")
                                       .select_related('request',
                                                       'request__public_body'))
    return render(request, 'index.html', {
        'featured': featured[:3],
        'successful_foi_requests': successful_foi_requests,
        'foicount': FoiRequest.objects.get_send_foi_requests().count(),
        'pbcount': PublicBody.objects.get_list().count()
    })


@require_POST
@allow_write_foirequest
def glyphosat_download(request, foirequest, message_id):
    message = get_object_or_404(FoiMessage, request=foirequest, pk=message_id)
    is_message = (
        message.request.campaign_id == 9 and
        message.is_response and
        'Kennwort lautet:' in message.plaintext
    )
    if not is_message:
        messages.add_message(request, messages.ERROR, 'Leider ist etwas schief gelaufen.')
        return redirect(foirequest)

    if not request.POST.get('confirm-notes') == '1':
        messages.add_message(request, messages.ERROR, 'Sie müssen die Infos zur Kenntnis nehmen!')
        return redirect(foirequest)

    result = get_glyphosat_document(message)
    if result:
        return redirect(result)

    messages.add_message(request, messages.ERROR, 'Leider ist etwas schief gelaufen.')
    return redirect(foirequest)
