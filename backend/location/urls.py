from django.urls import path
from location.views import LocationsAPIView
from location.views import LocationUpdateView

urlpatterns = [
    path('<int:pk>/', LocationUpdateView.as_view(), name='location-update'),
    path('', LocationsAPIView.as_view(), name='location-list-create'),
]