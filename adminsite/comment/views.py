from django.shortcuts import render
from rest_framework import generics
from .models import ComentUser
from .serializer import ComentSerializer
from transaction.models import TransactionRequest
from transaction.serializer import TransactionSerializer
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.permissions import AllowAny


class ComentList(generics.ListAPIView):
    queryset = ComentUser.objects.all()
    serializer_class = ComentSerializer
    permission_classes = [AllowAny]

class ComentCreate(generics.CreateAPIView):
    queryset = ComentUser.objects.all()
    serializer_class = ComentSerializer

class ComentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ComentUser.objects.all()
    serializer_class = ComentSerializer



