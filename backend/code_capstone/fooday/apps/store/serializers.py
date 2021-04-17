from rest_framework import serializers
from .models import *

class StoreBigCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Store
        fields = ('__all__')

class MenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = ('__all__')
