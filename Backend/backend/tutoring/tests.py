from django.test import TestCase, Client
from .models import Tutee,Tutor,Review
import json
from django.contrib.auth.hashers import check_password
from django.core.files.uploadedfile import SimpleUploadedFile

# Create your tests here.


class ViewTest(TestCase):
    def setUp(self):
        test_tutor = Tutor.objects.create_user(username='test_id',password='test',name='ske',age='26',gender='Male',subject='Math',phonenumber='01012341234')
        test_tutee = Tutee.objects.create_user(username='test_tutee',password='test')
        test_review = Review()
        test_review.tutor=test_tutor
        test_review.tutee=test_tutee
        '''
        newPhoto.image = SimpleUploadedFile(name='test_image.jpg', content=open(image_path, 'rb').read(), content_type='image/jpeg')
        '''

    def tearDown(self):
        pass

    def test_signTutor(self):
        client=Client()
        response=client.get('/api/signup/tutor/')
        self.assertEqual(response.status_code,405)
        response=client.post('/api/signup/tutor/',{'userme':'newtest','password':'test'})
        self.assertEqual(response.status_code,400)
        response=client.post('/api/signup/tutor/',json.dumps({'username':'newtest','password':'test','phonenumber':'01012340000','subject':'Science,Math','gender':'Male'}),content_type='application/json')
        self.assertEqual(response.status_code,201)
        response=client.get('/api/signup/uniqueid/newtest')
        self.assertEqual(response.status_code,200)

        response=client.get('/api/signout/')
        self.assertEqual(response.status_code,204)
        response=client.post('/api/signin/')
        self.assertEqual(response.status_code,400)
        
        response=client.post('/api/signin/',json.dumps({'username':'test_id','password':'111test'}),content_type='application/json')
        self.assertEqual(response.status_code,204)
        response=client.post('/api/signin/',json.dumps({'username':'test_id','password':'test'}),content_type='application/json')
        self.assertEqual(response.status_code,204)

        response=client.get('/api/tutor/review/1/')
        self.assertEqual(response.status_code,200)
        response=client.post('/api/tutor/review/1/')
        self.assertEqual(response.status_code,405)
        response=client.get('/api/tutor/tutoring/1/')
        self.assertEqual(response.status_code,200)
        response=client.post('/api/tutor/tutoring/1/')
        self.assertEqual(response.status_code,405)
        response=client.get('/api/tutor/1/')
        self.assertEqual(response.status_code,200)
        response=client.delete('/api/tutor/1/')
        self.assertEqual(response.status_code,405)
        response=client.post('/api/tutor/1',json.dumps({'password':'test','phonenumber':'01012340000','subject':'Science,Math','gender':'Male'}),content_type='application/json')
        self.assertEqual(response.status_code,301)
        response=client.post('/api/tutor/1',json.dumps({'username':'newtest','password':'test','phonenumber':'01012340000','subject':'Science,Math','gender':'Male'}),content_type='application/json')
        self.assertEqual(response.status_code,301)


        response=client.post('/api/signout/')
        self.assertEqual(response.status_code,405)
        response=client.get('/api/signout/')
        self.assertEqual(response.status_code,204)

    def test_signTutee(self):
        client=Client()
        response=client.get('/api/tutee/1/')
        self.assertEqual(response.status_code,401)
        response=client.get('/api/tutee/tutoring/1/')
        self.assertEqual(response.status_code,401)
        response=client.get('/api/tutee/request/1/')
        self.assertEqual(response.status_code,401)

        response=client.get('/api/isloggedin/')
        self.assertEqual(response.status_code,201)
        response=client.get('/api/signout/')
        self.assertEqual(response.status_code,401)
        response=client.get('/api/signup/tutee/')
        self.assertEqual(response.status_code,405)
        response=client.post('/api/signup/tutee/',{'userme':'newtest','password':'test'})
        self.assertEqual(response.status_code,400)
        response=client.post('/api/signup/tutee/',json.dumps({'username':'newtest','password':'test','phonenumber':'01012340000'}),content_type='application/json')
        self.assertEqual(response.status_code,201)
        response=client.delete('/api/signin/',json.dumps({'username':'none','password':'test'}),content_type='application/json')
        self.assertEqual(response.status_code,405)
        response=client.post('/api/signin/',json.dumps({'username':'newtest','password':'test'}),content_type='application/json')
        self.assertEqual(response.status_code,205)
        response=client.get('/api/isloggedin/')
        self.assertEqual(response.status_code,200)

        response=client.get('/api/tutee/1/')
        self.assertEqual(response.status_code,200)
        response=client.put('/api/tutee/1/')
        self.assertEqual(response.status_code,400)
        response=client.put('/api/tutee/1/',json.dumps({'name':'newtest','gender':'Male'}),content_type='application/json')
        self.assertEqual(response.status_code,201)
        response=client.delete('/api/tutee/1/')
        self.assertEqual(response.status_code,204)
        response=client.post('/api/tutee/1/')
        self.assertEqual(response.status_code,405)
        response=client.get('/api/tutee/review/1/')
        self.assertEqual(response.status_code,200)
        response=client.post('/api/tutee/review/1/')
        self.assertEqual(response.status_code,405)
    
        response=client.get('/api/tutee/tutoring/1/')
        self.assertEqual(response.status_code,201)
        response=client.post('/api/tutee/tutoring/1/')
        self.assertEqual(response.status_code,400)
        response=client.post('/api/tutee/tutoring/1/',json.dumps({'maxAge':'27','minAge':'24','subject':'Math','gender':'Male'}),content_type='application/json')
        self.assertEqual(response.status_code,201)
        response=client.delete('/api/tutee/tutoring/1/')
        self.assertEqual(response.status_code,405)

        response=client.post('/api/tutee/request/1/')
        self.assertEqual(response.status_code,400)
        response=client.post('/api/tutee/request/1/',json.dumps({'TutorID':'1','subject':'Math'}),content_type='application/json')
        self.assertEqual(response.status_code,201)
        response=client.delete('/api/tutee/request/1/')
        self.assertEqual(response.status_code,405)

        

class ModelTest(TestCase):
    def test_model(self):
        test_tutor = Tutor.objects.create_user(username='test_id',password='test',name='ske',age='26',gender='Male',subject='Math',phonenumber='01012341234')
        self.assertEquals(check_password('test',test_tutor.password),True)
        self.assertEqual(test_tutor.username, 'test_id')
        self.assertEqual(test_tutor.name, 'ske')
        self.assertEqual(test_tutor.age, '26')



class tokenTest(TestCase):
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/signup/tutor/', json.dumps({'username': 'chris1', 'password': 'chris'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403) 

        response = client.delete('/api/token/')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/token/')
        self.assertEqual(response.status_code, 204)
        csrftoken = response.cookies['csrftoken'].value  

        response = client.post('/api/signup/tutor/', json.dumps({'username': 'chris', 'password': 'chris','phonenumber':'01012341234','subject':'Math','gender':'Male'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201) 

