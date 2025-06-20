from datetime import datetime
import asyncio
import json
import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.utils.timezone import make_aware
from handlers.openAIFunctions import OpenAIPromptAgent
from handlers.mongo_handler import MongoDBHandler  # Importa la clase
from handlers.pdf_handler import PDFGenerator
from .models import User, SecurityQuestion, Categories
from handlers.token_handler import verify_token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from handlers.email_handler import EmailHandler
import jwt
from django.http import HttpResponse
from bson import ObjectId

# Inicializa el agente de OpenAI
agent = OpenAIPromptAgent()

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
    required_fields = ['city', 'categories', 'startDate', 'endDate']
    for field in required_fields:
        if field not in request.data:
            return Response({"message": "incorrect payload"}, status=status.HTTP_400_BAD_REQUEST)
    
    city = request.data['city']
    categories = request.data['categories']
    start_date = request.data['startDate']
    end_date = request.data['endDate']
    print("Received data:", request.data)
    mongo_handler = MongoDBHandler()
    # Calcular la duración del viaje en días
    try:
        start_date_obj = datetime.strptime(start_date, "%Y-%m-%d")
        end_date_obj = datetime.strptime(end_date, "%Y-%m-%d")
        duration = (end_date_obj - start_date_obj).days
        if duration <= 0:
            return Response({"message": "End date must be after start date"}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError:
        return Response({"message": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
    print("Duration:", duration)
    cost = 0
    
    try:
        if mongo_handler.check_city_in_db(city):
            trip_data = {
                "city": city,
                "categories": categories,
                "startDate": start_date,
                "endDate": end_date,
                "duration": duration
            }
            trip = mongo_handler.get_trip_match_perfect(trip_data)
            print("Trip from DB found:", trip)
            print("class:", type(trip))
            #transformar el objeto dict a json
            if trip is not None:
                trip_json = json.loads(json.dumps(trip, default=str))
                trip_json.pop("_id", None)  # Eliminar el ID de MongoDB antes de devolver la respuesta
                print("Trip JSON:", trip_json)
                travel_plan = trip_json["travelPlan"]
            else:
                if mongo_handler.check_any_categories_for_city(city, categories):
                    new_trip = mongo_handler.mount_trip_from_data(trip_data)
                    print("New trip from DB found:", new_trip)
                    is_complete = mongo_handler.check_plan_is_correct(new_trip)
                    print("Is complete:", is_complete)
                    if is_complete:
                        travel_plan = new_trip
                    else:
                        print("Trip not complete. Generating new plan.")
                        #travel_plan = complete_plan(city, duration, categories, new_trip)  
                        #New plan generation from scratch, not token wise to complete the plan with data from DB
                        cost, travel_plan = generate_plan(city, duration, categories)
                else:
                    print("No likes found in DB. But the city exists.")
                    cost, travel_plan = generate_plan(city, duration, categories)
                    
        else:
            cost, travel_plan = generate_plan(city, duration, categories)
            
    except ValueError as ve:
        print("Error al procesar el JSON del plan de viaje:", ve)
        return Response({"message": "Error: Invalid travel plan format."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        print("Error al generar el plan de viaje con el agente:", e)
        return Response({"message": "Error: Could not generate a travel plan at this time."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if travel_plan.get("error",None) is not None:
        return Response({"message": travel_plan["error"]}, status=status.HTTP_404_NOT_FOUND)
    
    print("Generated travel plan:", travel_plan)
    date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    usr = None
    data = request.data.get('user_data')
    if data is not None:
        field_missing = False
        required_fields = ['alias', 'email', 'access_token', 'refresh_token', 'role']
        for field in required_fields:
            if field not in data:
                usr = None
                field_missing = True
                break
        if not field_missing:
            is_valid, message = verify_token(data)
            if is_valid:
                usr = data['email']
            
    print("User data:", usr)
    # Guardar la respuesta en la colección trip usando MongoDBHandler
    trip_data = {
        "user": usr,  # Aquí puedes asociar el usuario si es necesario
        "date": date,
        "location": city,
        "startDate": start_date,
        "endDate": end_date,
        "categories": categories,
        "travelPlan": travel_plan,
        "cost": cost,
    }
    
    try:
        mongo_handler.save_trip(trip_data)
        trip_data.pop("_id", None)  # Eliminar el ID de MongoDB antes de devolver la respuesta
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

@api_view(['POST'])
def get_trip_or_trips_view(request):
    try:
        trip_id = request.data.get('id',None)
        user = request.data.get('user_data',None)
        print("Received id:", id)
        print("User data:", user)
        checker = verify_token(user)
        if checker[0]:
            mongo_handler = MongoDBHandler()
            if trip_id:
                # Si hay id, buscar solo ese viaje
                trip = mongo_handler.get_trip_by_id(ObjectId(trip_id), user['email'])
                trip.pop("_id", None)  # Eliminar el ID de MongoDB antes de devolver la respuesta
                if trip:
                    return Response(trip, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Trip not found"}, status=status.HTTP_404_NOT_FOUND)
            else:
                # Si no hay id, devolver todos los viajes
                trips = mongo_handler.get_trips_by_user(user['email'])
                for trip in trips:
                    trip['_id'] = str(trip['_id'])
                return Response(trips, status=status.HTTP_200_OK)
        else:
            return Response({"message": checker[1]}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        print("Error al obtener los viajes:", e)
        return Response({"message": "Error: Could not retrieve trips at this time."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def generate_plan(city, duration, categories):
            # Genera el plan de viaje usando el agente
    cost, raw_travel_plan = asyncio.run(agent.generate_travel_plan(city, duration, categories))
            
    # Extraer el JSON válido desde la primera '{' hasta la última '}'
    start_index = raw_travel_plan.find('{')
    end_index = raw_travel_plan.rfind('}')
    print("start_index:", start_index)
    print("end_index:", end_index)
    if start_index == -1 or end_index == -1:
        print("Error: No JSON found in the response.")
        raise ValueError("El resultado del agente no contiene un JSON válido.")
    print("raw_travel_plan:", raw_travel_plan[start_index:end_index + 1])
    travel_plan = json.loads(raw_travel_plan[start_index:end_index + 1])
    return cost, travel_plan

def complete_plan(city, duration, categories, plan):
    raw_travel_plan = asyncio.run(agent.complete_travel_plan(city, duration, categories, plan))
    start_index = raw_travel_plan.find('{')
    end_index = raw_travel_plan.rfind('}')
    if start_index == -1 or end_index == -1:
        print("Error: No JSON found in the response.")
        raise ValueError("El resultado del agente no contiene un JSON válido.")
    return json.loads(raw_travel_plan[start_index:end_index + 1])

@api_view(['POST'])
def generate_pdf_view(request):
    pdf_handler = PDFGenerator()
    type = request.data.get('type')
    if type is None:
        return Response({"message": "Type not provided"}, status=status.HTTP_400_BAD_REQUEST)
    if type not in ['plan', 'tokens']:
        return Response({"message": "Invalid type"}, status=status.HTTP_400_BAD_REQUEST)
    if type == 'tokens':
        data = request.data.get('user_data')
        role = data.get('role')
        if role is None:
            return Response({"message": "User credentials not provided"}, status=status.HTTP_401_UNAUTHORIZED)
        if role != 'admin' and (role == 'admin' and User.objects.filter(email=data['email'], is_superuser=False).exists()):
            return Response({"message": "User is not admin"}, status=status.HTTP_401_UNAUTHORIZED)
            
        if data is None:
            return Response({"message": "User credentials not provided"}, status=status.HTTP_401_UNAUTHORIZED)
        checker = verify_token(data)
        if checker[0]:
            mongo_handler = MongoDBHandler()
            tokens = mongo_handler.get_token_consumptions()
            if tokens is None:
                return Response({"message": "No tokens found"}, status=status.HTTP_404_NOT_FOUND)
            pdf = pdf_handler.render_pdf_bytes('tokens_pdf.html', tokens)
    else:
        data = request.data.get('travelPlan')
        print(data)
        if data is None:
            return Response({"message": "Trip data not provided"}, status=status.HTTP_400_BAD_REQUEST)
        pdf = pdf_handler.render_pdf_bytes('plan_pdf.html', data)
     # Return the PDF as an HTTP response
    response = HttpResponse(pdf, content_type='application/pdf')
    if type == 'plan':
        response['Content-Disposition'] = 'attachment; filename="plan_de_viaje.pdf"'
    else:
        response['Content-Disposition'] = 'attachment; filename="consumo_de_tokens.pdf"'
    return response

@api_view(['POST'])
def get_user_stats_view(request):
    data = request.data.get('user_data')
    if data is None:
        return Response({"message": "User credentials not provided"}, status=status.HTTP_401_UNAUTHORIZED)
    
    checker = verify_token(data)
    if checker[0]:
        mongo_handler = MongoDBHandler()
        user_stats = mongo_handler.get_user_stats(data['email'])
        return Response(user_stats, status=status.HTTP_200_OK)
    else:
        return Response({"message": checker[1]}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def get_all_active_users_view(request):
    data = request.data.get('user_data')
    if data is None:
        return Response({"message": "User credentials not provided"}, status=status.HTTP_401_UNAUTHORIZED)
    
    if data.get('role') != 'admin':
        return Response({"message": "User is not admin"}, status=status.HTTP_401_UNAUTHORIZED)
    
    checker = verify_token(data)
    if checker[0]:
        Users = User.objects.filter()
        users_list = []
        for user in Users:
            user_dict = {
                "email": user.email,
                "alias": user.alias,
                "role": "Administrador" if user.is_superuser else "Usuario",
                "last_login": user.last_login.strftime("%Y-%m-%d %H:%M:%S") if user.last_login else None,
                "active": user.is_active,
            }
            user_dict['stats'] = MongoDBHandler().get_user_stats(user.email)
            users_list.append(user_dict)
        user_dict = {
            "email": "Anonymous",
            "alias": "Anonymous",
            "role": "Usuario anónimo",
            "last_login": None,
        }
        user_dict['stats'] = MongoDBHandler().get_user_stats(None)
        users_list.append(user_dict)
        return Response(users_list, status=status.HTTP_200_OK)
    else:
        return Response({"message": checker[1]}, status=status.HTTP_401_UNAUTHORIZED)   
    
@api_view(['POST'])
def disable_user_view(request):
    data = request.data.get('user_data')
    if data is None:
        return Response({"message": "User credentials not provided"}, status=status.HTTP_401_UNAUTHORIZED)
    if data.get('role') != 'admin':
        return Response({"message": "User is not admin"}, status=status.HTTP_401_UNAUTHORIZED)
    checker = verify_token(data)
    if checker[0]:
        email = request.data.get('email')
        if not email:
            return Response({"message": "Email not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(email=email)
            if user.is_superuser:
                return Response({"message": "Cannot disable admin user"}, status=status.HTTP_400_BAD_REQUEST)
            if not user.is_active:
                return Response({"message": "User is already disabled"}, status=status.HTTP_400_BAD_REQUEST)
            user.is_active = False
            user.save()
            return Response({"message": "User disabled successfully"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({"message": checker[1]}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
def get_consumptions_view(request):
    data = request.data.get('user_data')
    if data is None:
        return Response({"message": "User credentials not provided"}, status=status.HTTP_401_UNAUTHORIZED)
    if data.get('role') != 'admin':
        return Response({"message": "User is not admin"}, status=status.HTTP_401_UNAUTHORIZED)
    
    checker = verify_token(data)
    if checker[0]:
        mongo_handler = MongoDBHandler()
        consumptions = mongo_handler.get_token_consumptions()
        return Response(consumptions, status=status.HTTP_200_OK)
    else:
        return Response({"message": checker[1]}, status=status.HTTP_401_UNAUTHORIZED)    