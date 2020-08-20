from datetime import datetime
from django.conf import settings
from django.http import Http404
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from openweather_api.credentials import QueryParamApiKeyCredential
from openweather_api.endpoints import WeatherEndpoint
from openweather_api.endpoints import OneCallEndpoint


class CityWeather(APIView):

    @method_decorator(cache_page(60*60))
    def get(self, request, name):
        limit = self.get_forecasts_limit()
        forecasts = self.get_forecasts(name)[:limit]
        for forecast in forecasts:
            datetime_obj = datetime.fromtimestamp(forecast['dt'])
            forecast['date'] = datetime_obj.strftime('%m/%d')
            forecast['sunset_hour'] = datetime_obj.strftime('%H:%M')
            forecast['sunrise_hour'] = datetime_obj.strftime('%H:%M')
            forecast['weekday'] = datetime_obj.strftime('%A')
            forecast['umbrella'] = False

            if forecast['humidity'] > settings.UMBRELLA_WEATHER_THRESHOLD:
                forecast['umbrella'] = True 

        return Response(forecasts)

    def get_forecasts_limit(self):
        return settings.FORESTCASTS

    def get_forecasts(self, city_name):
        query_params = {
            'q': city_name,
            }
        c = QueryParamApiKeyCredential()
        resp = WeatherEndpoint(c).get(query_params=query_params)

        if resp.status_code != 200:
            return []

        coord = resp.json()['coord']

        query_params = {
            'lat': coord['lat'],
            'lon': coord['lon'],
            }
        resp = OneCallEndpoint(c).get(query_params=query_params)
        forecasts = resp.json()['daily']
        return forecasts


class CityWeatherPremium(CityWeather):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_forecasts_limit(self):
        return settings.FORESTCASTS_PREMIUM