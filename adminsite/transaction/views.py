from django.shortcuts import redirect
from rest_framework import generics
from .serializer import TransactionSerializer
from rest_framework.permissions import AllowAny
from adminsite.permission import IsSuperUser
from adminsite.pagination import Pagination
from .models import TransactionRequest
from datetime import datetime
from django.db.models import Q
from rest_framework.response import Response
from django.http import HttpResponse, FileResponse
from django.conf import settings
import os
import zipfile


class CreateTransaction(generics.CreateAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [AllowAny]

#Transaction request class. Returns all unprocessed records in the database
#Only available to registered&admins
#We can get, create, edit, delete a record
class ProcessedTransaction(generics.CreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TransactionSerializer
    # pagination_class = Pagination
    permission_classes = [IsSuperUser]


    def get_queryset(self):
        queryset = TransactionRequest.objects.filter(processed=False, fo__block=False)
        return queryset.order_by('-id')

#Transaction history class. Returns all processed records in the database. It can also return a search by filters
#Only available to registered&admins
#We can get, edit, delete a record
class ProcessedTransactionRequestView(generics.ListAPIView, generics.RetrieveUpdateAPIView):
    serializer_class = TransactionSerializer
    pagination_class = Pagination
    permission_classes = [IsSuperUser]


    def get_queryset(self):
        queryset = TransactionRequest.objects.filter(processed=True)

        sold_currencies = self.request.query_params.getlist('sold_currency')
        bought_currencies = self.request.query_params.getlist('bought_currency')
        start_date = self.request.query_params.get('start_date', None)
        end_date = self.request.query_params.get('end_date', None)
        search = self.request.query_params.get('search')

        if sold_currencies:
            queryset = queryset.filter(sold_currency__in=sold_currencies)

        if bought_currencies:
            queryset = queryset.filter(bought_currency__in=bought_currencies)

        if start_date is not None:
            start_datetime = datetime.strptime(start_date, '%Y-%m-%d').date()
            queryset = queryset.filter(Q(datetime__gte=start_datetime))

        if end_date is not None:
            end_datetime = datetime.strptime(end_date, '%Y-%m-%d').date()
            queryset = queryset.filter(Q(datetime__lte=end_datetime))

        if search is not None:
            name_surname = search.split(' ')
            if len(name_surname) == 2:
                name, surname = name_surname
                queryset = queryset.filter(
                    Q(fo__name__icontains=name, fo__surname__icontains=surname) |
                    Q(fo__surname__icontains=name, fo__name__icontains=surname)
                )
            else:
                queryset = queryset.filter(
                    Q(fo__name__icontains=search) |
                    Q(fo__surname__icontains=search) |
                    Q(fo__email__icontains=search) |
                    Q(fo__telegram__icontains=search) |
                    Q(fo__phone_number__icontains=search) |
                    Q(transaction_id__icontains=search)
                )

        return queryset.order_by('-id')


class TransactionRequestDownloadView(generics.RetrieveAPIView):
    queryset = TransactionRequest.objects.all()
    permission_classes = [IsSuperUser]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.sold:
            if instance.vydana:
                file_path = os.path.join(settings.MEDIA_ROOT, str(instance.vydana))
                if os.path.exists(file_path):
                    with open(file_path, 'rb') as file:
                        response = HttpResponse(file, content_type='application/octet-stream')
                        response['Content-Disposition'] = f'attachment; filename="{instance.vydana.name}"'
                        return response
        else:

            files_to_download = []
            if instance.faktura:
                files_to_download.append(instance.faktura)
            if instance.pokladni:
                files_to_download.append(instance.pokladni)

            if files_to_download:
                zip_file_path = os.path.join(f'{settings.MEDIA_ROOT}/order/sold/', 'temp_files.zip')

                with zipfile.ZipFile(zip_file_path, 'w') as zip_file:
                    for file in files_to_download:
                        file_path = os.path.join(settings.MEDIA_ROOT, str(file))
                        if os.path.exists(file_path):
                            zip_file.write(file_path, os.path.basename(file_path))

                if os.path.exists(zip_file_path):
                    with open(zip_file_path, 'rb') as file:
                        response = HttpResponse(file, content_type='application/zip')
                        response['Content-Disposition'] = 'attachment; filename="transaction_files.zip"'
                        return response

        return Response(status=404)