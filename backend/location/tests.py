from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token


class BaseTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()


class LocationsNoCredentialsTestCase(BaseTestCase):
    def test_create_without_credentials(self):
        data = {
            'name': 'foo',
            }
        resp = self.client.post('/api/location/', data=data)
        resp.render()
        self.assertEqual(resp.status_code, 401)

    def test_create_without_credentials_incorrect_payload(self):
        data = {
            'nam': 'foo',
            }
        resp = self.client.post('/api/location/', data=data)
        resp.render()
        self.assertEqual(resp.status_code, 401)

    def test_list_without_credentials(self):
        resp = self.client.get('/api/location/')
        resp.render()
        self.assertEqual(resp.status_code, 401)

    def test_delete_without_credentials(self):
        resp = self.client.delete('/api/location/1/')
        resp.render()
        self.assertEqual(resp.status_code, 401)


class LocationsTestCase(BaseTestCase):
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

        premium_user = get_user_model().objects.get(username=self.username)
        self.premium_token = Token.objects.get(user=premium_user)
        self.client.credentials(
            HTTP_USER_AUTHORIZATION='Token ' + self.premium_token.key)

    def test_create_with_correct_payload(self):
        data = {
            'name': 'foo',
            }
        resp = self.client.post('/api/location/', data=data)
        resp.render()
        self.assertEqual(resp.status_code, 201)

    def test_create_with_incorrect_payload(self):
        data = {
            'nam': 'foo',
            }
        resp = self.client.post('/api/location/', data=data)
        resp.render()
        self.assertEqual(resp.status_code, 400)

    def test_listing(self):
        self.test_create_with_correct_payload()

        resp = self.client.get('/api/location/')
        resp.render()
        self.assertEqual(resp.status_code, 200)
        self.assertJSONEqual(
            str(resp.content, encoding='utf8'),
            [{"id": 1, "name": "foo", "user": 2}]
            )

    def test_delete(self):
        self.test_listing()

        resp = self.client.delete('/api/location/1/')
        resp.render()
        self.assertEqual(resp.status_code, 204)

        resp = self.client.get('/api/location/')
        resp.render()
        self.assertJSONEqual(
            str(resp.content, encoding='utf8'),
            []
            )
