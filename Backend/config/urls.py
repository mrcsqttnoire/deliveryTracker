
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from tracking.views import *
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf.urls.static import static

urlpatterns = [
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.jwt')),
    path('admin/', admin.site.urls),

    # path('tracking/api-token/', TokenObtainPairView.as_view(), name='token_obtain'),
    # path('users/', user_list),
    path('api-auth/', include('rest_framework.urls')),

    path('clients/', ClientListAPIView.as_view()),
    path('tracking-api/', include('tracking.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)    


# if settings.DEBUG:
#     urlpatterns += [path("silk/", include('silk.urls', namespace='silk')),]