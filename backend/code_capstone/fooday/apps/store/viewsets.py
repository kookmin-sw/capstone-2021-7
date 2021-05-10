from rest_framework import (
    viewsets,
    status
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from django.db.models import Prefetch
from .models import *
from .serializers import *


class StoreBigCategoryViewSet(viewsets.ModelViewSet):

    queryset = Store.objects.all()
    serializer_class = StoreBigCategorySerializer

    @action(detail=False, methods=('POST',), url_path='list', http_method_names=('post',))
    def storeBigCategoryList(self, request, *args, **kwargs):
        try :
            bigCategory = request.data.get('bigCategory')
            location = request.data.get('location')
            if (bigCategory is None) or (location is None) :
                return Response(
                    status = status.HTTP_400_BAD_REQUEST,
                    data = {
                        'message': '카테고리나 위치정보가 입력되지 않았거나 잘못 입력되었습니다.'
                    }
                )
            location = location.split()[1]
            queryset = Store.objects.filter(bigcategory = bigCategory, location__contains=location)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

        except ValueError or IndexError:
            return Response(
                status = status.HTTP_400_BAD_REQUEST,
                data = {
                    'message': '잘못된 입력입니다.'
                }
            )

    @action(detail=False, methods=('POST',), url_path='signup', http_method_names=('post',))
    def signup(self, request, *args, **kwargs):
        print("1")
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
        print("2")
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
        print("3")
        token = Token.objects.create(user=user)
    
        return Response(
                status=status.HTTP_200_OK,
                data={
                    'message' : "회원가입 성공",
                }
        )

class MenuViewSet(viewsets.ModelViewSet):

    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        store = self.request.query_params.get('store','')
        # store = request.data.get('store')
        print(store)
        if store == None:
            return Response(
                status = status.HTTP_400_BAD_REQUEST,
                data = {
                    'message': '음식점을 입력해야합니다.'
                }
            )

        queryset = Menu.objects.filter(store = store)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class StoreSmallCategoryViewSet(viewsets.ModelViewSet):

    queryset = Store.objects.all()
    serializer_class = StoreSmallCategorySerializer
    permission_classes = [IsAuthenticated,]

    @action(detail=False, methods=('POST',), url_path='list', http_method_names=('post',))
    def storeSmallCategoryList(self, request, *args, **kwargs):
        
        try :
            smallCategory = request.data.get('smallCategory')
            location = request.data.get('location')

            print("스몰카테고리 : ",smallCategory)
            print("로케이션 : ",location)
            if (smallCategory is None) or (location is None) :
                return Response(
                    status = status.HTTP_400_BAD_REQUEST,
                    data = {
                        'message': '카테고리나 위치정보가 입력되지 않았거나 잘못 입력되었습니다.'
                    }
                )
            menus = Menu.objects.filter(smallCategory=smallCategory)
            location = location.split()[1]

            stores = Store.objects.filter(menu__in=menus, location__contains=location)
            if (stores is None):
                return Response(
                    status = status.HTTP_400_BAD_REQUEST,
                    data = {
                        'message': '해당되는 가게가 없습니다.'
                    }
                )
            queryset = stores.prefetch_related(Prefetch('menu', queryset=Menu.objects.filter(smallCategory=smallCategory), to_attr='filtered_menu')).distinct().order_by('pk')
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

        except ValueError or IndexError:
            return Response(
                status = status.HTTP_400_BAD_REQUEST,
                data = {
                    'message': '잘못된 입력입니다.'
                }
            )
