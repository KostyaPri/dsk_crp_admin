# Generated by Django 3.2.3 on 2023-06-02 04:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blank', '0005_auto_20230602_0753'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fo',
            name='client_acts',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='blank.clientacts', verbose_name='The client acts as the person engaged in business'),
        ),
    ]
