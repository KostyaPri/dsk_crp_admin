from django.shortcuts import render
from rest_framework import generics
from .serializer import RateSerializer, UsdToCzkSerializer
from .models import Rate, UsdToCzk
from rest_framework.permissions import AllowAny
from adminsite.permission import IsSuperUser


# Create your views here.
class RateApi(generics.ListAPIView):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    permission_classes = [AllowAny]



class HideRate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    permission_classes = [IsSuperUser]


class UsdToCzkView(generics.ListAPIView):
    queryset = UsdToCzk.objects.all()
    serializer_class = UsdToCzkSerializer
    permission_classes = [AllowAny]

class CreateRateApi(generics.CreateAPIView):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    permission_classes = [IsSuperUser]