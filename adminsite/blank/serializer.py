from rest_framework import serializers
from .models import Fo, ClientActs
from transaction.serializer import TransactionSerializer
from transaction.models import TransactionRequest


class FoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fo
        fields = ['id', 'name', 'surname', 'phone_number', 'email', 'telegram', 'corresponds', 'date_indentifier']


class ClientActSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(required=False)
    id_number = serializers.CharField(required=False)
    address = serializers.CharField(required=False)
    country_at_risk = serializers.BooleanField(required=False)
    screening_of_the_client = serializers.BooleanField(required=False)

    class Meta:
        model = ClientActs
        fields = ['id', 'business_name', 'id_number', 'address', 'country_at_risk', 'screening_of_the_client']


class FoDetailSerializer(serializers.ModelSerializer):
    client_acts = ClientActSerializer(required=False)
    transaction_count = serializers.SerializerMethodField()
    total_amount = serializers.SerializerMethodField()

    class Meta:
        model = Fo
        fields = ['id', 'corresponds', 'name', 'surname', 'phone_number', 'email', 'telegram', 'birth_date', 'place_birth', 'birth_number', 'gender',
                 'nationality', 'address_residence', 'type_id_card', 'indetity_card_number', 'date_of_validity_from', 'date_of_validity_until', 'authority', 'country',
                  'pep_client', 'sanctions', 'client_acts', 'client_legal_entity', 'internal_identifier', 'date_indentifier', 'skan_id', 'skan_wallet', 'skan_person', 
                  'transaction_count', 'total_amount', 'block']

    def get_transaction_count(self, obj):
        return TransactionRequest.objects.filter(fo=obj).count()

    def get_total_amount(self, obj):
        transactions = TransactionRequest.objects.filter(fo=obj, sold_currency='USD')
        total_sold = 0
        for l in transactions:
            total_sold += l.sold_amount

        transactions = TransactionRequest.objects.filter(fo=obj, bought_currency='USD')
        total_bought = 0
        for l in transactions:
            total_bought += l.bought_amount

        return round(float(total_sold + total_bought), 2)

    def create(self, validated_data):
        print(validated_data)
        client_data = validated_data.pop('client_acts', None)
        
        if client_data is not None:
            client_serializer = ClientActSerializer(data=client_data)
            client_serializer.is_valid(raise_exception=True)
            client = client_serializer.save()
            
            validated_data['client_acts'] = client
        
        fo = Fo.objects.create(**validated_data)
        return fo

    def update(self, instance, validated_data):
        client_data = validated_data.pop('client_acts', None)

        if client_data is not None:
            client_instance = instance.client_acts

            if client_instance is not None:
                client_serializer = ClientActSerializer(instance=client_instance, data=client_data)
                client_serializer.is_valid(raise_exception=True)
                client_serializer.update(client_instance, client_data)
            else:
                client_serializer = ClientActSerializer(data=client_data)
                client_serializer.is_valid(raise_exception=True)
                client_serializer.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

