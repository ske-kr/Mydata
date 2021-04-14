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