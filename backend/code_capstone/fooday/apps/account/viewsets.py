from django.utils.datastructures import MultiValueDictKeyError
from django.contrib.auth import authenticate

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token

from .models import *
from .serializers import *

class UserMenuViewSet(viewsets.ModelViewSet):

    queryset = User_Menu.objects.all()
    serializer_class = UserMenuSerializer
    
    def create(self, request, *args, **kwargs):
        menuList = request.data.get('menuList')
        weather = request.data.get('weather')
        for menu in menuList:
            serializer = self.get_serializer(data={
                "user" : request.user.id,
                "menu" : menu,
                "weather":weather
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
