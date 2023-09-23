from django.db import models
from django.db.models.signals import post_save

# Create your models here.
class ClientActs(models.Model):
    business_name = models.CharField(max_length=255, blank=True, verbose_name='Business name:', null=True)
    id_number = models.CharField(max_length=255, blank=True, verbose_name='id:', null=True)
    address = models.CharField(max_length=255, blank=True, verbose_name='The exact address of the register office, including the state:', null=True)
    country_at_risk = models.BooleanField(default=False, verbose_name='Establishment in country at risk:')
    screening_of_the_client = models.BooleanField(default=False, verbose_name='Establishment in country at risk:')


class Fo(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    ID_CARD_CHOICES = (
        ('P', 'passport'),
        ('I', 'ID card'),
        ('D', 'driving licence'),
        ('R', 'residence permit'),
        ('O', 'other ID')
    )

    THE_CLIENT_CHOICES = (
        ('S', 'Statutor'),
        ('P', 'power of attorney'),
        ('O', 'Ohter')
    )

    BIRTH_NUMBER_CHOICES = (
        ('A', 'allocated'),
        ('U', 'unassigned')
    )

    corresponds = models.BooleanField(default=False, verbose_name='Verification of form')
    name = models.CharField(max_length=550, blank=True, verbose_name='Name')
    surname = models.CharField(max_length=550, blank=True, verbose_name='Surname')
    phone_number = models.CharField(max_length=64, blank=True, null=True)
    email = models.EmailField(unique=False, verbose_name='Email', blank=True, null=True)
    telegram = models.CharField(max_length=255, verbose_name='Telegram', blank=True, null=True)
    birth_date = models.DateField(verbose_name='Date of birth', blank=True)
    place_birth = models.TextField(verbose_name='Place and country birth', blank=True, null=True)
    birth_number = models.CharField(max_length=1, choices=BIRTH_NUMBER_CHOICES, verbose_name='Birth number', blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, verbose_name='Gender', blank=True)
    nationality = models.TextField(verbose_name='Nationality', blank=True, null=True)
    address_residence = models.TextField(verbose_name='Exact address and country residence', blank=True, null=True)
    type_id_card = models.CharField(max_length=1, choices=ID_CARD_CHOICES, verbose_name='Type of ID card', blank=True)
    indetity_card_number = models.CharField(max_length=255, blank=True, verbose_name='Indetity card number', null=True)
    date_of_validity_from = models.CharField(max_length=255, blank=True, verbose_name='Date of validity from', null=True)
    date_of_validity_until = models.CharField(max_length=255, blank=True, verbose_name='Date of validity until', null=True)
    authority = models.CharField(max_length=255, blank=True, verbose_name='The authority that issued', null=True)
    country = models.CharField(max_length=255, blank=True, verbose_name='', null=True)
    pep_client = models.BooleanField(default=False, verbose_name='Is this person or PEP client')
    sanctions = models.BooleanField(default=False, verbose_name='Intarnational sanctions')
    client_acts = models.ForeignKey('ClientActs', on_delete=models.CASCADE, verbose_name='The client acts as the person engaged in business', blank=True, null=True)
    client_legal_entity = models.CharField(max_length=1, choices=THE_CLIENT_CHOICES, verbose_name='The client is legal entity', blank=True)
    internal_identifier = models.CharField(max_length=255, blank=True, verbose_name='Internal identifier', null=True)
    date_indentifier = models.DateTimeField(auto_now_add=True)
    skan_id = models.FileField(upload_to='document_fo_id/', blank=True, null=True)
    skan_wallet = models.FileField(upload_to='document_fo_wallet/', blank=True, null=True)
    skan_person = models.FileField(upload_to='document_fo_person/', blank=True, null=True)
    block = models.BooleanField(default=False)


class Po(models.Model):
    name_legal = models.CharField(max_length=500, blank=True, verbose_name='Name of the legal entity')
    id_b = models.CharField(max_length=255, blank=True, verbose_name='id')
    full_address = models.TextField(verbose_name='Full address of the register office, including state')
    suplier = models.ManyToManyField('Fo', verbose_name='List of all members of the statutor body')
    controlling_person = models.CharField(max_length=255, blank=True, verbose_name='Controlling person')
    real_or_pep = models.BooleanField(default=False, verbose_name='Are any of the real owners of PEP')
    risk_country = models.BooleanField(default=False, verbose_name='Settling in a risk country')
    sunctions = models.BooleanField(default=False, verbose_name='Any of the person are subject to international sanctions')
    internal_identifier = models.CharField(max_length=255, blank=True, verbose_name='Internal identifier')
    date_indentifier = models.DateTimeField(auto_now_add=True)
    skan = models.FileField(upload_to='document_po/')


class HighRiskCountries(models.Model):
    country = models.CharField(max_length=255)
    iso = models.CharField(max_length=10)
    fatf_list = models.BooleanField(default=False)
    eu_list = models.BooleanField(default=False)


class CountriesWithRisk(models.Model):
    country = models.CharField(max_length=255)
    iso = models.CharField(max_length=10)
    fatf_list = models.BooleanField(default=False)
    eu_list = models.BooleanField(default=False)