from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authtoken.models import Token

from .models import *
from .serializers import *
from django.utils import timezone
from django.contrib.auth import authenticate

import requests, os, random, time,json
import sys
import hashlib
import hmac
import base64

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=('POST',), url_path='signup', http_method_names=('post',))
    def signup(self, request, *args, **kwargs):
        
        phoneNumber = request.data.get('phoneNumber')
        password = request.data.get('password')
        age = request.data.get('age')
        sex = request.data.get('sex')
        userType = request.data.get('userType')
        
        if User.objects.filter(phoneNumber=phoneNumber).exists():
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': '해당 전화번호가 이미 존재합니다.'})

        user = User.objects.create_user(
            phoneNumber=phoneNumber,
            password=password,
            age=age,
            sex=sex,
            userType=userType,
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

        phoneNumber = request.data.get('phoneNumber')
        password = request.data.get('password')
        user = authenticate(phoneNumber=phoneNumber, password=password)
        
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

class PhoneAuthViewSet(viewsets.ModelViewSet):

    queryset = PhoneAuth.objects.all()
    serializer_class = PhoneAuthSerializer

    def	make_signature(self,timestamp):
        access_key = os.getenv('NAVER_ACCESS_KEY_ID')				# access key id (from portal or Sub Account)
        secret_key = os.getenv('NAVER_SECRET_KEY_ID')				# secret key (from portal or Sub Account)
        secret_key = bytes(secret_key, 'UTF-8')

        method = "POST"
        uri = '/sms/v2/services/' + os.getenv('NAVER_SERVICE_ID') + '/messages'

        message = method + " " + uri + "\n" + timestamp + "\n" + access_key
        message = bytes(message, 'UTF-8')
        signingKey = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
        return signingKey

    def send_sms(self, phoneNumber, tempNumber):
        url = 'https://sens.apigw.ntruss.com/sms/v2/services/' + os.getenv('NAVER_SERVICE_ID') + '/messages'
        timestamp = str(int(time.time() * 1000))
        signature = self.make_signature(timestamp)
        data = {
            "type": "SMS",
            "contentType":"COMM",
            'countryCode': '82',
            "from": "01092518072",
            "content": " 인증 번호 [{}]를 입력해주세요.".format(tempNumber),
            "messages": [
                {
                    "to": phoneNumber
                }
            ]
        }
        data = json.dumps(data)
        headers = {
            "Content-Type": "application/json ;charset=utf-8",
            "x-ncp-apigw-timestamp": timestamp,
            "x-ncp-iam-access-key": os.getenv('NAVER_ACCESS_KEY_ID'),
            "x-ncp-apigw-signature-v2": signature,
            }
        response = requests.post(url, data=data, headers=headers)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phoneNumber = request.data.get('phoneNumber')
        tempNumber= random.randrange(1000,9999)

        if PhoneAuth.objects.filter(phoneNumber = phoneNumber).exists():
            obj = PhoneAuth.objects.get(phoneNumber = phoneNumber)
            obj.tempNumber = tempNumber
            obj.createdAt = timezone.now()
            obj.save()
            self.send_sms(phoneNumber,tempNumber)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        self.perform_create(serializer,tempNumber)
        self.send_sms(phoneNumber,tempNumber)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, tempNumber):
        serializer.save(
            tempNumber = tempNumber
        )
    
    @action(detail=False, methods=('POST',), url_path='confirm', http_method_names=('post',))
    def comfirmNumber(self, request, *args, **kwargs):
        
        phoneNumber = request.data.get('phoneNumber')
        tempNumber = request.data.get('tempNumber')
        qs = PhoneAuth.objects.get(phoneNumber = phoneNumber)
        if tempNumber == str(qs.tempNumber):
            return Response(
                status=status.HTTP_200_OK,
                data={
                    'message' : True,
                }
            )
        else :
            return Response(
                status=status.HTTP_200_OK,
                data={
                    'message' : False,
                }
            )
