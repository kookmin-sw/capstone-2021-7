from django.shortcuts import render
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from django.db.models import Count

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated

from apps.category.models import *
from apps.account.models import *
from apps.account.serializers import *
from apps.utils import *

import boto3
import os


class RecommendCategory(APIView):
    permission_classes = (IsAuthenticated,)

    def recommendByAWS():
        personalizeRt = boto3.client(
            'personalize-runtime',
            region_name='ap-northeast-2',
            aws_access_key_id= os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key= os.getenv('AWS_SECRET_ACCESS_KEY')
        )
        response = personalizeRt.get_recommendations(
            campaignArn = "arn:aws:personalize:ap-northeast-2:287004205854:campaign/fooday-campaign-2", 
            userId = requset.user
        )
        smallCategoryList = []

        for item in response['itemList'][:4]:
            itemId = item['itemId']
            item = SmallCategory.objects.get(id = itemId)
            smallCategorydict = model_to_dict(item)
            smallCategorydict.pop("img")
            smallCategorydict.pop("tag")
            smallCategoryList.append(smallCategorydict)
        return smallCategoryList

    def recommendByWeather(weatherGroup):
        qs = User_Menu.objects.filter(weather = weatherGroup).select_related('menu').values('menu__smallCategory').annotate(count=Count('menu__smallCategory')).order_by('-count')
        smallCategoryList = []
        
        for i in qs[:4]:
            item = SmallCategory.objects.get(id = i['menu__smallCategory'])
            smallCategorydict = model_to_dict(item)
            smallCategorydict.pop("img")
            smallCategorydict.pop("tag")
            smallCategoryList.append(smallCategorydict)
        return smallCategoryList

    def recommendByTimeSlot(timeSlot):
        qs = User_Menu.objects.filter(timeSlot = timeSlot).select_related('menu').values('menu__smallCategory').annotate(count=Count('menu__smallCategory')).order_by('-count')
        smallCategoryList= []

        for i in qs[:4]:
            item = SmallCategory.objects.get(id = i['menu__smallCategory'])
            smallCategorydict = model_to_dict(item)
            smallCategorydict.pop("img")
            smallCategorydict.pop("tag")
            smallCategoryList.append(smallCategorydict)
        return smallCategoryList


    def post(self, request, format=None):
        location = request.data.get('location')

        timeSlot = setTimeSlot()
        lat, lng = geoCoding(location)
        description, temp, weatherGroup = openWeather(lat, lng)
        
        awsCategoryList = recommendByAWS()
        weatherCategoryList = recommendByWeather(weatherGroup)
        timeSlotCategoryList = recommendByTimeSlot(timeSlot)

        return Response({
            "awsCategoryList" : awsCategoryList,
            "weatherCategoryList" : weatherCategoryList,
            "timeSlotCategoryList" : timeSlotCategoryList
        })