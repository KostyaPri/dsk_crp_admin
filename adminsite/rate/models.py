from django.db import models


# Create your models here.
class Rate(models.Model):
    SOLD_BOUGHT_CURRENCY = [
        ("S", "Sold"),
        ("B", "Bought"),
    ]
    sold_currency = models.CharField(max_length=10)
    bought_currency = models.CharField(max_length=10)
    coin_rate = models.FloatField()
    dollar_rate = models.FloatField()
    market_rate = models.FloatField()
    market_rate_other = models.FloatField()
    exchange_direction = models.CharField(max_length=1, choices=SOLD_BOUGHT_CURRENCY)
    hidden = models.BooleanField(default=False)
    round_num = models.IntegerField(default=0)
    image = models.FileField(upload_to='icons_coin/', blank=True, null=True)


class UsdToCzk(models.Model):
    usd = models.CharField(max_length=5)
    czk = models.CharField(max_length=5)
    usd_rate = models.FloatField()
    czk_rate = models.FloatField()