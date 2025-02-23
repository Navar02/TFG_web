from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from api.models import User

def verify_token(cookie_data):
    try:
        # Obtener el token de acceso del contenido de la cookie
        token = cookie_data.get('access_token')
        username = cookie_data.get('email')
        if token is None or username is None:
            return False, "Invalid cookie data"

        # Decodificar y validar el token
        access_token = AccessToken(token)

        # Verifica automáticamente si ha expirado (lanzará una excepción si es inválido)
        access_token.check_exp()

        # Verificar que el usuario existe y está activo
        user = User.objects.filter(username=username).first()
        if user is None:
            return False, "User not found"
        
        if not user.is_active:
            return False, "User is not active"

        return True, "Token is valid and user is active"  # Token válido y usuario activo

    except (TokenError, InvalidToken):
        return False, "Invalid access token"  # Token inválido o expirado
