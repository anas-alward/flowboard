from .views import CookieTokenObtainPairView, CookieTokenRefreshView
from django.urls import path


urlpatterns = [
    path('token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
]