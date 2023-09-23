from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from rest_framework.views import APIView

class SessionLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse('Аутентификация прошла успешно')
        else:
            return HttpResponse('Неверные учетные данные', status=401)