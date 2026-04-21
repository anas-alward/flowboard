from django.contrib import admin
from django.urls import path, include
from apps.users.views import CookieTokenObtainPairView, CookieTokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
]
