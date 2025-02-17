from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError

def is_token_valid(token):
    try:
        UntypedToken(token)
        return True
    except (InvalidToken, TokenError):
        return False