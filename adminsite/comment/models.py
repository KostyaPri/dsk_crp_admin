from django.db import models

class ComentUser(models.Model):
    username = models.CharField(max_length=200, verbose_name='Username')
    text = models.TextField(verbose_name='Text')
    rating = models.FloatField(verbose_name='Rating')