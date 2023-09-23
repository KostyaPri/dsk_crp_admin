# Generated by Django 3.2.3 on 2023-06-06 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0008_auto_20230602_1258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transactionrequest',
            name='bought_amount',
            field=models.DecimalField(decimal_places=10, max_digits=10, verbose_name='Bought amount'),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='coin_rate',
            field=models.DecimalField(decimal_places=10, max_digits=10, verbose_name='Coin rate'),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='dollar_rate',
            field=models.DecimalField(decimal_places=10, max_digits=10, verbose_name='Dollar rate'),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='market_rate',
            field=models.DecimalField(decimal_places=10, max_digits=10, verbose_name='Market rate'),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='sold_amount',
            field=models.DecimalField(decimal_places=10, max_digits=10, verbose_name='Sold amount'),
        ),
        migrations.AlterField(
            model_name='transactionrequest',
            name='transaction_rate',
            field=models.DecimalField(decimal_places=10, max_digits=10, verbose_name='Transaction rate'),
        ),
    ]
