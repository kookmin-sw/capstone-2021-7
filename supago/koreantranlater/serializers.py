from rest_framework import serializers
from .models import *

class KoreanTranslaterRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = KoreanTranslaterRequest
        fields = ('__all__')