# Generated by Django 3.2.3 on 2023-05-31 14:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blank', '0003_auto_20230530_1648'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fo',
            name='worker',
        ),
        migrations.RemoveField(
            model_name='po',
            name='worker',
        ),
        migrations.DeleteModel(
            name='Worker',
        ),
    ]
