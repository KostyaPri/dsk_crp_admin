from django.db import models
from django.contrib.auth.models import AbstractUser
from blank.models import Fo

# Create your models here.
class CustomUser(AbstractUser):
    fo = models.OneToOneField(Fo, on_delete=models.CASCADE, blank=True, null=True)

    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        related_name='customuser_set',
        related_query_name='user'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        related_name='customuser_set',
        related_query_name='user'
    )