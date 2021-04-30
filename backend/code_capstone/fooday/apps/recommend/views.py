from django.shortcuts import render
from django.forms.models import model_to_dict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User

from django.db.models import Count
import boto3
import os

from apps.category.models import SmallCategory
from apps.account.models import User_Menu
from apps.account.serializers import *
import requests
import json
import os


class RecommendCategory(APIView):

    def post(self, request, format=None):

        location = request.data.get('location')

        geocoding_url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=" + os.getenv('GOOGLE_APIKEY')
        geo_response = requests.get(geocoding_url)
        res = geo_response.json()
        lat = str(res['results'][0]['geometry']['location']['lat'])
        lng = str(res['results'][0]['geometry']['location']['lng'])
        print("lat : ",lat)
        print("lng : ",lng)
        openweathermap_url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" +lng +"&appid=" + os.getenv('OPENWEATHER_APIKEY')
        weather_response = requests.get(openweathermap_url)
        res = weather_response.json()
        description = res['weather'][0]['main']
        temp = round(res['main']['temp'] - 273.15,2)
        weather = ""
        print("메인",description)
        print("온도",temp)

        if temp >24:
            weather = "더움"
        elif temp > 10:
            weather = "적정"
        else :
            weather = "추움"

        real = description + "," + weather
        
        qs = User_Menu.objects.filter(weather = real).values('menu').annotate(count=Count('menu')).order_by('-count')
        wl= []
        
        for i in qs[:4]:
            item = SmallCategory.objects.get(id = i['menu'])
            wd = model_to_dict(item)
            wd.pop("img")
            wl.append(wd)
        
        
        
        personalizeRt = boto3.client(
            'personalize-runtime',
            region_name='ap-northeast-2',
            aws_access_key_id= os.getenv('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key= os.getenv('AWS_SECRET_ACCESS_KEY')
        )

        response = personalizeRt.get_recommendations(
            campaignArn = "arn:aws:personalize:ap-northeast-2:287004205854:campaign/fooday-campaign-2", 
            userId = "1"
        )

        smallCategoryList = []
        
        for item in response['itemList'][:4]:
            itemId = item['itemId']
            item = SmallCategory.objects.get(id = itemId)
            smallCategorydict = model_to_dict(item)
            smallCategorydict.pop("img")
            smallCategoryList.append(smallCategorydict)

        return Response({
            "personal" : smallCategoryList,
            "weather" : wl
        })