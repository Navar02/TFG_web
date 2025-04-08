from datetime import datetime
import random
from pymongo import MongoClient, errors
from django.conf import settings

class MongoDBHandler:
    def __init__(self):
        try:
            self.client = MongoClient(settings.MONGO_URI)
            self.db = self.client.miBaseDeDatos
            self.collection = self.db.trip
        except errors.ConnectionFailure as e:
            print("Error al conectar con MongoDB:", e)
            raise

    def save_trip(self, trip_data):
        try:
            self.collection.insert_one(trip_data)
            print("Viaje guardado en MongoDB")
        except Exception as e:
            print("Error al guardar el viaje en MongoDB:", e)
            raise
    
    def get_trip_match_perfect(self, trip_data):
        try:    
            city = trip_data["city"]
            categories = trip_data["categories"]
            duration = trip_data["duration"]  # Duración del viaje en días
            print("Buscando coincidencias en MongoDB...")

            # Buscar coincidencias exactas en la colección
            query = {
                "location": city,
                "categories": categories,
                "travelPlan.duracion_viaje": duration
            }
            results = list(self.collection.find(query))
            if len(results) == 0:
                print("No se encontraron coincidencias exactas en MongoDB")
                return None
            else:
                print("Se encontraron coincidencias exactas en MongoDB")
                #desordenar los resultados aleatoriamente
                random.shuffle(results)
                return results[0]  # Devolver la primera coincidencia encontrada
        except Exception as e:
            print("Error al buscar coincidencias en MongoDB:", e)
            raise