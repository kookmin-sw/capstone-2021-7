from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from .models import *
from .serializers import *

class BigCategoryViewSet(viewsets.ModelViewSet):

    queryset = BigCategory.objects.all()
    serializer_class = BigCategorySerializer

class SmallCategoryViewSet(viewsets.ModelViewSet):

    queryset = SmallCategory.objects.all()
    serializer_class = SmallCategorySerializer