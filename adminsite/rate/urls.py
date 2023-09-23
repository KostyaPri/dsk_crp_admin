from django.urls import path
from .views import RateApi, HideRate, UsdToCzkView, CreateRateApi

urlpatterns = [
    path('rate/', RateApi.as_view()),
    path('rate/usd_czk/', UsdToCzkView.as_view()),
    path('rate/<int:pk>/', HideRate.as_view()),
    path('rate/create/', CreateRateApi.as_view())                                  
]