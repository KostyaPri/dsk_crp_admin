from rest_framework import serializers
from .models import TransactionRequest
from blank.models import Fo


class FoForNewOrder(serializers.ModelSerializer):

    class Meta:
        model = Fo
        fields = ['id', 'name', 'surname', 'birth_date', 'email', 'telegram', 'phone_number', 'block']
        read_only_fields = ['id']


class TransactionSerializer(serializers.ModelSerializer):
    fo = FoForNewOrder()

    class Meta:
        model = TransactionRequest
        fields = ['id', 'transaction_id', 'datetime', 'exchange_direction', 'coin_rate', 'dollar_rate', 'ip_address', 'sold_currency', 'sold_amount',
                  'bought_currency', 'bought_amount', 'transaction_rate', 'market_rate', 'fo', 'sold', 'processed']
        read_only_fields = ['transaction_id']

        
    def create(self, validated_data):
        fo_data = validated_data.pop('fo', {})
        fo_number = fo_data.get('phone_number')
        print(fo_number)

        if fo_number:
            try:
                fo = Fo.objects.get(phone_number=fo_number)
            except Fo.DoesNotExist:
                fo_serializer = FoForNewOrder(data=fo_data)
                fo_serializer.is_valid(raise_exception=True)
                fo = fo_serializer.save()

        transaction = TransactionRequest.objects.create(fo=fo, **validated_data)
        return transaction


    def update(self, instance, validated_data):
        fo_id = validated_data.pop('fo_id', None)
        fo_data = validated_data.pop('fo', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
