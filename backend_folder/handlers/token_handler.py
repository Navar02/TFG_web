from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from api.models import User

def verify_token(cookie_data):
    # Obtener el token de acceso del contenido de la cookie
    token = cookie_data.get('access_token')
    refresh_token = cookie_data.get('refresh_token')
    username = cookie_data.get('email')
    role = cookie_data.get('role')
    if token is None or refresh_token is None or username is None or role is None:
        return False, "Invalid cookie data"

    try:
        # Decodificar y validar el token
        access_token = AccessToken(token)
        
        # Check if the email in the token matches the email in the cookie data
        if access_token["email"] != username:
            return False, "Email in token does not match cookie data"
        
        # Verifica automáticamente si ha expirado (lanzará una excepción si es inválido)
        access_token.check_exp()
    except TokenError as e:
        if 'expired' in str(e):
            return False, "Token expired"
        else:
            return False, "Invalid token"

    # Verificar que el usuario existe y está activo
    user = User.objects.filter(username=username).first()
    if user is None:
        return False, "User not found"
    
    if not user.is_active:
        return False, "User is not active"

    # Verificar el rol del usuario
    if role not in ['admin', 'user']:
        return False, "Invalid role value"

    expected_role = 'admin' if user.is_superuser else 'user'
    if user.is_superuser:
        if role not in ['admin', 'user']:
            return False, "Invalid role data: data is incorrect or has been altered"
    else:
        if role != 'user':
            return False, "Invalid role data: data is incorrect or has been altered"

    return True, "Token is valid and user is active"  # Token válido y usuario activo