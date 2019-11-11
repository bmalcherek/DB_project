from django.urls import path

from . import views

urlpatterns = [
    path('countries/', views.CountriesList.as_view()),
    path('countries/<int:country_id>/', views.country_detail),
    path('airports/', views.AirportsList.as_view()),
    path('airplane-models/', views.AirplaneModelsList.as_view()),
    path('airplanes/', views.AirplanesList.as_view()),
    path('airlines/', views.AirlinesList.as_view()),
    path('crews/', views.CrewsList.as_view()),
    path('crew-members/', views.CrewMembersList.as_view()),
    path('flights/', views.FlightsList.as_view()),
    path('reservations/', views.ReservationsList.as_view()),
    path('luggages/', views.LuggagesList.as_view())
]
