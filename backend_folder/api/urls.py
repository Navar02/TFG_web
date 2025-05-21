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
    path('getCategories/', views.getCategories_view, name='getCategories'), # Ruta para el endpoint getCategories/
    path('login/', views.login_view, name='login'),  # Ruta para el endpoint login/
    path('verify/', views.verify_view, name='verify'),  # Ruta para el endpoint verify/ De momento solo es para probar si es valido el token
    path('activate/', views.activate_account_view, name='activate'),  # Ruta para el endpoint activate/
    path('generate_pdf/', views.generate_pdf_view, name='generate_pdf'),  # Ruta para el endpoint generate_pdf/
    path('trips/', views.get_trip_or_trips_view, name='get_trip_or_trips'),  # Ruta para el endpoint /trips
    path('stats/', views.get_user_stats_view, name='get_stats'),  # Ruta para el endpoint /stats
]