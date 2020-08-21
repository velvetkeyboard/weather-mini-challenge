from django.conf import settings
from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  
    class Meta:
        unique_together = ('name', 'user',)