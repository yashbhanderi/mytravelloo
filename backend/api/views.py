import io
import datetime
import uuid
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from mytravelloo.models import User, Trip, Destination, Payment, Agent
from .serializers import CustomerRegisterSerializer, AgentRegisterSerializer, DestinationListSerializer, DestinationSerializer, TripSerializer
from django.contrib.auth.hashers import check_password

# JWT Auth
import jwt
from backend.settings import SECRET_KEY


def get_parsed_data(data):
    json_data = data
    stream = io.BytesIO(json_data)
    parsed_data = JSONParser().parse(stream)
    return parsed_data

# Decode Token


@csrf_exempt
def check_token(request):
    if request.method == 'POST':
        encoded = get_parsed_data(request.body)
        encoded = encoded['token']["token"]
        decoded = jwt.decode(encoded, SECRET_KEY, algorithms=["HS256"])
        return JsonResponse({"user": decoded})

# Generate Token


dt = datetime.datetime.now() + datetime.timedelta(days=2)


def get_token(id, isAgent, username):
    encoded = jwt.encode({"id": id, "isAgent": isAgent,
                         "username": username, "exp": dt}, SECRET_KEY, algorithm="HS256")
    return encoded


@csrf_exempt
def signupView(request):

    if request.method == 'POST':
        user = get_parsed_data(request.body)

        # Check User already exists or not
        exist_user = None
        try:
            exist_user = User.objects.get(email=user['email'])
        except User.DoesNotExist:
            try:
                exist_user = User.objects.get(username=user['username'])
            except User.DoesNotExist:
                exist_user = None
            if exist_user is not None:
                return JsonResponse({'msg': "Username Already Exists !"}, status=403)
        if exist_user is not None:
            return JsonResponse({'msg': "Email Address Already Exists !"}, status=403)

        # Check Agent or Customer
        isAgent = user['isAgent']
        serializer = None

        if not isAgent:
            serializer = CustomerRegisterSerializer(data=user)
        else:
            serializer = AgentRegisterSerializer(data=user)

        # Store in database
        if serializer.is_valid():
            serializer.save()
            id = User.objects.filter(email=user["email"])[0].id
            token = get_token(id, user['isAgent'], user['username'])
            res = {
                "token": token,
                "id": id,
                "isAgent": user['isAgent'],
                "username": user['username'],
                "exp": dt
            }
            return JsonResponse(res)

        return JsonResponse({'msg': "Some Error Occured !"}, status=403)


@csrf_exempt
def loginView(request):
    if request.method == 'POST':
        parsed_data = get_parsed_data(request.body)

        email = parsed_data["email"]
        password = parsed_data["password"]

        user = None
        try:
            user = User.objects.get(email=email)

        except User.DoesNotExist:
            user = None

        if user is None:
            return JsonResponse({'msg': "User Not Exists !"}, status=403)

        if not check_password(password, user.password):
            return JsonResponse({'msg': "Wrong Password !"}, status=403)

        token = get_token(user.id, user.isAgent, user.username)

        res = {
            "token": token,
            "id": user.id,
            "isAgent": user.isAgent,
            "username": user.username,
            "exp": dt
        }
        return JsonResponse(res)

    return JsonResponse({'msg': "Some Error Occured !"}, status=403)


def destinationGroup(request):
    if request.method == 'GET':
        destinations = Destination.objects.all().only("state")

        if destinations is not None:
            s = set()
            for data in destinations:
                s.add(data.state)

            data = []
            for i, item in enumerate(s):
                state = {}
                state_data = Destination.objects.filter(state=item).first()
                state_data = DestinationSerializer(state_data).data
                state["state"] = item
                state["state_desc"] = state_data["state_desc"]
                state["img1"] = state_data["img1"]
                state["price"] = state_data["price"]
                data.append(state)

            return JsonResponse({"data": data})
        return JsonResponse({"msg": "Some Error Occurred ! Please refresh the page."}, status=403)


@csrf_exempt
def destinationList(request):
    if request.method == 'POST':
        state_name = get_parsed_data(request.body)
        state_destinations = Destination.objects.filter(
            state=state_name['state'])
        state_destinations = DestinationListSerializer(
            state_destinations, many=True, partial=True).data
        if state_destinations is not None:
            return JsonResponse({"state": state_destinations})
        return JsonResponse({"msg": "Some Error Occurred ! Please refresh the page."}, status=403)


def destination(request, id):
    if request.method == 'GET':
        get_dest = Destination.objects.get(id=id)
        get_dest_serialize = DestinationSerializer(get_dest).data
        if get_dest_serialize is not None:
            return JsonResponse({"destination": get_dest_serialize})
        return JsonResponse({"msg": "Some Error Occurred ! Please refresh the page."}, status=403)


@csrf_exempt
def date_checking(request):
    if request.method == 'POST':
        data = get_parsed_data(request.body)
        booked = Trip.objects.filter(
            date=data["date"], destination=data["dest_id"]).count()
        total_seats = Destination.objects.get(id=data["dest_id"]).seat
        required = int(data["required"])

        if required > total_seats - booked:
            return JsonResponse({"msg": "House Full"})
        elif str(datetime.date.today()) > data["date"]:
            return JsonResponse({"msg": "Invalid Date"})
        else:
            return JsonResponse({"msg": "Available"})


@csrf_exempt
def payment_checking(request):
    if request.method == 'POST':

        data = get_parsed_data(request.body)
        trip_data = data["tripData"]
        payment_obj = Payment.objects.get(card_no=data["card_no"])

        if payment_obj is not None and (str(payment_obj.cvv_no) == data["cvv_no"]) and (payment_obj.name == data["name"]) and (str(payment_obj.expiry_date) == data["expiry_date"]):

            trip_id = uuid.uuid4()

            for user in trip_data["nameData"]:
                trip = Trip(
                    trip_id=trip_id,
                    name=user["name"],
                    age=user["age"],
                    date=trip_data["date"],
                    agent_id=Destination.objects.get(
                        id=trip_data["dest_id"]).agent_id,
                    customer_id=data["customer_id"],
                    destination_id=trip_data["dest_id"],
                    email=trip_data["email"],
                    phone_no=trip_data["phone_number"],
                    address=trip_data["address"],
                    city=trip_data["city"],
                    state=trip_data["state"],
                    pincode=trip_data["pincode"])
                trip.save()

            subject = 'Welcome to MyTravelloo !'

            message = 'Hii, thank you for purchasing our tour package.\nTrip Details\n'+'destination: ' + \
                trip_data["destination"]+"\n"+'date: '+trip_data["date"]+"\n"+'address: '+trip_data["address"]+"\n" + \
                'city: '+trip_data["city"]+"\n"+'state: '+trip_data["state"] + \
                "\n"+'phone_number: '+trip_data["phone_number"]

            email_from = settings.EMAIL_HOST_USER

            recipient_list = [trip_data['email']]

            send_mail(subject, message, email_from, recipient_list)
            return JsonResponse({"msg": "Payment Successfull"})

        else:
            return JsonResponse({"msg": "Payment Failed"}, status=403)


@csrf_exempt
def get_mail(request):
    if request.method == 'POST':
        data = get_parsed_data(request.body)
        if data is not None:
            trips = Trip.objects.filter(trip_id=data["trip_id"])
            trips = TripSerializer(trips, many=True, partial=True).data
            agent = User.objects.get(id=trips[0]["agent"])
            agent_info = Agent.objects.get(id=trips[0]["agent"])
            dest_name = Destination.objects.get(id=trips[0]["destination"]).name

            name = ""
            for user in trips:
                name += "Name: " + str(user["name"]) + \
                    ", Age: " + str(user["age"]) + "\n"

            subject = "Welcome to MyTravelloo !"
            message = "Hooorah ! Your Booking is Successfully done.\n\n"\
                "Trip Details:\n"\
                "Destination: " + str(dest_name)+"\n"\
                "Company Name: " + str(agent_info.company_name)+"\n"\
                "Journey Date: " + str(trips[0]["date"])+"\n"\
                "Booking Time: " + str(trips[0]["time_of_booking"]) +\
                "\n\nTravellors Details:\n" +\
                name + "\n"\
                "Email: " + str(trips[0]["email"])+"\n"\
                "Phone Number: " + str(trips[0]["phone_no"])+"\n"\
                "Address: " + str(trips[0]["address"])+"\n"\
                "City: " + str(trips[0]["city"])+"\n"\
                "State: " + str(trips[0]["state"])+"\n"\
                "Pincode: " + str(trips[0]["pincode"]) +\
                "\n\nCompany Contact Details:\n" +\
                "Name: " + str(agent_info.company_name)+"\n"\
                "About: " + str(agent_info.company_desc)+"\n"\
                "Email: " + str(agent.email)+"\n"\
                "Phone Number: " + str(agent.phone_no) +\
                "\n\nThank you for joining us\nHappyyy Holidayyys!:)"

            email_from = settings.EMAIL_HOST_USER

            recipient_list = [trips[0]["email"]]
            send_mail(subject, message, email_from, recipient_list)
            return JsonResponse({"msg": "Your booking details has sent to your registered email address."})
        else:
            return JsonResponse({"msg": "Network Error, Please Try after some time"}, status=403)

    return JsonResponse({"msg": "Network Error, Please Try after some time"}, status=403)


@csrf_exempt
def get_trips(request):
    if request.method == 'POST':
        data = get_parsed_data(request.body)
        trips = Trip.objects.filter(customer_id=data["customer_id"])
        trips = TripSerializer(trips, many=True, partial=True).data

        t_id = {trip["trip_id"] for trip in trips}

        my_trips = []
        for id in t_id:
            t = Trip.objects.filter(trip_id=id).first()
            t = dict(TripSerializer(t).data)
            a = Agent.objects.get(user_ptr_id=t["agent"])
            d = Destination.objects.get(id=t["destination"])
            t["destination"] = d.name
            t["company_name"] = a.company_name
            my_trips.append(t)

        return JsonResponse({"trips": my_trips})
    return JsonResponse({"msg": "Network Error, Please Try after some time"}, status=403)
