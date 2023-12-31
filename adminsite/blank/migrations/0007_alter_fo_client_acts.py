# Generated by Django 3.2.3 on 2023-06-02 05:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blank', '0006_alter_fo_client_acts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='fo',
            name='client_acts',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='blank.clientacts', verbose_name='The client acts as the person engaged in business'),
        ),
    ]
