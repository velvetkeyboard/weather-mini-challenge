from django.urls import path
from weather.views import CityWeather
from weather.views import CityWeatherPremium


urlpatterns = [
    path('demo/city/<str:name>/', CityWeather.as_view(), name='city-weather-demo'),
    path('city/<str:name>/', CityWeatherPremium.as_view(), name='city-weather'),
]