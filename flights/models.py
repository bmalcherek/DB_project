from django.db import models
from django.contrib.auth.models import User


class Country (models.Model):
    name = models.CharField(max_length=200)
    continent = models.CharField(max_length=50)
    language = models.CharField(max_length=100)
    currency = models.CharField(max_length=100)


class Airport (models.Model):
    IATA_code = models.CharField(max_length=3)
    ICAO_code = models.CharField(max_length=4)
    name = models.CharField(max_length=200)
    country = models.ForeignKey(Country, on_delete=models.PROTECT)


class Airplane (models.Model):
    name = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=100)
    symbol = models.CharField(max_length=100)
    produced = models.DateField()


class Airline (models.Model):
    iata_code = models.CharField(max_length=2)
    icao_code = models.CharField(max_length=3)
    name = models.CharField(max_length=100)
    base_airport = models.ForeignKey(Airport, on_delete=models.PROTECT)


class Crew (models.Model):
    size = models.IntegerField()
    airline = models.ForeignKey(Airline, on_delete=models.CASCADE)


class CrewMember (models.Model):
    name = models.CharField(max_length=100)
    airline = models.ForeignKey(Airline, on_delete=models.SET_NULL, null=True)
    crew = models.ForeignKey(Crew, on_delete=models.SET_NULL, null=True)
    job_title = models.CharField(max_length=100)


class Flight (models.Model):
    flight_number = models.CharField(max_length=50)
    airline = models.ForeignKey(Airline, on_delete=models.CASCADE)
    from_airport = models.ForeignKey(
        Airport, on_delete=models.PROTECT, related_name='from+')
    to_airport = models.ForeignKey(
        Airport, on_delete=models.PROTECT, related_name='to+')
    crew = models.ForeignKey(Crew, on_delete=models.SET_NULL, null=True)
    airplane = models.ForeignKey(
        Airplane, on_delete=models.SET_NULL, null=True)
    departure_date = models.DateField()
    arrival_date = models.DateField()


class Reservation (models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    price = models.FloatField()


class Luggage (models.Model):
    amount = models.IntegerField()
    weight_limit = models.IntegerField()
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
