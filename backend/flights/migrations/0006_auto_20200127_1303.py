# Generated by Django 2.2.8 on 2020-01-27 13:03

from django.db import migrations
import django_db_constraints.operations


class Migration(migrations.Migration):

    dependencies = [
        ('flights', '0005_auto_20200116_1146'),
    ]

    operations = [
        django_db_constraints.operations.AlterConstraints(
            name='reservation',
            db_constraints={'prive_above_zero': 'check (price > 0)'},
        ),
    ]
