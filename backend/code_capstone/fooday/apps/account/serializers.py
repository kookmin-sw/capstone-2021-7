from rest_framework import serializers
from django.forms.models import model_to_dict

from .models import *
from apps.store.models import *
from django.utils import timezone

class OrderMenuSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order_Menu
        fields = ['order','menu']

class OrderSerializer(serializers.ModelSerializer):
    menu = serializers.SerializerMethodField() 

    class Meta:
        model = Order
        fields = ['id','menu','timestamp']

    def get_menu(self,obj):
        returnList= []
        menuList = obj.orderMenu.all()
        for menu in menuList:
            menu = model_to_dict(menu)
            returnList.append({ 
                "name" : menu['name'],
                "price": menu['price']
                })
        return returnList


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username','password','phone','name','gender','taste','price','amount']
        read_only_fields = ['last_login','createdAt']

# class UserSmallCategoryLikeSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User_SmallCategory_Like
#         fields = ['user','smallCategory','rating']
#         read_only_fields = ['timestamp']

class UserSmallCategoryFeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = User_SmallCategory_Feedback
        fields = ['user','smallCategory','scenario','score']
        read_only_fields = ['timestamp']