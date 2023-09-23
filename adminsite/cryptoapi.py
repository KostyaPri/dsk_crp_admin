import ccxt
import django

import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'adminsite.settings')
django.setup()

from rate.models import Rate


def change_actual_rate():
    exchange = ccxt.okex({
        'apiKey': '273a7939-3d0c-4f82-bd46-f8337047db01',
        'secret': '9D8BEBDD035C5ABDA5C7E5F963DD5935',
        'password': '8Lf82nF*p6jdH3wg',
        'enableRateLimit': True,
    })

    all_rate = Rate.objects.all()

    for el in all_rate:
        coin_name = el.sold_currency
        if coin_name == 'USDT':
            continue
        # Отримайте актуальний курс
        symbol = f'{coin_name}/USDT'  # Пара торгів
        ticker = exchange.fetch_ticker(symbol)
        actual_price = ticker.get('bid')
        el.dollar_rate = actual_price
        el.save()

change_actual_rate()
