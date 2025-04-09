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
                "location": {"$regex": f"^{city}$", "$options": "i"}, ## Coincidencia exacta (case insensitive)
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
    
    def check_city_in_db(self, city):
        try:
            query = {"location": {"$regex": f"^{city}$", "$options": "i"}}
            results = list(self.collection.find(query))
            return len(results) > 0
        except Exception as e:
            print("Error al buscar coincidencias en MongoDB:", e)
            raise
    
    def check_any_categories_for_city(self, city, categories):
        #buscar algun viaje que coincida alguna de las categorias
        try:
            query = {
                "location": {"$regex": f"^{city}$", "$options": "i"},  # Coincidencia exacta (case insensitive)
                "categories": {"$in": categories}
            }
            results = list(self.collection.find(query))
            return len(results) > 0
        except Exception as e:
            print("Error al buscar coincidencias en MongoDB:", e)
            raise
        
    def mount_trip_from_data(self, trip_data):
        try:
            # Buscar lugares en la base de datos que coincidan con la ciudad y las categorías
            city = trip_data["city"]
            query = {
                "location": {"$regex": f"^{city}$", "$options": "i"},
                "categories": {"$in": trip_data["categories"]}
            }
            places = list(self.collection.find(query))

            if not places:
                print("No se encontraron lugares que coincidan con los criterios.")
                return None

            # Calcular la duración del viaje en días
            start_date = datetime.strptime(trip_data["startDate"], "%Y-%m-%d")
            end_date = datetime.strptime(trip_data["endDate"], "%Y-%m-%d")
            duration = (end_date - start_date).days

            # Crear el esquema base del plan de viaje
            travel_plan = {
                "lugar_visita": {
                    "nombre": trip_data["city"],
                    "coordenadas": {
                        "latitud": places[0]["travelPlan"]["lugar_visita"]["coordenadas"]["latitud"],
                        "longitud": places[0]["travelPlan"]["lugar_visita"]["coordenadas"]["longitud"]
                    }
                },
                "duracion_viaje": duration,
                "gustos_usuario": trip_data["categories"],
                "plan_visita": []
            }

            # Distribuir los lugares por días
            day = 1
            current_day_places = []
            for place in places:
                # Extraer información del lugar
                lugar = {
                    "nombre": place["travelPlan"]["plan_visita"][0]["lugares"][0]["nombre"],
                    "descripcion": place["travelPlan"]["plan_visita"][0]["lugares"][0]["descripcion"],
                    "actividades": place["travelPlan"]["plan_visita"][0]["lugares"][0]["actividades"],
                    "duracion_visita": place["travelPlan"]["plan_visita"][0]["lugares"][0]["duracion_visita"],
                    "gusto_asociado": place["travelPlan"]["plan_visita"][0]["lugares"][0]["gusto_asociado"],
                    "coordenadas": place["travelPlan"]["plan_visita"][0]["lugares"][0]["coordenadas"]
                }
                current_day_places.append(lugar)

                # Si se han asignado suficientes lugares para un día, agregar al plan
                if len(current_day_places) >= 3 or day > duration:  # Ajustar el número de lugares por día
                    travel_plan["plan_visita"].append({
                        "dia": day,
                        "lugares": current_day_places
                    })
                    current_day_places = []
                    day += 1

            # Agregar los lugares restantes al último día
            if current_day_places:
                travel_plan["plan_visita"].append({
                    "dia": day,
                    "lugares": current_day_places
                })

            # Asegurarse de que el número de días no exceda la duración del viaje
            travel_plan["plan_visita"] = travel_plan["plan_visita"][:duration]

            return travel_plan

        except Exception as e:
            print("Error al generar el plan de viaje:", e)
            raise
        
    def check_plan_is_correct(self, plan):
        """
        Comprueba si el plan es correcto:
        - El número del último día debe ser igual a la duración del viaje.
        - El número de lugares de visita debe ser el mismo en todos los días.
        """
        try:
            # Obtener la duración del viaje
            duracion_viaje = plan["duracion_viaje"]

            # Obtener los días del plan de visita
            plan_visita = plan["plan_visita"]

            # Validar que el número del último día sea igual a la duración del viaje
            if plan_visita[-1]["dia"] != duracion_viaje:
                print("Error: El número del último día no coincide con la duración del viaje.")
                return False

            # Validar que todos los días tengan el mismo número de lugares
            num_lugares_por_dia = len(plan_visita[0]["lugares"])  # Número de lugares del primer día
            for dia in plan_visita:
                if len(dia["lugares"]) != num_lugares_por_dia:
                    print("Error: El número de lugares no es consistente en todos los días.")
                    return False

            # Si pasa todas las validaciones, el plan es correcto
            return True

        except Exception as e:
            print("Error al comprobar la validez del plan:", e)
            raise