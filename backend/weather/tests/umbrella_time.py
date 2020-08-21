from django.test import TestCase
from rest_framework.test import APIClient
from weather.views import CityWeather
from unittest.mock import patch


class UmbrellaTimeTestCase(TestCase):
    def setUp(self):
        self.maxDiff = None
        self.client = APIClient()

    def get_forecasts_mk(self, mk):
        '''
        - 1597849200 - 19/08 03:00
        - 1597892400 - 20/08 03:00
        '''
        return [
            {
                'humidity': 69,
                'dt': 1597806000,
                'sunrise': 1597806000,
                'sunset': 1597806000
            },
            {
                'humidity': 70,
                'dt': 1597892400,
                'sunrise': 1597892400,
                'sunset': 1597892400,
            },
            {
                'humidity': 71,
                'dt': 1597806000,
                'sunrise': 1597806000,
                'sunset': 1597806000
            },
            {
                'humidity': 72,
                'dt': 1597892400,
                'sunrise': 1597892400,
                'sunset': 1597892400,
            },
        ]

    @patch.object(CityWeather, 'get_forecasts', get_forecasts_mk)
    def test_two_umbrellas_in_four_days(self):
        resp = self.client.get(
            '/api/weather/demo/city/Ribeirao Preto/',
            )
        resp.render()

        self.assertEqual(resp.status_code, 200)
        self.assertJSONEqual(
            str(resp.content, encoding='utf8'),
            [
                {
                    'dt': 1597806000,
                    'sunrise': 1597806000,
                    'sunset': 1597806000,
                    'sunrise_hour': '03:00',
                    'sunset_hour': '03:00',
                    'date': "08/19",
                    'humidity': 69,
                    'umbrella': False,
                    'weekday': 'Wednesday'
                },
                {
                    'dt': 1597892400,
                    'sunrise': 1597892400,
                    'sunset': 1597892400,
                    'sunrise_hour': '03:00',
                    'sunset_hour': '03:00',
                    'date': "08/20",
                    'humidity': 70,
                    'umbrella': False,
                    'weekday': 'Thursday'
                },
                {
                    'dt': 1597806000,
                    'sunrise': 1597806000,
                    'sunset': 1597806000,
                    'sunrise_hour': '03:00',
                    'sunset_hour': '03:00',
                    'date': "08/19",
                    'humidity': 71,
                    'umbrella': True,
                    'weekday': 'Wednesday'
                },
                {
                    'dt': 1597892400,
                    'sunrise': 1597892400,
                    'sunset': 1597892400,
                    'sunrise_hour': '03:00',
                    'sunset_hour': '03:00',
                    'date': "08/20",
                    'humidity': 72,
                    'umbrella': True,
                    'weekday': 'Thursday'
                },
            ]
        )
