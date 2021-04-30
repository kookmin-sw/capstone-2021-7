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


class MenuNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Menu
        fields = ('name',)


class StoreSmallCategorySerializer(serializers.ModelSerializer):

    menu = MenuNameSerializer(source='filtered_menu',many=True, read_only=False)
    class Meta:
        model = Store
        fields = ('__all__')