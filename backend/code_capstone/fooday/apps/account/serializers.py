from rest_framework import serializers
from .models import *

class UserMenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = User_Menu
        fields = ['user','menu','weather','timeSlot']
        read_only_fields = ['timestamp']

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username','password','phone','name','gender','taste','price','amount']
        read_only_fields = ['last_login','createdAt']

class UserSmallCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = User_SmallCategory
        fields = ('__all__')

class UserSmallCategoryFeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = User_SmallCategory_Feedback
        fields = ['user','smallCategory','scenario','score']
        read_only_fields = ['timestamp']