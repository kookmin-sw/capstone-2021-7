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
import requests

class RecommendCategory(APIView):
    permission_classes = (IsAuthenticated,)

    def recommendBySelf(self, user):
        URL = 'https://8ah7aceauf.execute-api.ap-northeast-2.amazonaws.com/getrecommendation'
        data = {'user_id':[user]}
        response = requests.post(URL, data=json.dumps(data))

        smallCategoryList = []
        for itemId in json.loads(response.json()["body"]):
            item = SmallCategory.objects.get(id = itemId)
            smallCategorydict = model_to_dict(item)
            smallCategorydict.pop("img")
            smallCategorydict.pop("tag")
            smallCategoryList.append(smallCategorydict)
        return smallCategoryList

    def recommendByAWS(self, user):
        personalizeRt = boto3.client(
            'personalize-runtime',
            region_name='ap-northeast-2',
            aws_access_key_id= os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key= os.getenv('AWS_SECRET_ACCESS_KEY')
        )
        response = personalizeRt.get_recommendations(
            campaignArn = "arn:aws:personalize:ap-northeast-2:287004205854:campaign/fooday-campaign-2",
            userId = str(user)
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

    def recommendByWeather(self, weatherGroup):
        qs = Order_Menu.objects.filter(order__weather = weatherGroup).select_related('menu').values('menu__smallCategory').annotate(count=Count('menu__smallCategory')).order_by('-count')
        smallCategoryList = []

        for i in qs[:4]:
            if i['menu__smallCategory']== None:
                continue
            item = SmallCategory.objects.get(id = i['menu__smallCategory'])
            smallCategorydict = model_to_dict(item)
            smallCategorydict.pop("img")
            smallCategorydict.pop("tag")
            smallCategoryList.append(smallCategorydict)
        return smallCategoryList

    def recommendByTimeSlot(self, timeSlot):
        qs = Order_Menu.objects.filter(order__timeSlot = timeSlot).select_related('menu').values('menu__smallCategory').annotate(count=Count('menu__smallCategory')).order_by('-count')
        smallCategoryList= []

        for i in qs[:4]:
            if i['menu__smallCategory']== None:
                continue
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

        selfCategoryList = self.recommendBySelf(request.user.id)
        awsCategoryList = self.recommendByAWS(request.user.id)
        weatherCategoryList = self.recommendByWeather(weatherGroup)
        timeSlotCategoryList = self.recommendByTimeSlot(timeSlot)

        return Response({
            "user" : request.user.id,
            "selfCategoryList" : selfCategoryList,
            "awsCategoryList" : awsCategoryList,
            "weatherCategoryList" : weatherCategoryList,
            "timeSlotCategoryList" : timeSlotCategoryList
        })

class RecommendCategoryForMany(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):

        user_ids = request.data.get('user_ids')
        URL = 'https://8ah7aceauf.execute-api.ap-northeast-2.amazonaws.com/getrecommendation'
        data = {'user_id': [request.user.id] + user_ids}
        response = requests.post(URL, data=json.dumps(data))

        smallCategoryList = []
        for itemId in json.loads(response.json()["body"]):
            item = SmallCategory.objects.get(id = itemId)
            smallCategorydict = model_to_dict(item)
            smallCategorydict.pop("img")
            smallCategorydict.pop("tag")
            smallCategoryList.append(smallCategorydict)

        return Response({
            "user" : request.user.id,
            "smallCategoryList" : smallCategoryList
        })