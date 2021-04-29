from django.urls import path, include

from rest_framework.routers import DefaultRouter

from apps.account import viewsets as accountView
from apps.category import viewsets as categoryView
from apps.store import viewsets as storeView
from apps.recommend import views as recommendView

router = DefaultRouter()

# account
router.register(r'usermenu', accountView.UserMenuViewSet)
router.register(r'user',accountView.UserViewSet)

# category
router.register(r'bigcategory', categoryView.BigCategoryViewSet)

# store
router.register(r'storebigcategory', storeView.StoreBigCategoryViewSet)
router.register(r'menu', storeView.MenuViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('recommendcategory/', recommendView.RecommendCategory.as_view()),
]