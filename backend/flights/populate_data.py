import os
import sys
import json
from datetime import timedelta

sys.path.append('/home/krystian/Pulpit/Projekt IO/DB_project')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.db_project.settings')
from backend.db_project import settings

# setup_environ(settings)
from .models import *
#import  ipdb; ipdb.set_trace()

import random
from faker import Faker
from django.db import models

fakegen = Faker()
def create_all_countries():
    with open('/home/krystian/Pulpit/Projekt IO/DB_project/backend/flights/countries.json', 'r') as f:
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
    with open("/home/krystian/Pulpit/Projekt IO/DB_project/backend/flights/airports.json") as f:
        data = json.load(f)
        for airport in data:
            iata_code = airport['code']
            icao_code = airport['icao']
            name_air = airport['city'] + " " + airport['name']
            try:
                country = Country.objects.get(name=airport['country'])
            except:
                country = -1
            if iata_code=='' or icao_code=='' or name_air=='' or country == -1:
                continue
            else:
                try:
                     _, created = Airport.objects.get_or_create(
                    name = name_air,
                    country = country,
                    IATA_code =iata_code,
                    ICAO_code = icao_code)
                except:
                    print("Error with record " + name_air)

def create_airlines():
    with open("/home/krystian/Pulpit/Projekt IO/DB_project/backend/flights/airlines.json") as f:
        data = json.load(f)
        for airline in data:
            iata_code = airline['iata']
            icao_code = airline['icao']
            name = airline['name']
            if iata_code == '' or icao_code=='':
                continue
            else:
                base_i = Airport.objects.order_by('?').first()
                _, created = Airline.objects.get_or_create(
                    iata_code = iata_code,
                    icao_code = icao_code,
                    name = name,
                    base_airport = base_i
                )


def create_crew(N):
    size = N
    airline = Airline.objects.order_by('?').first()
    Crew.objects.get_or_create(
        size = size,
        airline = airline
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
                name = name,
                airline = crew.airline,
                crew = crew,
                job_title = role
            )





def create_airplane_models():
    fake_gen = Faker()
    with open("/home/krystian/Pulpit/Projekt IO/DB_project/backend/flights/airplane_model.json") as f:
        data = json.load(f)
        for a in data:
            name = a['name']
            manufacturer = a['manufacturer']
            symbol = fake_gen.ean(length =8)
            AirplaneModel.objects.get_or_create(
                name = name,
                manufacturer = manufacturer,
                symbol = symbol

            )
def create_ariplanes(N):
    all_models = AirplaneModel.objects.all()
    fake_gen = Faker()
    for i in all_models:
        for j in range(N):
            data_prod = fake_gen.date_time_this_century(before_now=True, after_now=False, tzinfo=None)
            registration = fake_gen.ean8()
            Airplane.objects.get_or_create(
                produced = data_prod,
                registration = registration,
                airplane_model = i
            )

def generate_flight():
    fake_gen = Faker()
    number = random.randint(0,100000)
    from_airport = Airport.objects.order_by('?').first()
    to_airport = Airport.objects.order_by('?').first()
    if from_airport.id == to_airport.id:
        to_airport = Airport.objects.order_by('?').first()
    crew = Crew.objects.order_by('?').first()
    airline = crew.airline
    departure_date = fake_gen.date_this_decade(before_today = False, after_today=True)
    arrival_date = departure_date + timedelta(days=1)
    airplane = Airplane.objects.order_by('?').first()
    Flight.objects.get_or_create(
        flight_number = number,
        from_airport = from_airport,
        to_airport = to_airport,
        crew = crew,
        airline = airline,
        departure_date = departure_date,
        arrival_date = arrival_date,
        airplane = airplane,
        num_places = random.randint(100,200)
    )
