# Generated by Django 3.2.3 on 2023-05-30 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blank', '0002_auto_20230524_1723'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fo',
            name='skan',
        ),
        migrations.AddField(
            model_name='fo',
            name='skan_id',
            field=models.FileField(blank=True, null=True, upload_to='document_fo_id/'),
        ),
        migrations.AddField(
            model_name='fo',
            name='skan_wallet',
            field=models.FileField(blank=True, null=True, upload_to='document_fo_wallet/'),
        ),
    ]
