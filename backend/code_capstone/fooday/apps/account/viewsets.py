from django.utils.datastructures import MultiValueDictKeyError
from django.contrib.auth import authenticate

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import *
from .serializers import *
from apps.utils import *
import time

class UserMenuViewSet(viewsets.ModelViewSet):

    queryset = User_Menu.objects.all()
    serializer_class = UserMenuSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        menuList = request.data.get('menuList')
        location = request.data.get('location')

        timeSlot = setTimeSlot()
        lat, lng = geoCoding(location)
        description, temp, weatherGroup = openWeather(lat, lng)

        for menu in menuList:
            serializer = self.get_serializer(data={
                "user" : request.user.id,
                "menu" : menu,
                "weather": weatherGroup,
                "timeSlot" : timeSlot
            })
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

        return Response(
            status=status.HTTP_201_CREATED,
            data = {
                "message": "성공",
                "weatherGroup" : weatherGroup,
                "timeSlot": timeSlot
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


class UserSmallCategoryViewSet(viewsets.ModelViewSet):

    queryset = User_SmallCategory.objects.all()
    serializer_class = UserSmallCategorySerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        eventType = request.data.get('eventType')
        eventList = request.data.get('eventList')
        timestamp = int(time.time())
        for event in eventList:
            serializer = self.get_serializer(data={
                "user" : request.user.id,
                "smallCategory" : event[0],
                "eventType": eventType,
                "eventValue" : event[1],
                "timestamp" : timestamp
            })
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

        return Response(
            status=status.HTTP_201_CREATED,
            data = {
                "message": "성공",
                "eventType": eventType,
                "eventValue" : event[1]
            }
        )

    def perform_create(self, serializer):
        serializer.save()


class UserSmallCategoryFeedbackViewSet(viewsets.ModelViewSet):

    queryset = User_SmallCategory_Feedback.objects.all()
    serializer_class = UserSmallCategoryFeedbackSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        smallCategory = request.data.get('smallCategory')
        scenario = request.data.get('scenario')
        score = request.data.get('score')

        serializer = self.get_serializer(data={
            "user" : request.user.id,
            "smallCategory" : smallCategory,
            "scenario" : scenario,
            "score": score
        })
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            status=status.HTTP_201_CREATED,
            data = {
                "message": "성공",
                "smallCategory" : smallCategory,
                "scenario" : scenario,
                "score": score
            }
        )