from django.utils.datastructures import MultiValueDictKeyError
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from django.utils import timezone

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
from apps.store.models import *
from apps.category.models import *
from datetime import datetime, date, time
import pytz
import boto3
from time import time as timestamp

class OrderMenuViewSet(viewsets.ModelViewSet):

    queryset = Order_Menu.objects.all()
    serializer_class = OrderMenuSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        menuList = request.data.get('menuList')
        location = request.data.get('location')
        user = User.objects.get(id=request.user.id)

        timeSlot = setTimeSlot()
        lat, lng = geoCoding(location)
        description, temp, weatherGroup = openWeather(lat, lng)

        order = Order.objects.create(
            user = user,
            timeSlot = timeSlot,
            weather = weatherGroup
            )

        for menu in menuList:
            serializer = self.get_serializer(data={
                "order" : order.id,
                "menu" : menu
            })
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)

            datas = Menu_SmallCategory.objects.filter(menu=menu)

            for data in datas:
                User_SmallCategory_Order.objects.create(user=user, smallCategory=data.smallCategory)

                # AWS event 전송
                try:
                    personalize_events = boto3.client(
                        service_name='personalize-events',
                        region_name='ap-northeast-2',
                        aws_access_key_id= os.getenv('AWS_ACCESS_KEY_ID'),
                        aws_secret_access_key= os.getenv('AWS_SECRET_ACCESS_KEY')
                    )
                    personalize_events.put_events(
                        trackingId = '35969295-2f06-4f1e-a61a-ff3be97a4554',
                        userId= str(user.id),
                        sessionId = 'session_id',
                        eventList = [{
                            'sentAt': int(timestamp()),
                            'eventType': 'Order',
                            'properties': json.dumps({
                                'itemId': str(data.smallCategory.id),
                                'eventValue': 1
                                })
                            }]
                    )
                except:
                    print('error')



        return Response(
            status=status.HTTP_201_CREATED,
            data = {
                "message": "성공",
                "weatherGroup" : weatherGroup,
                "timeSlot": timeSlot
            }
        )

class LocationViewSet(viewsets.ModelViewSet):

    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        try :
            obj = Location.objects.get(user=request.user, name=name)
            obj.delete()
            serializer = self.get_serializer(data={
                "user":request.user.id,
                "name":name
            })
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            
        except ObjectDoesNotExist:
            serializer = self.get_serializer(data={
                "user":request.user.id,
                "name":name
            })
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        queryset = Location.objects.filter(user = request.user).order_by('-id')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class OrderViewSet(viewsets.ModelViewSet):

    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        queryset = Order.objects.filter(user = request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=('POST',), url_path='checkusername', http_method_names=('post',))
    def checkUsername(self, request, *args, **kwargs):
        username = request.data.get('username')

        if User.objects.filter(username=username).exists():
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': '해당 아이디가 이미 존재합니다.'})
        else :
            return Response(
                status=status.HTTP_200_OK,
                data={'message': 'OK'})

    @action(detail=False, methods=('POST',), url_path='checkphone', http_method_names=('post',))
    def checkPhone(self, request, *args, **kwargs):
        phone = request.data.get('phone')

        if User.objects.filter(phone=phone).exists():
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': '해당 전화번호가 이미 존재합니다.'})
        else :
            return Response(
                status=status.HTTP_200_OK,
                data={'message': 'OK'})

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
        age = request.data.get('age')

        eventList = request.data.get('eventList')

        if User.objects.filter(phone=phone).exists():
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': '해당 전화번호가 이미 존재합니다.'})

        if User.objects.filter(username=username).exists():
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': '해당 아이디가 이미 존재합니다.'})

        if eventList==None :
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': '잘못된 입력입니다.'},
            )

        user = User.objects.create_user(
            username = username,
            password=password,
            phone = phone,
            name= name,
            gender = gender,
            taste = taste,
            price = price,
            amount = amount,
            age = age
        )

        try:
            # AWS putuser 전송
            sex = 1 if gender=='female' else 2
            personalize_events = boto3.client(
                service_name='personalize-events',
                region_name='ap-northeast-2',
                aws_access_key_id= os.getenv('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key= os.getenv('AWS_SECRET_ACCESS_KEY')
            )
            data = {"sex": sex, "old": age, "flavor": taste, "amount": amount, "price":price}
            response = personalize_events.put_users(
                datasetArn = 'arn:aws:personalize:ap-northeast-2:287004205854:dataset/fooday-dataset/USERS',
                users = [{
                    'userId': str(user.id),
                    'properties': json.dumps(data)
                }]
            )
        except:
            print('error')

        token = Token.objects.create(user=user)

        try:
            for event in eventList:
                User_SmallCategory_Like.objects.create(
                    user=user,
                    smallCategory=SmallCategory.objects.get(id=event[0]),
                    rating=event[1]
                )
                print(event[0], event[1])
                # AWS event 전송
                personalize_events = boto3.client(
                    service_name='personalize-events',
                    region_name='ap-northeast-2',
                    aws_access_key_id= os.getenv('AWS_ACCESS_KEY_ID'),
                    aws_secret_access_key= os.getenv('AWS_SECRET_ACCESS_KEY')
                )
                personalize_events.put_events(
                    trackingId = '35969295-2f06-4f1e-a61a-ff3be97a4554',
                    userId= str(user.id),
                    sessionId = 'session_id',
                    eventList = [{
                        'sentAt': int(timestamp()),
                        'eventType': 'Like',
                        'properties': json.dumps({
                            'itemId': str(event[0]),
                            'eventValue': int(event[1])
                            })
                        }]
                )
        except:
            Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': '잘못된 선호도 입력입니다.'},
            )

        return Response(
                status=status.HTTP_200_OK,
                data={
                    'message' : "회원가입 성공"
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

class UserSmallCategoryFeedbackViewSet(viewsets.ModelViewSet):

    queryset = User_SmallCategory_Feedback.objects.all()
    serializer_class = UserSmallCategoryFeedbackSerializer
    permission_classes = [IsAuthenticated]

    def checkFeedback(self, user, smallCategory, scenario, start, end):
        currentDate = date.today()
        print("오늘 : ",currentDate)
        hourSlot1 = time(start)
        hourSlot2 = time(end)
        dateSlot1 = datetime.combine(currentDate,hourSlot1)
        dateSlot2 = datetime.combine(currentDate,hourSlot2)
        print("이것보다 크고 ",dateSlot1)
        print("이것보다 작은 ",dateSlot2)

        isExist = User_SmallCategory_Feedback.objects.filter(
            user= user,
            smallCategory= smallCategory,
            scenario = scenario,
            timestamp__gte=dateSlot1,
            timestamp__lt=dateSlot2,
        ).exists()


        return isExist

    def create(self, request, *args, **kwargs):
        smallCategory = request.data.get('smallCategory')
        scenario = request.data.get('scenario')
        score = request.data.get('score')

        current = timezone.now()
        print("로컬타임 : ",current)
        currentHour = current.time().hour

        print("현재 시각 : ",currentHour)


        if currentHour >= 0 and currentHour < 2 :
            if self.checkFeedback(request.user, smallCategory,scenario,0,2):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 2 and currentHour < 4 :
            if self.checkFeedback(request.user, smallCategory,scenario,2,4):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 4 and currentHour < 6 :
            if self.checkFeedback(request.user, smallCategory,scenario,4,6):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 6 and currentHour < 8 :
            if self.checkFeedback(request.user, smallCategory,scenario,6,8):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 8 and currentHour < 10 :
            if self.checkFeedback(request.user, smallCategory,scenario,8,10):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 10 and currentHour < 12 :
            if self.checkFeedback(request.user, smallCategory,scenario,10,12):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 12 and currentHour < 14 :
            if self.checkFeedback(request.user, smallCategory,scenario,12,14):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 14 and currentHour < 16 :
            if self.checkFeedback(request.user, smallCategory,scenario,14,16):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 16 and currentHour < 18 :
            if self.checkFeedback(request.user, smallCategory,scenario,16,18):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 18 and currentHour < 20 :
            if self.checkFeedback(request.user, smallCategory,scenario,18,20):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 20 and currentHour < 22 :
            if self.checkFeedback(request.user, smallCategory,scenario,20,22):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )
        elif currentHour >= 22 and currentHour < 24 :
            if self.checkFeedback(request.user, smallCategory,scenario,22,24):
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={'message': '피드백 할 수 있는 시간대가 아닙니다.'}
                )

        if (smallCategory==None) or (scenario==None) or (score==None) :
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'message': '잘못된 입력입니다.'},
            )

        serializer = self.get_serializer(data={
            "user" : request.user.id,
            "smallCategory" : smallCategory,
            "scenario" : scenario,
            "score": score
        })
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # AWS event 전송
        try:
            personalize_events = boto3.client(
                service_name='personalize-events',
                region_name='ap-northeast-2',
                aws_access_key_id= os.getenv('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key= os.getenv('AWS_SECRET_ACCESS_KEY')
            )
            personalize_events.put_events(
                trackingId = '35969295-2f06-4f1e-a61a-ff3be97a4554',
                userId= str(user.id),
                sessionId = 'session_id',
                eventList = [{
                    'sentAt': int(timestamp()),
                    'eventType': 'Feedback',
                    'properties': json.dumps({
                        'itemId': str(smallCategory),
                        'eventValue': int(score)
                        })
                    }]
            )
        except:
            print('error')

        return Response(
            status=status.HTTP_201_CREATED,
            data = {
                "message": "성공",
                "smallCategory" : smallCategory,
                "scenario" : scenario,
                "score": score
            }
        )