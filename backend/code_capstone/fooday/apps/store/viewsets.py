from rest_framework import (
    viewsets,
    status
)
from rest_framework import status
from rest_framework.response import Response

from .models import *
from .serializers import *

class StoreBigCategoryViewSet(viewsets.ModelViewSet):

    queryset = Store.objects.all()
    serializer_class = StoreBigCategorySerializer

    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        try :
            bigCategory = request.data.get('bigCategory')
            location = request.data.get('location')
            if (bigCategory is None) or (location is None) :
                return Response(
                    status = status.HTTP_400_BAD_REQUEST,
                    data = {
                        'message': '카테고리나 위치정보가 입력되지 않았거나 잘못입력됬습니다.'
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

class MenuViewSet(viewsets.ModelViewSet):

    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    """
    List a queryset.
    """
    def list(self, request, *args, **kwargs):
        store = request.data.get('store')
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
