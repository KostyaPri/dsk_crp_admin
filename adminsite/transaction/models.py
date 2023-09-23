from django.db import models
from blank.models import Fo
from django.utils import timezone
from adminsite.settings import MEDIA_ROOT, MEDIA_URL
from django.template.loader import get_template, render_to_string
from rate.models import UsdToCzk 
import pdfkit
from datetime import datetime, date
import math


# Create your models here.
class TransactionRequest(models.Model):
    transaction_id = models.CharField(max_length=64, blank=True, null=True)
    datetime = models.DateTimeField(auto_now_add=True)
    exchange_direction = models.CharField(max_length=100, verbose_name='Exchange direction') 
    coin_rate = models.FloatField()
    dollar_rate = models.FloatField()
    ip_address = models.CharField(max_length=64, verbose_name='IP Address')

    sold_currency = models.CharField(max_length=100, verbose_name='Sold currency')
    sold_amount = models.FloatField()
    bought_currency = models.CharField(max_length=1000, verbose_name='Bought currency')
    bought_amount = models.FloatField()
    transaction_rate = models.FloatField()
    market_rate = models.FloatField()

    processed = models.BooleanField(default=False, verbose_name='Processed')
    fo = models.ForeignKey(Fo, on_delete=models.CASCADE)
    sold = models.BooleanField(default=False)

    faktura = models.FileField(upload_to='order/sold/', blank=True, null=True)
    pokladni = models.FileField(upload_to='order/sold/', blank=True, null=True)
    vydana = models.FileField(upload_to='order/bought/', blank=True, null=True)


    def save(self, *args, **kwargs):
        if not self.transaction_id:
            last_id = TransactionRequest.objects.order_by('-id').first()
            if last_id is None:
                new_id = 1
            else:
                new_id = last_id.id + 1
            current_year = timezone.now().year
            self.transaction_id = f"{current_year}{str(new_id).zfill(4)}"

        if self.processed is True:
            czk = UsdToCzk.objects.get(id=1)
            options = {
                'dpi': '300',
                'margin-top': '0.75in',
                'margin-right': '0.75in',
                'margin-bottom': '0.75in',
                'margin-left': '0.75in',
                'encoding': "UTF-8",
            }
            
            if self.sold is True:
                flag = False
                try:
                    if self.vydana:
                        flag = True
                except:
                    flag = False

                if flag is False:
                    options = {
                        'dpi': '300',
                        'page-size': 'A4',
                        'margin-top': '0.75in',
                        'margin-right': '0.75in',
                        'margin-bottom': '0.75in',
                        'margin-left': '0.75in',
                        'encoding': "UTF-8",
                    }

                    date_transaction = datetime.strptime(str(date.today()), "%Y-%m-%d").strftime("%d.%m.%Y")
                    today = datetime.strptime(str(date.today()), "%Y-%m-%d").strftime("%d.%m.%Y")
                    end_rate = round(float(self.sold_amount * (self.dollar_rate * czk.czk_rate)), 2)
                    round_num = round(math.ceil(end_rate) - end_rate, 2)
                    value = {'datetime': date_transaction,
                            'datenow': today,
                            'transaction_id': self.transaction_id,
                            "currency": self.sold_currency,
                            "amount": float(self.sold_amount),
                                "rate": round((self.dollar_rate*czk.czk_rate), 2),
                                "end_rate": end_rate, 
                                "round": round_num, 
                                "full_price": math.ceil(end_rate)}

                    html = get_template('vydana4.html').render(value)
                    pdf_name = f'{MEDIA_ROOT}/order/bought/Vydana{self.transaction_id}.pdf'
                    pdfkit.from_string(html, pdf_name, options=options)
                    self.vydana = f'order/bought/Vydana{self.transaction_id}.pdf'

            else:
                flag = False
                try:
                    if self.faktura or self.pokladni:
                        flag = True
                except:
                    flag = False

                if flag is False:      
                    date_transaction = datetime.strptime(str(date.today()), "%Y-%m-%d").strftime("%d.%m.%Y")
                    today = datetime.strptime(str(date.today()), "%Y-%m-%d").strftime("%d.%m.%Y")
                    end_rate = round(float(self.bought_amount * (self.coin_rate * czk.czk_rate)), 2)
                    value = {'datetime': date_transaction,
                            'datenow': today,
                            'transaction_id': self.transaction_id,
                            "currency": self.bought_currency,
                            "amount": float(self.bought_amount),
                                "rate": round(float(self.coin_rate * czk.czk_rate), 2),
                                "end_rate": end_rate,
                                "full_rate": round((end_rate/100)*(100-float(self.market_rate)), 2)}
                                
                    html_pr = get_template('Faktura4.html').render(value)
                    pdf_name = f'{MEDIA_ROOT}/order/sold/Faktura{self.transaction_id}.pdf'
                    pdfkit.from_string(html_pr, pdf_name, options=options)
                    self.faktura = f'order/sold/Faktura{self.transaction_id}.pdf'

                    html_pr = get_template('Pokladni4.html').render(value)
                    pdf_name = f'{MEDIA_ROOT}/order/sold/Pokladni{self.transaction_id}.pdf'
                    pdfkit.from_string(html_pr, pdf_name, options=options)
                    self.pokladni = f'order/sold/Pokladni{self.transaction_id}.pdf'
                

        super().save(*args, **kwargs)
