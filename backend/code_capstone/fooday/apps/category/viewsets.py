from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from .models import *
from .serializers import *

class BigCategoryViewSet(viewsets.ModelViewSet):

    queryset = BigCategory.objects.all()
    serializer_class = BigCategorySerializer

# class SmallCategoryViewSet(viewsets.ModelViewSet):

#     queryset = SmallCategory.objects.all()
#     serializer_class = SmallCategorySerializer

#     """
#     List a queryset.
#     """
#     def list(self, request, *args, **kwargs):
        
#         bigCategory = request.POST['bigCategory']
#         print(bigCategory)

#         # queryset = self.filter_queryset(self.get_queryset())
#         queryset = SmallCategory.objects.filter(bigCategory = bigCategory)

#         page = self.paginate_queryset(queryset)
#         if page is not None:
#             serializer = self.get_serializer(page, many=True)
#             return self.get_paginated_response(serializer.data)

#         serializer = self.get_serializer(queryset, many=True)
#         return Response(serializer.data)
