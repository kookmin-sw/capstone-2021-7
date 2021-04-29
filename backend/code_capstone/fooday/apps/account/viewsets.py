from django.utils.datastructures import MultiValueDictKeyError
from django.contrib.auth import authenticate

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token

from .models import *
from .serializers import *

import requests
import json
import os

import urllib.request

class UserMenuViewSet(viewsets.ModelViewSet):

    queryset = User_Menu.objects.all()
    serializer_class = UserMenuSerializer
    
    def create(self, request, *args, **kwargs):

        menuList = request.data.get('menuList')
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
        print(real)
        for menu in menuList:
            serializer = self.get_serializer(data={
                "user" : request.user.id,
                "menu" : menu,
                "weather": real
            })
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        return Response(
            status=status.HTTP_201_CREATED, 
            data = {
                "message":"성공"
            }
        )
        
    def perform_create(self, serializer):
        serializer.save()

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=('POST',), url_path='signup', http_method_names=('post',))
    def signup(self, request, *args, **kwargs):
        
        username = request.data.get('username')
        phone = request.data.get('phone')
        name = request.data.get('name')
        password = request.data.get('password')
        gender = request.data.get('gender')

        taste = request.data.get('taste')
        price = request.data.get('price')
        amount = request.data.get('amount')
        
        if User.objects.filter(phone=phone).exists():
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': '해당 전화번호가 이미 존재합니다.'})

        user = User.objects.create_user(
            username = username,
            password=password,
            phone = phone,
            name= name,
            gender = gender,
            taste = taste,
            price = price,
            amount = amount
        )

        token = Token.objects.create(user=user)
    
        return Response(
                status=status.HTTP_200_OK,
                data={
                    'message' : "회원가입 성공",
                }
        )

    @action(detail=False, methods=('POST',), url_path='login', http_method_names=('post',))
    def login(self, request, *args, **kawrgs):

        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user:
            token = Token.objects.get_or_create(user=user)
            
            return Response(
                status=status.HTTP_200_OK,
                data={
                    'message': '로그인에 성공하였습니다.',
                    'data': {
                        'token': user.auth_token.key,
                    }
                }
            )

        return Response(
            status=status.HTTP_400_BAD_REQUEST,
            data={'message': '아이디 혹은 비밀번호가 틀렸습니다.'},
        )
