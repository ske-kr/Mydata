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
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
# Create your views here.

User = get_user_model()

@csrf_exempt
def signup(request):
    if request.method=='POST':
        try:
            firstname,lastname,username,password=request.body.decode().split("&")
            tmp,firstname=firstname.split("=")
            tmp,lastname=lastname.split("=")
            tmp,username=username.split("=")
            tmp,password=password.split("=")

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

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        try:
            username,password=request.body.decode().split("&")
            tmp,username=username.split("=")
            tmp,password=password.split("=")
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        '''
        userA=auth.authenticate(username=user_name,password=user_pass)
        '''
        userA=get_object_or_404(User.objects.filter(username=username))
        login(request,userA)
        try:
            User.objects.get(username=username)
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


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=403)



def excel(request):
    if request.method=='POST':
        myexcel=request.FILES
    else:
        return HttpResponse(status=403)