import os
import sys
sys.path.append("/home/krystian/Pulpit/Projekt IO/DB_project/")
from backend.flights.models import AirplaneModel

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.db_project.settings')


import random

from faker import Faker
from django.db import models

fakegen = Faker()

def create_airplane_model():
    fake_name = fakegen.military_ship()
    fake_company = fakegen.company()
    fake_symbol = fakegen.ean(length = 5)
    AirplaneModel.objects.get_or_create()



def main():
    create_airplane_model()
    print("Hello world")




if __name__ == '__main__':
    main()

