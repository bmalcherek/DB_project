from django.urls import path

from . import views

urlpatterns = [
    path('countries/', views.countries_list_view),
    path('airports/', views.airports_list_view),
    path('airplanes/', views.airplanes_list_view)
]
