from django.urls import path

from . import views

urlpatterns = [
    path('countries/', views.countries_list_view)
]
