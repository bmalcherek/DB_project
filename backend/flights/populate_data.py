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
    continent_map = {
        'SA': 'South America',
        'AF': 'Africa',
        'EU': 'Europe',
        'AS': 'Asia',
        'NA': 'North America',
        'OC': 'Australia'
    }

    with open('flights/countries.json', 'r') as f:
        data = json.load(f)
        count = 0
        for country in data:
            try:
                continent = data[country]['continent']
                continent = continent_map[continent]

                Country.objects.get_or_create(
                    name=data[country]['name'],
                    continent=continent,
                    language=data[country]['languages'][0],
                    currency=data[country]['currency']
                )
                print(f"Created country: {data[country]['name']}")
                count += 1
            except:
                print("Error with record " + data[country]['name'])
        print(f'Created {count} countries')
        print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')


def create_airports(airports=100):
    with open("flights/airports.json") as f:
        data = json.load(f)
        count = 0
        while count < airports:
            airport = random.choice(data)
            iata_code = airport['code']
            icao_code = airport['icao']
            name_air = airport['city'] + " " + airport['name']
            try:
                country = Country.objects.get(name=airport['country'])
            except:
                country = -1
            if iata_code == '' or icao_code == '' or name_air == '' or country == -1:
                print("Error with record " + name_air)
                continue
            else:
                try:
                    Airport.objects.get_or_create(
                        name=name_air,
                        country=country,
                        IATA_code=iata_code,
                        ICAO_code=icao_code)
                    print(f'Created airport: {name_air}')
                    count += 1
                except:
                    print("Error with record " + name_air)

        print(f'Created {count} airports')
        print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')


def create_airlines(airlines=100):
    with open("flights/airlines.json") as f:
        data = json.load(f)
        count = 0
        while count < airlines:
            airline = random.choice(data)
            iata_code = airline['iata']
            icao_code = airline['icao']
            name = airline['name']
            if iata_code == '' or icao_code == '':
                print(f'Failed with: {name}')
                continue
            else:
                try:
                    base_i = Airport.objects.order_by('?').first()
                    Airline.objects.get_or_create(
                        iata_code=iata_code,
                        icao_code=icao_code,
                        name=name,
                        base_airport=base_i
                    )
                    print(f'Created airline: {name}')
                    count += 1
                except:
                    print(f'Failed with: {name}')
        print(f'Created {count} airlines')
        print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')


def make_crew(size=5):
    airline = Airline.objects.order_by('?').first()
    Crew.objects.get_or_create(
        size=size,
        airline=airline
    )


def create_crews(crews=100):
    for _ in range(crews):
        crew_size = random.randint(3, 8)
        make_crew(crew_size)


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
    with open("flights/airplane_model.json") as f:
        data = json.load(f)
        for a in data:
            name = a['name']
            manufacturer = a['manufacturer']
            symbol = a['symbol']
            AirplaneModel.objects.get_or_create(
                name=name,
                manufacturer=manufacturer,
                symbol=symbol
            )


def create_airplanes(airplanes=200):
    all_models = AirplaneModel.objects.all()
    for _ in range(airplanes):
        model = random.choice(all_models)
        registration = fakegen.pystr_format(
            string_format='??-???', letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
        prod_date = fakegen.date_time_this_century(
            before_now=True, after_now=False, tzinfo=None)
        Airplane.objects.get_or_create(
            produced=prod_date,
            registration=registration,
            airplane_model=model
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
        airplane=airplane,
        num_places=random.randint(100, 200)
    )


def create_flights(flights=100):
    for _ in range(flights):
        generate_flight()


def populate_database():
    create_all_countries()
    create_airports(50)
    create_airlines(50)
    create_crews(25)
    fill_crews()
    create_airplane_models()
    create_airplanes(50)
    create_flights(50)
