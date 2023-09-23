from django.urls import re_path
from .consumers import TransactionConsumer, TransactionViewsConsumers

websocket_urlpatterns = [
    re_path(r'ws/transactions/count/$', TransactionConsumer.as_asgi()),
    re_path(r'ws/transactions/$', TransactionViewsConsumers.as_asgi())
]