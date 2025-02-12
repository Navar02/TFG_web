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