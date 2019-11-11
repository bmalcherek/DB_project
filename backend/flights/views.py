from rest_framework.decorators import api_view
from rest_framework import generics, status
from django.http import JsonResponse, HttpResponse

from .serializers import (
    CountrySerializer,
    AirportSerializer,
    AirplaneModelSerializer,
    AirplaneSerializer,
    AirlineSerializer,
    CrewSerializer,
    CrewMemberSerializer,
    FlightSerializer,
    ReservationSerializer,
    LuggageSerializer
)
from .models import (
    Country,
    Airport,
    AirplaneModel,
    Airplane,
    Airline,
    Crew,
    CrewMember,
    Flight,
    Reservation,
    Luggage
)


class CountriesList (generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer


@api_view(['GET', 'PUT', 'DELETE'])
def country_detail(request, country_id):
    try:
        country = Country.objects.get(id=country_id)
    except Country.DoesNotExist:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CountrySerializer(country)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        serializer = CountrySerializer(country, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_202_ACCEPTED)
        else:
            print(serializer.errors)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        country.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


class AirportsList (generics.ListCreateAPIView):
    queryset = Airport.objects.all()
    serializer_class = AirportSerializer


class AirplaneModelsList (generics.ListCreateAPIView):
    queryset = AirplaneModel.objects.all()
    serializer_class = AirplaneModelSerializer


class AirplanesList (generics.ListCreateAPIView):
    queryset = Airplane.objects.all()
    serializer_class = AirplaneSerializer


class AirlinesList (generics.ListCreateAPIView):
    queryset = Airline.objects.all()
    serializer_class = AirlineSerializer


class CrewsList (generics.ListCreateAPIView):
    queryset = Crew.objects.all()
    serializer_class = CrewSerializer


class CrewMembersList (generics.ListCreateAPIView):
    queryset = CrewMember.objects.all()
    serializer_class = CrewMemberSerializer


class FlightsList (generics.ListCreateAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer


class ReservationsList (generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer


class LuggagesList (generics.ListCreateAPIView):
    queryset = Luggage.objects.all()
    serializer_class = LuggageSerializer
