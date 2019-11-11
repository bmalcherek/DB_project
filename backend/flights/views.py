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


class CountriesList (generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


class AirportsList (generics.ListAPIView):
    queryset = Airport.objects.all()
    serializer_class = AirlineSerializer


class AirplaneModelsList (generics.ListAPIView):
    queryset = AirplaneModel.objects.all()
    serializer_class = AirplaneModelSerializer


class AirplanesList (generics.ListAPIView):
    queryset = Airplane.objects.all()
    serializer_class = AirplaneSerializer


class AirlinesList (generics.ListAPIView):
    queryset = Airline.objects.all()
    serializer_class = AirlineSerializer


class CrewsList (generics.ListAPIView):
    queryset = Crew.objects.all()
    serializer_class = CrewSerializer


class CrewMembersList (generics.ListAPIView):
    queryset = CrewMember.objects.all()
    serializer_class = CrewMemberSerializer


class FlightsList (generics.ListAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer


class ReservationsList (generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


class LuggagesList (generics.ListAPIView):
    queryset = Luggage.objects.all()
    serializer_class =  LuggageSerializer
