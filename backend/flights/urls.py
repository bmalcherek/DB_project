from django.urls import path

from . import views

urlpatterns = [
    path('countries/', views.CountriesList.as_view()),
    path('countries/<int:country_id>/', views.country_detail),
    path('airports/', views.AirportsList.as_view()),
    path('airports/<int:airport_id>/', views.airport_detail),
    path('airplane-models/', views.AirplaneModelsList.as_view()),
    path('airplane-models/<int:airplane_model_id>/', views.airplane_model_detail),
    path('airplanes/', views.AirplanesList.as_view()),
    path('airplanes/<int:airplane_id>/', views.airplane_detail),
    path('airlines/', views.AirlinesList.as_view()),
    path('airlines/<int:airline_id>/', views.airline_detail),
    path('crews/', views.CrewsList.as_view()),
    path('crews/<int:crew_id>/', views.crew_detail),
    path('crew-members/', views.CrewMembersList.as_view()),
    path('crew-members/<int:member_id>/', views.member_detail),
    path('flights/', views.FlightsList.as_view()),
    path('reservations/', views.reservations_list),
    path('reservations/<int:reservation_id>/', views.reservation_detail),
    path('luggage/', views.LuggagesList.as_view()),
    path('luggage/<int:luggage_id>/', views.luggage_detail),
    path('username/', views.get_username),
    path('luggage/<int:luggage_id>/', views.luggage_detail),
    path('users/register/', views.create_user)
]
