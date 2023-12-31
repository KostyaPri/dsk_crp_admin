# Generated by Django 3.2.3 on 2023-05-24 14:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('blank', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TransactionRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('datetime', models.DateTimeField(auto_now_add=True)),
                ('exchange_direction', models.CharField(max_length=100, verbose_name='Exchange direction')),
                ('coin_rate', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Coin rate')),
                ('dollar_rate', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Dollar rate')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('surname', models.CharField(max_length=255, verbose_name='Surname')),
                ('ip_address', models.CharField(max_length=64, verbose_name='IP Address')),
                ('sold_currency', models.CharField(max_length=100, verbose_name='Sold currency')),
                ('sold_amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Sold amount')),
                ('bought_currency', models.CharField(max_length=100, verbose_name='Bought currency')),
                ('bought_amount', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Bought amount')),
                ('transaction_rate', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Transaction rate')),
                ('market_rate', models.DecimalField(decimal_places=2, max_digits=10, verbose_name='Market rate')),
                ('processed', models.BooleanField(default=False, verbose_name='Processed')),
                ('fo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blank.fo')),
            ],
        ),
    ]
