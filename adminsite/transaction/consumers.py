from channels.generic.websocket import WebsocketConsumer
from django.db.models.signals import post_save, post_delete
from .models import TransactionRequest
from blank.models import Fo
import json


class TransactionConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.count_transactions()

        post_save.connect(self.transaction_saved, sender=TransactionRequest)
        post_delete.connect(self.transaction_deleted, sender=TransactionRequest)
        post_save.connect(self.fo_saved, sender=Fo)


    def disconnect(self, close_code):
        post_save.disconnect(self.transaction_saved, sender=TransactionRequest)
        post_delete.disconnect(self.transaction_deleted, sender=TransactionRequest)
        post_save.disconnect(self.fo_saved, sender=Fo)

    def count_transactions(self):
        count = TransactionRequest.objects.filter(processed=False, fo__block=False).count()
        self.send(str(count))

    def transaction_saved(self, sender, instance, **kwargs):
        if not instance.processed:
            self.count_transactions()
        else:
            count = TransactionRequest.objects.filter(processed=False, fo__block=False).count()
            self.send(str(count))

    def transaction_deleted(self, sender, instance, **kwargs):
        count = TransactionRequest.objects.filter(processed=False, fo__block=False).count()
        self.send(str(count))

    def fo_saved(self, sender, instance, **kwargs):
        if instance.block:
            self.count_transactions()
        else:
            count = TransactionRequest.objects.filter(processed=False, fo__block=False).count()
            self.send(str(count))


class TransactionViewsConsumers(WebsocketConsumer):
    def connect(self):
        self.accept()

        self.transactions_view()

        post_save.connect(self.transactions_saved, sender=TransactionRequest)
        post_delete.connect(self.transactions_deleted, sender=TransactionRequest)

    def disconnect(self, close_code):
        post_save.disconnect(self.transactions_saved, sender=TransactionRequest)
        post_delete.disconnect(self.transactions_deleted, sender=TransactionRequest)

    def transactions_view(self):
        transactions = TransactionRequest.objects.filter(processed=False, fo__block=False)
        tr_arr = []

        for transaction in transactions:
            tr_json = {
                        "id": transaction.id,
                        "transaction_id": transaction.transaction_id,
                        "datetime": transaction.datetime.isoformat(),
                        "exchange_direction": f"{transaction.sold_currency} - {transaction.bought_currency}",
                        "coin_rate": transaction.coin_rate,
                        "dollar_rate": transaction.dollar_rate,
                        "ip_address": transaction.ip_address,
                        "sold_currency": transaction.sold_currency,
                        "sold_amount": transaction.sold_amount,
                        "bought_currency": transaction.bought_currency,
                        "bought_amount": transaction.bought_amount,
                        "transaction_rate": transaction.transaction_rate,
                        "market_rate": transaction.market_rate,
                        "fo": {
                            "id": transaction.fo.id,
                            "name": transaction.fo.name,
                            "surname": transaction.fo.surname,
                            "birth_date": transaction.fo.birth_date.isoformat(),
                            "email": transaction.fo.email,
                            "telegram": transaction.fo.telegram,
                            "phone_number": transaction.fo.phone_number,
                            "block": transaction.fo.block,
                        },
                        "sold": transaction.sold,
                        "processed": transaction.processed,
                    }
            
            tr_arr.append(tr_json)
        

        self.send(json.dumps(tr_arr))

    def transactions_saved(self, sender, instance, created, **kwargs):
        if created:
            self.transactions_view()

    def transactions_deleted(self, sender, instance, **kwargs):
        self.transactions_view()