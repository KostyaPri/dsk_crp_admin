# Generated by Django 4.1.5 on 2023-06-16 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comment', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comentuser',
            name='rating',
            field=models.FloatField(verbose_name='Rating'),
        ),
    ]