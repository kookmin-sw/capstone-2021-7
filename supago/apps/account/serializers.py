from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['phoneNumber','password','age','sex','userType']
        read_only_fields = ['last_login','createdAt']

class PhoneAuthSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhoneAuth
        fields = ['phoneNumber']
        read_only_fields = ['tempNumber','createdAt']