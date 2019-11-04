from rest_framework import serializers
from .models import *


class CountrySerializer (serializers.Serializer):
    class Meta:
        model = Country
        fields = '__all__'


class AirportSerializer (serializers.Serializer):
    class Meta:
        model = Airport
        fields = '__all__'


class AirplaneSerializer (serializers.Serializer):
    class Meta:
        model = Airplane
        fields = '__all__'


class AirlineSerializer (serializers.Serializer):
    class Meta:
        model = Airline
        fields = '__all__'


class CrewSerializer (serializers.Serializer):
    class Meta:
        model = Crew
        fields = '__all__'


class CrewMemberSerializer (serializers.Serializer):
    class Meta:
        model = CrewMember
        fields = '__all__'


class FlightSerializer (serializers.Serializer):
    class Meta:
        model = Flight
        fields = '__all__'


class ReservationSerializer (serializers.Serializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class LuggageSerializer (serializers.Serializer):
    class Meta:
        model = Luggage
        fields = '__all__'
