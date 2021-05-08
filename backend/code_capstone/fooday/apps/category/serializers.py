from rest_framework import serializers
from .models import *

class BigCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = BigCategory
        fields = ('__all__')

class SmallCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SmallCategory
        fields = ['id', 'name', 'img','bigCategory']