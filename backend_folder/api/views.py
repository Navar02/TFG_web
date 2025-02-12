from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from handlers.openAIFunctions import OpenAIPromptGenerator
from handlers.mongo_handler import MongoDBHandler  # Importa la clase

@api_view(['POST'])
def plan_view(request):
    required_fields = ['city', 'categories', 'includeHotels', 'includeRestaurants']
    for field in required_fields:
        if field not in request.data:
            return Response({"message": "incorrect payload"}, status=status.HTTP_400_BAD_REQUEST)
    
    city = request.data['city']
    categories = request.data['categories']
    include_hotels = request.data['includeHotels']
    include_restaurants = request.data['includeRestaurants']
    
    # Genera el prompt para la API de OpenAI
    prompt = f"Generate a travel plan for {city} including the following categories: {', '.join(categories)}."
    if include_hotels:
        prompt += " Include recommendations for hotels."
    if include_restaurants:
        prompt += " Include recommendations for restaurants."
    
    try:
        # Inicializa el generador de prompts de OpenAI
        openai_generator = OpenAIPromptGenerator()
        generate_travel_plan = openai_generator.create_prompt_function(
            system_message="You are a helpful travel assistant.",
            max_tokens=500,
            temperature=0.7
        )
        # Genera el plan de viaje usando la función generada
        travel_plan = generate_travel_plan(prompt)
    except Exception as e:
        print("Error con la petición a OpenAI:", e)
        travel_plan = "Error: Could not generate a travel plan at this time."
    
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    # Guardar la respuesta en la colección trip usando MongoDBHandler
    trip_data = {
        "user": None,
        "date": date,
        "location": city,
        "categories": categories,
        "includeHotels": include_hotels,
        "includeRestaurants": include_restaurants,
        "travelPlan": travel_plan
    }
    
    try:
        mongo_handler = MongoDBHandler()
        mongo_handler.save_trip(trip_data)
        trip_data.pop("_id", None)
    except Exception as e:
        return Response({"message": "Database connection error."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response(trip_data, status=status.HTTP_200_OK)