
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from tracking.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('proprietaires/', proprietaire_list),
    path('livreurs/', livreur_list),
    path('users/', user_list),
    path('clients/', ClientListAPIView.as_view()),
    path('api-auth/', include('rest_framework.urls'))
]

# if settings.DEBUG:
#     urlpatterns += [path("silk/", include('silk.urls', namespace='silk')),]