
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from tracking.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter

urlpatterns = [
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    
    path('admin/', admin.site.urls),
    path('tracking/api-token/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('users/', user_list),
    path('clients/', ClientListAPIView.as_view()),
    path('api-auth/', include('rest_framework.urls'))
]

router = DefaultRouter()
router.register('livreur', LivreurAPIViewSet)
urlpatterns += router.urls


# if settings.DEBUG:
#     urlpatterns += [path("silk/", include('silk.urls', namespace='silk')),]