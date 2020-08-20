from django.test import TestCase
# from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient
# from rest_framework.test import force_authenticate
from weather.views import CityWeather
from unittest.mock import patch

class CityWeatherTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.maxDiff = None

    def get_forecasts_no_umbrella_mk(self, mk):
        return [
            {'dt': 1597849200, 'humidity': 70}, # 19/08
            {'dt': 1597892400, 'humidity': 69}, # 20/08
            {'dt': 1597978800, 'humidity': 68}, # 21/08
            {'dt': 1598065200, 'humidity': 67}, # 22/08
            {'dt': 1598151600, 'humidity': 66}, # 23/08
            {'dt': 1598238000, 'humidity': 65}, # 24/08
            {'dt': 1598324400, 'humidity': 64}, # 25/08
        ]

    def get_forecasts_umbrella_mk(self, mk):
        return [
            {'dt': 1597849200, 'humidity': 71}, # 19/08
            {'dt': 1597892400, 'humidity': 72}, # 20/08
            {'dt': 1597978800, 'humidity': 73}, # 21/08
            {'dt': 1598065200, 'humidity': 74}, # 22/08
            {'dt': 1598151600, 'humidity': 75}, # 23/08
            {'dt': 1598238000, 'humidity': 76}, # 24/08
            {'dt': 1598324400, 'humidity': 77}, # 25/08
        ]

    @patch.object(CityWeather, 'get_forecasts', get_forecasts_no_umbrella_mk)
    def test_no_umbrellas_all_week(self):
        resp = self.client.get(
            '/api/weather/city/Ribeirao Preto/',
            )
        resp.render()

        self.assertEqual(resp.status_code, 200)
        self.assertJSONEqual(
            str(resp.content, encoding='utf8'),
            [
                {
                    'dt': 1597849200,
                    'humidity': 70,
                    'umbrella': False,
                    'weekday': 'Wednesday'
                },
                {
                    'dt': 1597892400,
                    'humidity': 69,
                    'umbrella': False,
                    'weekday': 'Thursday'
                },
                {
                    'dt': 1597978800,
                    'humidity': 68,
                    'umbrella': False,
                    'weekday': 'Friday'},
                  
                {
                    'dt': 1598065200,
                    'humidity': 67,
                    'umbrella': False,
                    'weekday': 'Saturday'
                },
                {
                    'dt': 1598151600,
                    'humidity': 66,
                    'umbrella': False,
                    'weekday': 'Sunday'},
                  
            ]
        )

    @patch.object(CityWeather, 'get_forecasts', get_forecasts_umbrella_mk)
    def test_umbrellas_all_week(self):
        resp = self.client.get(
            '/api/weather/city/Ribeirao Preto/',
            )
        resp.render()

        self.assertEqual(resp.status_code, 200)
        self.assertJSONEqual(
            str(resp.content, encoding='utf8'),
            [
                {
                    'dt': 1597849200,
                    'humidity': 71,
                    'umbrella': True,
                    'weekday': 'Wednesday'
                },
                {
                    'dt': 1597892400,
                    'humidity': 72,
                    'umbrella': True,
                    'weekday': 'Thursday'
                },
                {
                    'dt': 1597978800,
                    'humidity': 73,
                    'umbrella': True,
                    'weekday': 'Friday'},
                  
                {
                    'dt': 1598065200,
                    'humidity': 74,
                    'umbrella': True,
                    'weekday': 'Saturday'
                },
                {
                    'dt': 1598151600,
                    'humidity': 75,
                    'umbrella': True,
                    'weekday': 'Sunday'},
                  
            ]
        )