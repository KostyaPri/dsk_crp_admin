# Generated by Django 3.2.3 on 2023-05-29 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0003_transactionrequest_transaction_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transactionrequest',
            name='transaction_id',
            field=models.CharField(max_length=64),
        ),
    ]
