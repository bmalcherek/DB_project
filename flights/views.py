from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import JsonResponse

from .serializers import CountrySerializer
from .models import Country


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
