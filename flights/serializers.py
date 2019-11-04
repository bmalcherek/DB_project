from rest_framework import serializers
from .models import *


class CountrySerializer (serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class AirportSerializer (serializers.ModelSerializer):
    class Meta:
        model = Airport
        fields = '__all__'


class AirplaneSerializer (serializers.ModelSerializer):
    class Meta:
        model = Airplane
        fields = '__all__'


class AirlineSerializer (serializers.ModelSerializer):
    class Meta:
        model = Airline
        fields = '__all__'


class CrewSerializer (serializers.ModelSerializer):
    class Meta:
        model = Crew
        fields = '__all__'


class CrewMemberSerializer (serializers.ModelSerializer):
    class Meta:
        model = CrewMember
        fields = '__all__'


class FlightSerializer (serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'


class ReservationSerializer (serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class LuggageSerializer (serializers.ModelSerializer):
    class Meta:
        model = Luggage
        fields = '__all__'
