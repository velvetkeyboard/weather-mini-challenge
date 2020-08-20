class EndpointDoesNotSupportedMethod(Exception):
    def __init__(self, endpoint, method):
        '''
        Params:
            endpoint (Endpoint):
                Endpoint class instance
            method (str):
                Not supported method
        '''
        msg = 'Endpoint {} does not support: {}. Only: {}'.format(
            endpoint.get_url(),
            method,
            endpoint.methods,
            )