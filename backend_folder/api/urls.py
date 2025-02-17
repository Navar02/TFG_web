from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('plan/', views.plan_view, name='plan'),  # Ruta para el endpoint plan/
    path('register/', views.register_view, name='register'),  # Ruta para el endpoint register/
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Ruta para el endpoint token/
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Ruta para el endpoint token/refresh/
]