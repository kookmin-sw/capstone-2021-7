from django.forms.models import model_to_dict

from rest_framework import serializers

from .models import *

class StoreBigCategorySerializer(serializers.ModelSerializer):
    menu = serializers.SerializerMethodField()
    
    class Meta:
        model = Store
        fields = ['id','menu','location','intro','name']

    def get_menu(self,obj):
        returnList= []
        menuList = obj.menu.all()

        for menu in menuList:
            menu = model_to_dict(menu)
            returnList.append({ "name" : menu['name']})
        return returnList

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