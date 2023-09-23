from rest_framework import serializers
from .models import Rate, UsdToCzk


class RateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rate
        fields = '__all__'
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance


class UsdToCzkSerializer(serializers.ModelSerializer):

    class Meta:
        model = UsdToCzk
        fields = '__all__'