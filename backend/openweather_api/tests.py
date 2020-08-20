from django.test import TestCase
from openweather_api.endpoints import WeatherEndpoint
from openweather_api.endpoints import ForecastDailyEndpoint
from openweather_api.endpoints import OneCallEndpoint
from openweather_api.credentials import QueryParamApiKeyCredential
from openweather_api.exceptions import EndpointDoesNotSupportedMethod


class MethodIsNotAllowedTestCase(TestCase):
    def setUp(self):
        self.creds = QueryParamApiKeyCredential()

    def test_weather_endpoint(self):
        self.assertRaises(
            EndpointDoesNotSupportedMethod,
            WeatherEndpoint(self.creds).request,
            method="post",
            )

    def test_forecast_endpoint(self):
        self.assertRaises(
            EndpointDoesNotSupportedMethod,
            ForecastDailyEndpoint(self.creds).request,
            method="post",
            )

    def test_onecall_endpoint(self):
        self.assertRaises(
            EndpointDoesNotSupportedMethod,
            OneCallEndpoint(self.creds).request,
            method="post",
            )