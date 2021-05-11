from django.urls import path, include

from rest_framework.routers import DefaultRouter

from apps.account import viewsets as accountView
from apps.category import viewsets as categoryView
from apps.store import viewsets as storeView
from apps.recommend import views as recommendView

router = DefaultRouter()

# account
router.register(r'ordermenu', accountView.OrderMenuViewSet)
router.register(r'order', accountView.OrderViewSet)
router.register(r'user',accountView.UserViewSet)
router.register(r'userfeedback',accountView.UserSmallCategoryFeedbackViewSet)

# category
router.register(r'bigcategory', categoryView.BigCategoryViewSet)
router.register(r'smallcategory', categoryView.SmallCategoryViewSet)

# store
router.register(r'storebigcategory', storeView.StoreBigCategoryViewSet)
router.register(r'menu', storeView.MenuViewSet)
router.register(r'storesmallcategory', storeView.StoreSmallCategoryViewSet)


urlpatterns = [
    path('',include(router.urls)),
    path('recommendcategory/', recommendView.RecommendCategory.as_view()),
]