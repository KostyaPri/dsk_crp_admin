# Generated by Django 3.2.3 on 2023-07-18 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rate', '0009_alter_rate_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rate',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='icons_coin/'),
        ),
    ]