from django.urls import path
from authentication.views import SignUp
from authentication.views import SignIn


urlpatterns = [
    path('signup/', SignUp.as_view(), name='signup'),
    path('signin/', SignIn.as_view(), name='token'),
]