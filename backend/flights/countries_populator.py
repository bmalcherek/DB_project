import json
from models import Country

with open('countries.json', 'r') as f:
    data = json.load(f)
    for country in data:
        _, created = Country.objects.get_or_create(
            name=data[country]['name'],
            continent=data[country]['continent'],
            language=data[country]['language'],
            currency=data[country]['currency']
        )
        print(created)
