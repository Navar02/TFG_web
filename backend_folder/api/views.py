from datetime import datetime
import json
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.utils.timezone import make_aware
from handlers.openAIFunctions import OpenAIPromptGenerator
from handlers.mongo_handler import MongoDBHandler  # Importa la clase
from .models import User, SecurityQuestion, Categories
from handlers.token_handler import verify_token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from handlers.email_handler import EmailHandler
import jwt
from django.http import HttpResponse

@api_view(['POST'])
def register_view(request):
    required_fields = ['email', 'password', 'security_question_id', 'answer', 'alias']
    for field in required_fields:
        if field not in request.data or not request.data[field]:
            return Response({"message": "incorrect payload"}, status=status.HTTP_400_BAD_REQUEST)
    
    username = request.data['email']
    password = request.data['password']
    security_question_id = request.data['security_question_id']
    answer = request.data['answer']
    alias = request.data['alias']
    
    if username != request.data['email']:
        return Response({"message": "username and email must be the same"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        security_question = SecurityQuestion.objects.get(id=security_question_id)
    except SecurityQuestion.DoesNotExist:
        return Response({"message": "Security question not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if User.objects.filter(username=username).exists():
        return Response({"message": "An account with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.create_user(
            username=username,
            email=username,
            password=password,
            securityQuestion=security_question,
            answer=answer,
            alias=alias,
            is_active=False,
            last_login=None
        )
        user.save()
        EmailHandler().send_confirmation_email(user.email)
    except Exception as e:
        return Response({"message": "Database error: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def activate_account_view(request):
    token = request.query_params.get('token')
    if not token:
        return Response({"message": "Token is missing"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        payload = jwt.decode(token, os.environ["SECRET_KEY"], algorithms=["HS256"])
        user_email = payload['email']
        user = User.objects.get(email=user_email)
        if user.is_active:
            return Response({"message": "Account is already activated"}, status=status.HTTP_400_BAD_REQUEST)
        user.is_active = True
        user.save()
        html_content = f"""
            <html>
            <head>
                <meta http-equiv="refresh" content="5;url=http://localhost" />
            </head>
            <body>
                <h1>Account activated successfully</h1>
                <p>Your account with email {user_email} has been activated successfully.</p>
                <p>You will be redirected to the home page in 5 seconds.</p>
            </body>
            </html>
        """
        return HttpResponse(html_content)
    except jwt.ExpiredSignatureError:
        return Response({"message": "Activation link has expired"}, status=status.HTTP_400_BAD_REQUEST)
    except jwt.InvalidTokenError:
        return Response({"message": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"message": "An error occurred: " + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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

@api_view(['GET'])
def getSecQues_view(request):
    security_questions = SecurityQuestion.objects.all()
    questions = [{"id": question.id, "question": question.question} for question in security_questions]
    return Response(questions, status=status.HTTP_200_OK)

@api_view(['GET'])
def getCategories_view(request):
    categories = Categories.objects.all()
    categories = [{"id": category.id, "name": category.type} for category in categories]
    return Response(categories, status=status.HTTP_200_OK)

@api_view(['POST'])
def login_view(request):
    required_fields = ['email', 'password']
    for field in required_fields:
        if field not in request.data:
            return Response({"message": "incorrect payload"}, status=status.HTTP_400_BAD_REQUEST)
    
    username = request.data['email']
    password = request.data['password']
    
    user = User.objects.filter(username=username).first()
    if user is None:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if not user.check_password(password):
        return Response({"message": "Incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)
    
    if not user.is_active:
        return Response({"message": "User is not active"}, status=status.HTTP_401_UNAUTHORIZED)

    # Actualizar last_login
    user.last_login = make_aware(datetime.now())
    user.save()
    
    # Generate tokens
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)
    
    # Prepare user data
    user_data = {
        'alias': user.alias,
        'email': user.email,
        'access_token': access_token,
        'refresh_token': refresh_token,
        'role': None,
    }
    
    if user.is_superuser:
        user_data['role'] = 'admin'
    else:
        user_data['role'] = 'user'
        
    response = Response({
        "message": "Login successful",
        "user_data": user_data
    }, status=status.HTTP_200_OK)
    
    return response

@api_view(['POST'])
def verify_view(request):
    data = request.data.get('user_data')
    if data is None:
        return Response({"message": "User not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
    
    required_fields = ['alias', 'email', 'access_token', 'refresh_token', 'role']
    for field in required_fields:
        if field not in data:
            return Response({"message": f"Missing field: {field}"}, status=status.HTTP_400_BAD_REQUEST)
    
    is_valid, message = verify_token(data)
    if not is_valid:
        return Response({"message": message}, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response({"message": message}, status=status.HTTP_200_OK)


