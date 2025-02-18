from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('plan/', views.plan_view, name='plan'),  # Ruta para el endpoint plan/
    path('register/', views.register_view, name='register'),  # Ruta para el endpoint register/
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Ruta para el endpoint token/refresh/
    path('getSecQues/', views.getSecQues_view, name='getSecQues'), # Ruta para el endpoint getSecQues/
    path('login/', views.login_view, name='login'),  # Ruta para el endpoint login/
]