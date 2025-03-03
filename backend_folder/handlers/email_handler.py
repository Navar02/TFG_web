import os
import resend
import jwt
import datetime

class EmailHandler:
    def __init__(self):
        self.api_key = os.environ["RESEND_API_KEY"]
        self.secret_key = os.environ["SECRET_KEY"]  # Clave secreta para firmar el token
        resend.api_key = self.api_key

    def generate_activation_token(self, user_email):
        payload = {
            "email": user_email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token expira en 24 horas
        }
        token = jwt.encode(payload, self.secret_key, algorithm="HS256")
        return token

    def send_confirmation_email(self, user_email):
        token = self.generate_activation_token(user_email)
        activation_link = f"http://localhost:8000/activate?token={token}"

        params: resend.Emails.SendParams = {
            "from": "Plan Your Trip <onboarding@resend.dev>",
            "to": [user_email],
            "subject": "Bienvenido a Plan Your Trip",
            "html": f"""
                <html>
                <body>
                    <h1>Bienvenido a Plan Your Trip</h1>
                    <p>Hola,</p>
                    <p>Gracias por unirte a nuestra plataforma para crear guías de viaje.</p>
                    <p>Estamos emocionados de ayudarte a planificar tus próximas aventuras.</p>
                    <p>Ahora todos tus viajes serán guardados y podrás acceder a estos.</p>
                    <p>Además ahora también podrás usar tus viajes previos para crear nuevos viajes.</p>
                    <p>Solo queda un último paso. Su cuenta necesita activarse para ello simplemente acceda al siguiente enlace:</p>
                    <p><a href="{activation_link}">Activar cuenta</a></p>
                    <p>¡Gracias por unirte a Plan Your Trip!</p>
                    <p>¡Feliz viaje!</p>
                    <p>El equipo de Plan Your Trip</p>
                </body>
                </html>
            """,
        }

        email = resend.Emails.send(params)
        print(email)

# Ejemplo de uso
if __name__ == "__main__":
    email_handler = EmailHandler()
    email_handler.send_confirmation_email("delivered@resend.dev")