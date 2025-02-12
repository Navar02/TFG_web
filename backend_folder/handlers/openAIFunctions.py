import openai
import os

class OpenAIPromptGenerator:
    def __init__(self, model="gpt-4o-mini"):
        """
        Inicializa la clase con la clave de API obtenida del archivo .env y el modelo de OpenAI.
        :param model: Modelo a utilizar (por defecto, gpt-4).
        """
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("La clave de API de OpenAI no está definida en las variables de entorno del sistema")
        
        self.client = openai.OpenAI(api_key=api_key)
        self.model = model
    
    def create_prompt_function(self, system_message, max_tokens=1000, temperature=0.7):
        """
        Crea una función que ejecuta un prompt con un mensaje del sistema predefinido.
        :param system_message: Mensaje de contexto para el modelo.
        :param max_tokens: Máximo de tokens en la respuesta.
        :param temperature: Controla la creatividad de la respuesta (0.0 - 1.0).
        :return: Función que ejecuta prompts con este contexto.
        """
        def prompt_function(user_input):
            """
            Función generada para ejecutar un prompt con el mensaje del sistema predefinido.
            :param user_input: Entrada del usuario para el modelo.
            :return: Respuesta generada por OpenAI.
            """
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": user_input}
                ],
                max_tokens=max_tokens,
                temperature=temperature
            )
            return response.choices[0].message.content.strip()
        
        return prompt_function

