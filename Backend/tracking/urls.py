from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from tracking.views import LivraisonAPIViewSet, AddDetailLivraisonAPIView
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('livraison/<uuid:pk>', AddDetailLivraisonAPIView.as_view()),
]

routerLivraison = DefaultRouter()
routerLivraison.register('livraison', LivraisonAPIViewSet)
urlpatterns += routerLivraison.urls