from rest_framework import serializers
from . import models
from django.contrib.auth import get_user_model


class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'


class CountrySerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = '__all__'


class AirportSerializer (serializers.ModelSerializer):
    country = serializers.SlugRelatedField(
        slug_field="name",
        queryset=models.Country.objects.all()
    )

    class Meta:
        model = models.Airport
        fields = '__all__'


class AirplaneModelSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.AirplaneModel
        fields = '__all__'


class AirplaneSerializer (serializers.ModelSerializer):
    airplane_model = serializers.SlugRelatedField(
        slug_field="name",
        queryset=models.AirplaneModel.objects.all()
    )

    class Meta:
        model = models.Airplane
        fields = '__all__'


class AirlineSerializer (serializers.ModelSerializer):
    base_airport = serializers.SlugRelatedField(
        slug_field="name",
        queryset=models.Airport.objects.all()
    )

    class Meta:
        model = models.Airline
        fields = '__all__'


class CrewSerializer (serializers.ModelSerializer):
    airline = serializers.SlugRelatedField(
        slug_field='name',
        queryset=models.Airline.objects.all()
    )

    class Meta:
        model = models.Crew
        fields = '__all__'


class CrewMemberSerializer (serializers.ModelSerializer):
    airline = serializers.SlugRelatedField(
        slug_field='name',
        queryset=models.Airline.objects.all()
    )

    class Meta:
        model = models.CrewMember
        fields = '__all__'


class FlightSerializer (serializers.ModelSerializer):
    airline = serializers.SlugRelatedField(
        slug_field='icao_code',
        queryset=models.Airline.objects.all()
    )

    from_airport = serializers.SlugRelatedField(
        slug_field="ICAO_code",
        queryset=models.Airport.objects.all()
    )

    to_airport = serializers.SlugRelatedField(
        slug_field="ICAO_code",
        queryset=models.Airport.objects.all()
    )

    airplane = serializers.SlugRelatedField(
        slug_field="registration",
        queryset=models.Airplane.objects.all()
    )

    class Meta:
        model = models.Flight
        fields = '__all__'


class ReservationSerializer (serializers.ModelSerializer):
    flight = serializers.SlugRelatedField(
        slug_field="flight_number",
        queryset=models.Flight.objects.all()
    )

    user = serializers.SlugRelatedField(
        slug_field="username",
        read_only=True
    )

    class Meta:
        model = models.Reservation
        fields = '__all__'


class LuggageSerializer (serializers.ModelSerializer):
    class Meta:
        model = models.Luggage
        fields = '__all__'
