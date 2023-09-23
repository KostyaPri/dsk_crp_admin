from rest_framework import serializers
from .models import ComentUser
from transaction.serializer import TransactionSerializer
from transaction.models import TransactionRequest


class ComentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ComentUser
        fields = '__all__'

