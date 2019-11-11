from rest_framework.decorators import api_view
from rest_framework import generics

from .serializers import (
    CountrySerializer,
    AirportSerializer,
    AirplaneModelSerializer,
    AirplaneSerializer,
    AirlineSerializer,
    CrewSerializer,
    CrewMemberSerializer,
    FlightSerializer,
    ReservationSerializer,
    LuggageSerializer
)
from .models import (
    Country,
    Airport,
    AirplaneModel,
    Airplane,
    Airline,
    Crew,
    CrewMember,
    Flight,
    Reservation,
    Luggage
)


class CountriesList (generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class AirportsList (generics.ListCreateAPIView):
    queryset = Airport.objects.all()
    serializer_class = AirlineSerializer


class AirplaneModelsList (generics.ListCreateAPIView):
    queryset = AirplaneModel.objects.all()
    serializer_class = AirplaneModelSerializer


class AirplanesList (generics.ListCreateAPIView):
    queryset = Airplane.objects.all()
    serializer_class = AirplaneSerializer


class AirlinesList (generics.ListCreateAPIView):
    queryset = Airline.objects.all()
    serializer_class = AirlineSerializer


class CrewsList (generics.ListCreateAPIView):
    queryset = Crew.objects.all()
    serializer_class = CrewSerializer


class CrewMembersList (generics.ListCreateAPIView):
    queryset = CrewMember.objects.all()
    serializer_class = CrewMemberSerializer


class FlightsList (generics.ListCreateAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer


class ReservationsList (generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


class LuggagesList (generics.ListCreateAPIView):
    queryset = Luggage.objects.all()
    serializer_class =  LuggageSerializer
