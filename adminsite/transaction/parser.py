from bs4 import BeautifulSoup
import requests

def get_price():
    # give actual rate 1 dollar = ? czk
    url = "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/index.html"
    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")
    table = soup.find(class_="currency-table")
    one_dollar = table.findAll('tr')[-1].findAll('td')[-1].text

    return one_dollar

