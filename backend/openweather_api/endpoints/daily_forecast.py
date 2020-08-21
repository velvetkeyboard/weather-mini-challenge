from openweather_api.endpoints.base import OpenWeatherMap
from openweather_api.endpoints.lib import GET


class ForecastDailyEndpoint(OpenWeatherMap):
    '''
    Description:
        Daily Forecast 16 days:
            - 16 day forecast is available at any location or city
            - 16 day forecast includes daily weather
            - JSON and XML formats
            - Available for all paid accounts

    Query Params:
        ?q={city name}&cnt={cnt}
        ?q={city name},{state code}
        ?q={city name},{state code},{country code}&cnt={cnt}
    '''
    methods = [
        GET,
    ]
    path = '/forecast/daily'
