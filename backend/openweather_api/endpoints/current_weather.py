from openweather_api.endpoints.base import OpenWeatherMap
from openweather_api.endpoints.lib import GET


class WeatherEndpoint(OpenWeatherMap):
    '''
    Description:
        Current Weather Data:
            - Access current weather data for any location including over
              200,000 cities
            - Current weather is frequently updated based on global models and
              data from more than 40,000 weather stations
            - JSON, XML, and HTML formats
            - Available for both Free and paid subscriptions

    Query Params:
        ?q={city name}
        ?q={city name},{state code}
        ?q={city name},{state code},{country code}
    '''
    methods = [
        GET,
    ]
    path = '/weather'
