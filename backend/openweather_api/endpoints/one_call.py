from openweather_api.endpoints.base import OpenWeatherMap
from openweather_api.endpoints.lib import GET


class OneCallEndpoint(OpenWeatherMap):
    '''
    Description:
        One Call API
            - Make one API call and get current, forecast and historical
              weather data
            - Minute forecast for 1 hour
            - Hourly forecast for 48 hours
            - Daily forecast for 7 days
            - Historical data for 5 previous days
            - JSON format
            - Available for both Free and paid subscriptions

    Query Params:
        ?lat={lat}&lon={lon}&exclude={part}&appid={YOUR API KEY}
    '''
    methods = [
        GET,
    ]
    path = '/onecall'
    query_params = {
        'exclude': 'hourly,minutely'
    }
