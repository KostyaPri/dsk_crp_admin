# Generated by Django 4.2.2 on 2023-07-23 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0014_remove_transactionrequest_processed'),
    ]

    operations = [
        migrations.AddField(
            model_name='transactionrequest',
            name='processed',
            field=models.BooleanField(default=False, verbose_name='Processed'),
        ),
    ]