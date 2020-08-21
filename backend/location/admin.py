from django.contrib import admin
from location.models import Location


class LocationAdmin(admin.ModelAdmin):
    pass


admin.site.register(Location, LocationAdmin)
