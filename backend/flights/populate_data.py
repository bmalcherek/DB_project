from django.db import models
from faker import Faker
import random
from .models import *
import os
import sys
import json
from datetime import timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.db_project.settings')


fakegen = Faker()


def create_all_countries():
    with open('flights/countries.json', 'r') as f:
        data = json.load(f)
        for country in data:
            try:
                _, created = Country.objects.get_or_create(
                    name=data[country]['name'],
                    continent=data[country]['continent'],
                    language=data[country]['languages'][0],
                    currency=data[country]['currency']
                )
            except:
                print("Error with record " + data[country]['name'])


def create_airports():
    with open("flights/airports.json") as f:
        data = json.load(f)
        for airport in data:
            iata_code = airport['code']
            icao_code = airport['icao']
            name_air = airport['city'] + " " + airport['name']
            try:
                country = Country.objects.get(name=airport['country'])
            except:
                country = -1
            if iata_code == '' or icao_code == '' or name_air == '' or country == -1:
                continue
            else:
                try:
                    _, created = Airport.objects.get_or_create(
                        name=name_air,
                        country=country,
                        IATA_code=iata_code,
                        ICAO_code=icao_code)
                except:
                    print("Error with record " + name_air)


def create_airlines():
    with open("flights/airlines.json") as f:
        data = json.load(f)
        for airline in data:
            iata_code = airline['iata']
            icao_code = airline['icao']
            name = airline['name']
            if iata_code == '' or icao_code == '':
                continue
            else:
                base_i = Airport.objects.order_by('?').first()
                _, created = Airline.objects.get_or_create(
                    iata_code=iata_code,
                    icao_code=icao_code,
                    name=name,
                    base_airport=base_i
                )


def create_crew(N):
    size = N
    airline = Airline.objects.order_by('?').first()
    Crew.objects.get_or_create(
        size=size,
        airline=airline
    )


def fill_crews():
    all_crews = Crew.objects.all()
    fake_gen = Faker()
    for crew in all_crews:
        for num in range(crew.size):
            if num == 0:
                role = "Pilot"
            else:
                role = "Steward"
            name = fake_gen.name()
            CrewMember.objects.get_or_create(
                name=name,
                airline=crew.airline,
                crew=crew,
                job_title=role
            )


def create_airplane_models():
    fake_gen = Faker()
    with open("flights/airplane_model.json") as f:
        data = json.load(f)
        for a in data:
            name = a['name']
            manufacturer = a['manufacturer']
            symbol = fake_gen.ean(length=8)
            AirplaneModel.objects.get_or_create(
                name=name,
                manufacturer=manufacturer,
                symbol=symbol

            )


def create_airplanes(N):
    all_models = AirplaneModel.objects.all()
    fake_gen = Faker()
    for i in all_models:
        for j in range(N):
            data_prod = fake_gen.date_time_this_century(
                before_now=True, after_now=False, tzinfo=None)
            registration = fake_gen.ean8()
            Airplane.objects.get_or_create(
                produced=data_prod,
                registration=registration,
                airplane_model=i
            )


def generate_flight():
    fake_gen = Faker()
    number = random.randint(0, 100000)
    from_airport = Airport.objects.order_by('?').first()
    to_airport = Airport.objects.order_by('?').first()
    if from_airport.id == to_airport.id:
        to_airport = Airport.objects.order_by('?').first()
    crew = Crew.objects.order_by('?').first()
    airline = crew.airline
    departure_date = fake_gen.date_this_decade(
        before_today=False, after_today=True)
    arrival_date = departure_date + timedelta(days=1)
    airplane = Airplane.objects.order_by('?').first()
    Flight.objects.get_or_create(
        flight_number=number,
        from_airport=from_airport,
        to_airport=to_airport,
        crew=crew,
        airline=airline,
        departure_date=departure_date,
        arrival_date=arrival_date,
        airplane=airplane
    )


def populate_database():
    create_all_countries()
    create_airports()
    create_airlines()
    create_crew(1000)
    fill_crews()
    create_airplane_models()
    create_airplanes(500)
    generate_flight()
