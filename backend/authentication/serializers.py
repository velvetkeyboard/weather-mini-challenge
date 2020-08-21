from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = get_user_model()(**validated_data)
        user.set_password(password)
        user.save()
        return user


class SignInSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=255)
    password = serializers.CharField(required=True, max_length=255)

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        return (username, password)
