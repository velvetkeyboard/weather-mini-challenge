import requests
from openweather_api.exceptions import EndpointDoesNotSupportedMethod


GET = 'get'


class Endpoint(object):
    domain = None
    path = None
    headers = None
    query_params = None

    def __init__(self, credential):
        self.credential = credential

    def get_url(self):
        return ''.join([self.domain, self.path])

    def get_headers(self):
        return self.headers or {}

    def get_query_params(self):
        return self.query_params or {}

    def request(self, method, headers=None, query_params=None, data=None):
        if method not in self.methods:
            raise EndpointDoesNotSupportedMethod(self, method)

        headers = headers or {}
        headers.update(self.get_headers())
        headers.update(self.credential.get_headers())

        query_params = query_params or {}
        query_params.update(self.get_query_params())
        query_params.update(self.credential.get_query_params())

        url = self.get_url()

        fn = getattr(requests, method)
        if data:
            resp = fn(url=url, headers=headers, params=query_params, data=data)
        else:
            resp = fn(url=url, headers=headers, params=query_params)
        return resp

    def get(self, headers=None, query_params=None, data=None):
        return self.request(GET, headers, query_params, data)
