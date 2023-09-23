from bs4 import BeautifulSoup
import requests
import django
import os
import datetime

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'adminsite.settings')
django.setup()

from rate.models import UsdToCzk

def get_price():
    # give actual rate 1 dollar = ? czk
    url = "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/index.html"
    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")
    table = soup.find(class_="currency-table")
    one_dollar = table.findAll('tr')[-1].findAll('td')[-1].text
    save_rate = UsdToCzk.objects.get(id=1)
    save_rate.czk_rate = float(one_dollar)
    save_rate.save()




# Получаем текущую дату
current_date = datetime.date.today()

# Проверяем, является ли текущий день субботой или воскресеньем
if current_date.weekday() in [5, 6]:  # 5 - суббота, 6 - воскресенье
    None
else:
    get_price()