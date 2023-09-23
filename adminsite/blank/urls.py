from django.urls import path
from .views import UserList, UserListDetail, UserTransaction, UserCreateUpdate

urlpatterns = [
    path('user/', UserList.as_view()),
    path('user/<int:pk>/', UserListDetail.as_view()),
    path('user/transaction/<int:user_id>/', UserTransaction.as_view()),
    path('user/create/', UserCreateUpdate.as_view()),
    path('user/update/<int:pk>/', UserListDetail.as_view()),
]