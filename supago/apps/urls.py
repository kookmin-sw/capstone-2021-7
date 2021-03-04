from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.account import viewsets as accountView
from apps.koreantranlater import viewsets as koreantranslaterView

router = DefaultRouter()
# account
router.register(r'phoneauth',accountView.PhoneAuthViewSet)
router.register(r'user',accountView.UserViewSet)

# koreantranslater
router.register(r'koreantranslater',koreantranslaterView.KoreanTranslaterRequestViewSet)

urlpatterns = [
    path('',include(router.urls)),
]