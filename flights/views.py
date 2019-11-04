from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import JsonResponse

from .serializers import CountrySerializer, AirportSerializer, AirplaneSerializer
from .models import Country, Airport, Airplane


@api_view(['GET', 'POST'])
def countries_list_view(request):
    if request.method == 'GET':
        queryset = Country.objects.all()
        serializer = CountrySerializer(queryset, many=True)

        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = CountrySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def airports_list_view(request):
    if request.method == 'GET':
        queryset = Airport.objects.all()
        serializer = AirportSerializer(queryset, many=True)

        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = AirportSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def airplanes_list_view(request):
    if request.method == 'GET':
        queryset = Airplane.objects.all()
        serializer = AirplaneSerializer(queryset, many=True)

        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        serializer = AirplaneSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
