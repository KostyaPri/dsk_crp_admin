from django.urls import path, include
from .views import ProcessedTransaction, ProcessedTransactionRequestView, TransactionRequestDownloadView, CreateTransaction


urlpatterns = [
    path('new_transaction/', CreateTransaction.as_view()), #Link to get a list of transaction requests
    path('new_transaction/<int:pk>/', ProcessedTransaction.as_view()), #Link
    path('history_transaction/', ProcessedTransactionRequestView.as_view()), #Link to get a list of transaction history.
                                                                #You can also get history by filters (?sold_currence=<sold_currence> or ?bought_currence=<bought_currence> or ?sold_currence=<sold_currence>&bought_currence=<bought_currence>) by currency,
                                                                #(?start_date=<start_date> or ?end_date=<end_date> or ?start_date=<start_date>&end_date=<end_date>) by date
    path('transaction-requests/<int:pk>/download/', TransactionRequestDownloadView.as_view()),
]
