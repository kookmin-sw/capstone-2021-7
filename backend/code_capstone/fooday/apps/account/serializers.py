from rest_framework import serializers
from .models import *
from apps.store.models import *
from django.utils import timezone

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

class UserSmallCategoryLikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = User_SmallCategory_Like
        fields = ['user','smallCategory','rating']
        read_only_fields = ['timestamp']

class UserSmallCategoryFeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = User_SmallCategory_Feedback
        fields = ['user','smallCategory','scenario','score']
        read_only_fields = ['timestamp']