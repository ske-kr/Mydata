from django.test import TestCase,Client
from .models import User
import json
from django.contrib.auth.hashers import check_password

# Create your tests here.
class ViewTest(TestCase):
    def setUp(self):
        test_user=User.objects.create_user(username='test_id',password='test')

    def tearDown(self):
        pass

    def test_signUp(self):
        client=Client()
        response=client.get('/user/signup/')
        self.assertEqual(response.status_code,405)

        response=client.post('/user/signup/',{'userme':'newtest','password':'test'})
        self.assertEqual(response.status_code,400)

        response=client.post('/user/signup/',json.dumps({'username':'newtest','password':'test'}),content_type='application/json')
        self.assertEqual(response.status_code,201)