# Generated by Django 3.2.3 on 2023-05-24 14:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ClientActs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('business_name', models.CharField(blank=True, max_length=255, verbose_name='Business name:')),
                ('id_number', models.CharField(blank=True, max_length=255, verbose_name='id:')),
                ('address', models.CharField(blank=True, max_length=255, verbose_name='The exact address of the register office, including the state:')),
                ('country_at_risk', models.BooleanField(default=False, verbose_name='Establishment in country at risk:')),
                ('screening_of_the_client', models.BooleanField(default=False, verbose_name='Establishment in country at risk:')),
            ],
        ),
        migrations.CreateModel(
            name='CountriesWithRisk',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=255)),
                ('iso', models.CharField(max_length=10)),
                ('fatf_list', models.BooleanField(default=False)),
                ('eu_list', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Fo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('corresponds', models.BooleanField(default=False, verbose_name='Verification of form')),
                ('name', models.CharField(blank=True, max_length=550, verbose_name='Name')),
                ('surname', models.CharField(blank=True, max_length=550, verbose_name='Surname')),
                ('phone_number', models.CharField(blank=True, max_length=64, null=True)),
                ('email', models.EmailField(blank=True, max_length=254, null=True, verbose_name='Email')),
                ('telegram', models.CharField(blank=True, max_length=255, null=True, verbose_name='Telegram')),
                ('birth_date', models.DateField(verbose_name='Date of birth')),
                ('place_birth', models.TextField(verbose_name='Place and country birth')),
                ('birth_number', models.CharField(choices=[('A', 'allocated'), ('U', 'unassigned')], max_length=1, verbose_name='Birth number')),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], max_length=1, verbose_name='Gender')),
                ('nationality', models.TextField(verbose_name='Nationality')),
                ('address_residence', models.TextField(verbose_name='Exact address and country residence')),
                ('type_id_card', models.CharField(choices=[('P', 'passport'), ('I', 'ID card'), ('D', 'driving licence'), ('R', 'residence permit'), ('O', 'other ID')], max_length=1, verbose_name='Type of ID card')),
                ('indetity_card_number', models.CharField(blank=True, max_length=255, verbose_name='Indetity card number')),
                ('date_of_validity_from', models.CharField(blank=True, max_length=255, verbose_name='Date of validity from')),
                ('date_of_validity_until', models.CharField(blank=True, max_length=255, verbose_name='Date of validity until')),
                ('authority', models.CharField(blank=True, max_length=255, verbose_name='The authority that issued')),
                ('country', models.CharField(blank=True, max_length=255, verbose_name='')),
                ('pep_client', models.BooleanField(default=False, verbose_name='Is this person or PEP client')),
                ('sanctions', models.BooleanField(default=False, verbose_name='Intarnational sanctions')),
                ('client_legal_entity', models.CharField(choices=[('S', 'Statutor'), ('P', 'power of attorney'), ('O', 'Ohter')], max_length=1, verbose_name='The client is legal entity')),
                ('internal_identifier', models.CharField(blank=True, max_length=255, verbose_name='Internal identifier')),
                ('date_indentifier', models.DateTimeField(auto_now_add=True)),
                ('skan', models.FileField(blank=True, null=True, upload_to='document_fo/')),
                ('client_acts', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='blank.clientacts', verbose_name='The client acts as the person engaged in business')),
            ],
        ),
        migrations.CreateModel(
            name='HighRiskCountries',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=255)),
                ('iso', models.CharField(max_length=10)),
                ('fatf_list', models.BooleanField(default=False)),
                ('eu_list', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Worker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=255, verbose_name='Worker name')),
                ('code_worker', models.CharField(blank=True, max_length=5, verbose_name='Code worker')),
            ],
        ),
        migrations.CreateModel(
            name='Po',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_legal', models.CharField(blank=True, max_length=500, verbose_name='Name of the legal entity')),
                ('id_b', models.CharField(blank=True, max_length=255, verbose_name='id')),
                ('full_address', models.TextField(verbose_name='Full address of the register office, including state')),
                ('controlling_person', models.CharField(blank=True, max_length=255, verbose_name='Controlling person')),
                ('real_or_pep', models.BooleanField(default=False, verbose_name='Are any of the real owners of PEP')),
                ('risk_country', models.BooleanField(default=False, verbose_name='Settling in a risk country')),
                ('sunctions', models.BooleanField(default=False, verbose_name='Any of the person are subject to international sanctions')),
                ('internal_identifier', models.CharField(blank=True, max_length=255, verbose_name='Internal identifier')),
                ('date_indentifier', models.DateTimeField(auto_now_add=True)),
                ('skan', models.FileField(upload_to='document_po/')),
                ('suplier', models.ManyToManyField(to='blank.Fo', verbose_name='List of all members of the statutor body')),
                ('worker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blank.worker', verbose_name='He made the identification')),
            ],
        ),
        migrations.AddField(
            model_name='fo',
            name='worker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blank.worker', verbose_name='He made the identification'),
        ),
    ]