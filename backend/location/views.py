from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from location.serializers import LocationSerializer
from location.models import Location
from authentication.authenticators import PremiumUserTokenAuthentication


class LocationsAPIView(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    authentication_classes = [PremiumUserTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Location.objects.filter(user=self.request.premium_user)


class LocationUpdateView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LocationSerializer
    authentication_classes = [PremiumUserTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Location.objects.filter(user=self.request.premium_user)
