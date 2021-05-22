from django.shortcuts import render
from django.http import HttpResponse,JsonResponse,HttpResponseNotAllowed
from django.contrib.auth import authenticate,login,logout
from django.contrib import auth
import json
from .models import User
from django.contrib.auth import get_user_model, authenticate, login
from json import JSONDecodeError
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
import requests
# Create your views here.

User = get_user_model()

def signup(request):
    if request.method=='POST':
        try:
            req_data=json.loads(request.body.decode())
            username=req_data['username']
            password=req_data['password']
            firstname=req_data['firstname']
            lastname=req_data['lastname']
        except(KeyError,JSONDecodeError) as e:
            return HttpResponse(status=400)
        
        tmp_user=User.objects.create_user(username=username,password=password,firstname=firstname,lastname=lastname)
        tmp_user.save()
        tmp_user.refresh_from_db()
        Get_user=authenticate(request,username=username,password=password)
        if Get_user is not None:
            login(request,Get_user)
        else:
            None
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)


def signin(request):
    if request.method == 'POST':
        try:
            login_info = json.loads(request.body.decode())
            user_name=login_info['username']
            user_pass=login_info['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        '''
        userA=auth.authenticate(username=user_name,password=user_pass)
        '''
        userA=get_object_or_404(User.objects.filter(username=user_name))
        login(request,userA)
        try:
            User.objects.get(username=user_name)
            return HttpResponse(status=204)
        except:
            return HttpResponse(status=205)
            ##get wrong username?
    else :
        return HttpResponse(status=405)    

def signout(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse(status=401)
        else:
            logout(request)
            return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)

def uniqueid(request, id):
    if request.method == 'GET':
        get_object_or_404(User.objects.filter(username=id))
        return HttpResponse(status=200)