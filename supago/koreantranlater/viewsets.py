from rest_framework import viewsets

from .models import *
from .serializers import *

class KoreanTranslaterRequestViewSet(viewsets.ModelViewSet):

    queryset = KoreanTranslaterRequest.objects.all()
    serializer_class = KoreanTranslaterRequestSerializer