from django.urls import path
from .views import SessionLoginView

urlpatterns = [
    path('login/', SessionLoginView.as_view())
]