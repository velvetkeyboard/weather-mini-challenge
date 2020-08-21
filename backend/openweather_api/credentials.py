from django.conf import settings


class Credential(object):
    headers = None
    query_params = None

    def get_query_params(self):
        '''
        Override this one if you need to inject credential data on the query
        params
        '''
        return self.query_params or {}

    def get_headers(self):
        '''
        Override this one if you need to inject credential data on the query
        headers
        '''
        return self.headers or {}


class QueryParamApiKeyCredential(Credential):
    query_params = {
        'appid': settings.OPENWEATHER_KEY
    }
