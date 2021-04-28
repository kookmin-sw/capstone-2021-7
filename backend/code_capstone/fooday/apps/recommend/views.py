from django.shortcuts import render
from django.forms.models import model_to_dict
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from django.contrib.auth.models import User

import boto3
import os
from apps.category.models import SmallCategory

class RecommendCategory(APIView):

    def post(self, request, format=None):
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

        return Response(smallCategoryList)