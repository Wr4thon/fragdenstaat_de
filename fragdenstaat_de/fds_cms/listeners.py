from django.dispatch.dispatcher import receiver

from cms.signals import post_publish, post_unpublish

from froide.helper.tasks import (
    search_instance_save, search_instance_delete
)


@receiver(post_publish, dispatch_uid='publish_cms_page')
def publish_cms_page(sender, instance, language, **kwargs):
    instance = instance.publisher_public.get_title_obj(language)
    search_instance_save.delay(instance._meta.label_lower, instance.pk)


@receiver(post_unpublish, dispatch_uid='unpublish_cms_page')
def unpublish_cms_page(sender, instance, language, **kwargs):
    instance = instance.publisher_public.get_title_obj(language)
    search_instance_delete.delay(instance._meta.label_lower, instance.pk)
