from rest_framework.authtoken.models import Token


def premium_user_authorization_token(get_response):
    def middleware(request):
        user_auth_token = request.META.get('HTTP_USER_AUTHORIZATION')
        if user_auth_token:
            user_auth_token = user_auth_token[6:]
            request.premium_user = Token.objects.get(key=user_auth_token).user
        else:
            request.premium_user = None
        return get_response(request)
    return middleware
