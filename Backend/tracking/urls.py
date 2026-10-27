from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from tracking.views import LivraisonAPIViewSet, AddDetailLivraisonAPIView, LivreurAPIViewSet, ProprietaireCreateAPIView, ProprietaireList
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('proprietaire/', ProprietaireCreateAPIView.as_view()),
    path('livraison/<uuid:pk>', AddDetailLivraisonAPIView.as_view()),
    path('proprietaires/', ProprietaireList.as_view()),
]

router = DefaultRouter()
router.register('livreur', LivreurAPIViewSet)
urlpatterns += router.urls

routerLivraison = DefaultRouter()
routerLivraison.register('livraison', LivraisonAPIViewSet)
urlpatterns += routerLivraison.urls