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
    
    def get_trips_by_user(self, user_email):
        try:
            query = {"user": user_email}
            results = list(self.collection.find(query))
            print(type(results))
            print(results)
            return results
        except Exception as e:
            print("Error al buscar viajes en MongoDB:", e)
            raise
        
    def get_trip_by_id(self, trip_id, user_email):
        try:
            query = {"_id": trip_id, "user": user_email}
            result = list(self.collection.find(query))[0]
            return result
        except Exception as e:
            print("Error al buscar viaje en MongoDB:", e)
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
            print(f"Se encontraron {len(places)} lugares que coinciden con los criterios.")
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

            # Agrupar los lugares por categoría
            lugares_por_categoria = {categoria: [] for categoria in trip_data["categories"]}
            for place in places:
                for lugar in place["travelPlan"]["plan_visita"]:
                    for detalle_lugar in lugar["lugares"]:
                        if detalle_lugar["gusto_asociado"] in trip_data["categories"]:
                            lugar_data = {
                                "nombre": detalle_lugar["nombre"],
                                "descripcion": detalle_lugar["descripcion"],
                                "actividades": detalle_lugar["actividades"],
                                "duracion_visita": detalle_lugar["duracion_visita"],
                                "gusto_asociado": detalle_lugar["gusto_asociado"],
                                "coordenadas": detalle_lugar["coordenadas"]
                            }
                            lugares_por_categoria[detalle_lugar["gusto_asociado"]].append(lugar_data)

            # Distribuir los lugares por días, intentando equilibrar las categorías
            day = 1
            current_day_places = []
            while any(lugares_por_categoria.values()) and day <= duration:
                for categoria in trip_data["categories"]:
                    if lugares_por_categoria[categoria]:
                        current_day_places.append(lugares_por_categoria[categoria].pop(0))
                        if len(current_day_places) == 3:  # Máximo 3 lugares por día
                            travel_plan["plan_visita"].append({
                                "dia": day,
                                "lugares": current_day_places
                            })
                            current_day_places = []
                            day += 1
                            if day > duration:
                                break

            # Agregar los lugares restantes al último día (máximo 3 lugares)
            if current_day_places:
                travel_plan["plan_visita"].append({
                    "dia": day,
                    "lugares": current_day_places[:3]  # Limitar a 3 lugares como máximo
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
        - El número de lugares por categoría no debe desviarse más de 2 respecto a la mediana.
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

            # Contar el número de lugares por categoría en base a gustos_usuario
            gustos_usuario = plan["gustos_usuario"]
            lugares_por_categoria = {categoria: 0 for categoria in gustos_usuario}

            for dia in plan_visita:
                for lugar in dia["lugares"]:
                    categoria = lugar["gusto_asociado"]
                    if categoria in lugares_por_categoria:
                        lugares_por_categoria[categoria] += 1

            # Calcular la mediana del número de lugares por categoría
            valores = list(lugares_por_categoria.values())
            print(f"Valores por categoría: {valores}")
            valores.sort()
            mediana = valores[len(valores) // 2] if len(valores) % 2 != 0 else (valores[len(valores) // 2 - 1] + valores[len(valores) // 2]) // 2

            # Validar que la desviación no sea mayor a 2 respecto a la mediana
            for categoria, count in lugares_por_categoria.items():
                if abs(count - mediana) > 2:
                    print(f"Error: La categoría '{categoria}' tiene una desviación mayor a 2 respecto a la mediana.")
                    return False

            # Si pasa todas las validaciones, el plan es correcto
            return True

        except Exception as e:
            print("Error al comprobar la validez del plan:", e)
            raise
        
    def get_user_stats(self, user_email):
        try:
            query = {"user": user_email}
            results = list(self.collection.find(query))
            if len(results) == 0:
                print("No se encontraron viajes para el usuario.")
                return {
                    "num_viajes": 0,
                    "duracion_total": 0,
                    "energia_total_ahorrada": 0.0,
                    "horas_totales_ahorradas": 0,
                    "tokens_totales": 0
                }
            else:
                print("Se encontraron viajes para el usuario.")
                num_viajes = len(results)
                duracion_total = 0
                energia_total_ahorrada = 0.0
                horas_totales_ahorradas = 0
                tokens_totales = 0

                for viaje in results:
                    # Duración total
                    duracion = viaje.get("travelPlan", {}).get("duracion_viaje", 0)
                    duracion_total += duracion
                    # Tokens totales
                    tokens = viaje.get("cost", 0)
                    tokens_totales += tokens

                    # Energía ahorrada (puede venir como "0.05 KWh")
                    energia_str = viaje.get("travelPlan", {}).get("estimacion_ahorro", {}).get("energia_ahorrada", "0")
                    try:
                        energia_val = float(energia_str.split()[0])
                    except Exception:
                        energia_val = 0.0
                    energia_total_ahorrada += energia_val

                    # Horas ahorradas
                    horas = viaje.get("travelPlan", {}).get("estimacion_ahorro", {}).get("horas_estimadas_ahorradas", 0)
                    try:
                        horas = int(horas)
                    except Exception:
                        horas = 0
                    horas_totales_ahorradas += horas

                return {
                    "num_viajes": num_viajes,
                    "duracion_total": duracion_total,
                    "energia_total_ahorrada": energia_total_ahorrada,
                    "horas_totales_ahorradas": horas_totales_ahorradas,
                    "tokens_totales": tokens_totales
                }
        except Exception as e:
            print("Error al buscar viajes en MongoDB:", e)
            raise