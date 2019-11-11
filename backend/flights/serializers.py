from rest_framework import serializers
from . import models


class CountrySerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = '__all__'


class AirportSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Airport
        fields = '__all__'


class AirplaneModelSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.AirplaneModel
        fields = '__all__'


class AirplaneSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Airplane
        fields = '__all__'


class AirlineSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Airline
        fields = '__all__'


class CrewSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Crew
        fields = '__all__'


class CrewMemberSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.CrewMember
        fields = '__all__'


class FlightSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Flight
        fields = '__all__'


class ReservationSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Reservation
        fields = '__all__'


class LuggageSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Luggage
        fields = '__all__'
