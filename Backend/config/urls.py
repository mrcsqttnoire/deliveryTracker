
from django.contrib import admin
from django.urls import path
from tracking.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('proprietaires/', proprietaire_list),
    path('livreurs/', livreur_list),
    path('users/', user_list),
]
