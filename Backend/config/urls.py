
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from tracking.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tracking/api-token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('tracking/api-token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    path('proprietaires/inscription', ProprietaireCreateAPIView.as_view()),
    path('livreurs/', LivreurListCreateAPIView.as_view()),
    path('users/', user_list),
    path('clients/', ClientListAPIView.as_view()),
    path('api-auth/', include('rest_framework.urls'))
]

# if settings.DEBUG:
#     urlpatterns += [path("silk/", include('silk.urls', namespace='silk')),]