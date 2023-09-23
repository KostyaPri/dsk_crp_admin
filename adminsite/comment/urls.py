from django.urls import path
from .views import ComentDetail, ComentList, ComentCreate, CreateTransaction

urlpatterns = [
    path('coments/', ComentList.as_view()),
    path('coments/create/', ComentCreate.as_view()),
    path('coments/<int:pk>/', ComentDetail.as_view()),
]