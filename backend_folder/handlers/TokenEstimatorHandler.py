import math

class TokenEstimatorHandler:
    """
    Clase para estimar el número de tokens en un texto sin usar librerías externas.
    """
    def __init__(self):
        pass
    
    def estimar_tokens(self,texto: str) -> int:
        """
        Estima el número de tokens de un string sin usar librerías externas.
        
        Args:
            texto (str): Texto de entrada.
            
        Returns:
            int: Estimación de tokens.
        """
        # Opción 1: Basado en caracteres
        tokens_por_caracter = 1 / 4  # Aproximación: 1 token cada 4 caracteres
        estimacion = len(texto) * tokens_por_caracter*1.2  # Ajuste por el uso de palabras y espacios
        
        return math.ceil(estimacion)