from rest_framework import serializers
from location.models import Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = (
            'id',
            'name',
            'user',
            )
        extra_kwargs = {
                'user': {
                    'read_only': True,
                },
                'id': {
                    'read_only': True,
                }
            }

    def create(self, validated_data):
        model = Location.objects.create(
            user=self.context['request'].premium_user,
            **validated_data
            )
        return model