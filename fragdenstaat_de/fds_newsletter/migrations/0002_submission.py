# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-12-17 11:20
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('newsletter', '0004_auto_20180407_1043'),
        ('fds_newsletter', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Submission',
            fields=[
            ],
            options={
                'proxy': True,
                'indexes': [],
            },
            bases=('newsletter.submission',),
        ),
    ]
