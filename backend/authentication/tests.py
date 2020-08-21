from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token


class BaseTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()


class SignUpTestCase(BaseTestCase):

    def test_no_token_no_payload(self):
        resp = self.client.post('/api/auth/signup/')
        resp.render()
        self.assertEqual(resp.status_code, 401)

    def test_no_token_with_payload(self):
        data = {}
        resp = self.client.post('/api/auth/signup/', data=data)
        resp.render()
        self.assertEqual(resp.status_code, 401)

    def test_with_token_no_payload(self):
        user = get_user_model().objects.create_user(
            username='admin',
            password='admin',
            )
        token = Token.objects.get(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = self.client.post('/api/auth/signup/')
        resp.render()
        self.assertEqual(resp.status_code, 400)

    def test_with_token_incorrect_payload(self):
        user = get_user_model().objects.create_user(
            username='admin',
            password='admin',
            )
        token = Token.objects.get(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        resp = self.client.post('/api/auth/signup/', {'foo': 'bar'})
        resp.render()
        self.assertEqual(resp.status_code, 400)

    def test_with_token_correct_payload(self):
        user = get_user_model().objects.create_user(
            username='admin',
            password='admin',
            )
        token = Token.objects.get(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)
        data = {
            'username': 'john',
            'password': 'doe',
            }
        resp = self.client.post('/api/auth/signup/', data)
        resp.render()
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(Token.objects.all().count(), 2)


class SignInTestCase(BaseTestCase):

    def setUp(self):
        super().setUp()
        user = get_user_model().objects.create_user(
            username='admin',
            password='admin',
            )
        self.token = Token.objects.get(user=user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        self.username = 'john'
        self.password = 'doe'
        data = {
            'username': self.username,
            'password': self.password,
            }
        self.client.post('/api/auth/signup/', data)

    def test_incorrect_username(self):
        data = {
            'username': 'foo',
            'password': self.password
            }
        resp = self.client.post('/api/auth/signin/', data)
        resp.render()
        self.assertEqual(resp.status_code, 400)

    def test_incorrect_password(self):
        data = {
            'username': self.username,
            'password': 'foo'
            }
        resp = self.client.post('/api/auth/signin/', data)
        resp.render()
        self.assertEqual(resp.status_code, 400)

    def test_incorrect_credentials(self):
        data = {
            'username': 'foo',
            'password': 'bar'
            }
        resp = self.client.post('/api/auth/signin/', data)
        resp.render()
        self.assertEqual(resp.status_code, 400)

    def test_correct_credentials(self):
        data = {
            'username': self.username,
            'password': self.password
            }
        resp = self.client.post('/api/auth/signin/', data)
        resp.render()
        user = get_user_model().objects.get(username=self.username)
        token = Token.objects.get(user=user)
        self.assertEqual(resp.status_code, 200)
        self.assertJSONEqual(
            str(resp.content, encoding='utf8'),
            {"token": token.key}
            )
