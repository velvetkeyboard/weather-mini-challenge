from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from authentication.serializers import UserSerializer
from authentication.serializers import SignInSerializer


class SignUp(generics.CreateAPIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class SignIn(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SignInSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        username, password = serializer.save()

        if not get_user_model().objects.filter(username=username).exists():
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = get_user_model().objects.get(username=username)

        if not user.check_password(password):
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

        token = Token.objects.get(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
