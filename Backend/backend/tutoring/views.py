from django.shortcuts import render
from django.http import HttpResponse,JsonResponse,HttpResponseNotAllowed
from django.contrib.auth import authenticate,login,logout
from django.contrib import auth
import json
from .models import Tutor,Tutee,Tutoring,Review
from django.contrib.auth import get_user_model, authenticate, login
from json import JSONDecodeError
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
import requests
import copy
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import random

User = get_user_model()


def signin(request):
    if request.method == 'POST':
        try:
            login_info = json.loads(request.body.decode())
            user_name=login_info['username']
            user_pass=login_info['password']
        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        userA=get_object_or_404(User.objects.filter(username=user_name))
        login(request,userA)
        try:
            Tutor.objects.get(username=user_name)
            return JsonResponse({'type':'tutor'}, status=204,safe=False)
        except:
            return JsonResponse({'type':'tutee'}, status=205,safe=False)
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

def isloggedin(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=201)

def uniqueid(request, id):
    if request.method == 'GET':
        get_object_or_404(User.objects.filter(username=id))
        return HttpResponse(status=200)


def signup_tutee(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            phonenumber = None
            address = None
            subject = None
            gender = None
            schedule = None
            name = None
            age = None

        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        tutee = Tutee.objects.create_user(username=username, password=password, phonenumber=phonenumber,
            age=age, name=name, gender=gender,subject=subject)
        tutee.save()
        tutee.refresh_from_db()
        tutee2 = authenticate(request, username=username, password=password)
        if tutee2 is not None:
            login(request, tutee2)
        else:
            None
        # tutor to json, and send back
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)



def signup_tutor(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            username = req_data['username']
            password = req_data['password']
            phonenumber = None
            address = None
            subject = None
            gender = None
            schedule = None

        except (KeyError, JSONDecodeError) as e:
            return HttpResponse(status=400)
        tutor = Tutor.objects.create_user(username=username, password=password, phonenumber=phonenumber,
             gender=gender,subject=subject)
        tutor.save()
        tutor.refresh_from_db()
        tutor2 = authenticate(request, username=username, password=password)
        if tutor2 is not None:
            login(request, tutor2)
        else:
            None
        # tutor to json, and send back
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)



def tutor_page_review(request,tutor_id):
    if request.method == 'GET':
        review_list = [Review for Review in Review.objects.filter(tutor_id=tutor_id).values()]  
        return JsonResponse(review_list,safe=False,status=200)
    else:    
        return HttpResponse(status=405)


def tutor_page_profile(request,tutor_id):
    if request.method == 'GET':
        tutor = Tutor.objects.filter(id=tutor_id)

        return HttpResponse(status=200)

    else:    
        return HttpResponse(status=405) 

def tutor_page_tutoring(request,tutor_id):
    if request.method == 'GET':
        tutoring_list = [Tutoring for Tutoring in Tutoring.objects.filter(tutor_id=tutor_id).values()]  
        return HttpResponse(status=200)
    else:    
        return HttpResponse(status=405)    

def tutee_page_profile(request,tutee_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    else:
        tutee1 = Tutee.objects.filter(id=tutee_id)
        if request.method == 'GET':
            return HttpResponse(status=200)
        elif request.method == 'PUT':
            try:
                req_data = json.loads(request.body.decode())
                name1 = req_data['name']
                gender1 = req_data['gender']
            except (KeyError, JSONDecodeError) as e:
                return HttpResponse(status=400)
            Tutee.objects.filter(id=tutee_id).update(name=name1)
            Tutee.objects.filter(id=tutee_id).update(gender=gender1)
            return HttpResponse(status=201)
        elif request.method == 'DELETE':
            tutee1.delete()
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=405)       

def tutee_page_review(request,tutee_id):
    if request.method == 'GET':
        review_list = [Review for Review in Review.objects.filter(tutee_id=tutee_id).values()]  
        return HttpResponse(status=200)
    else:    
        return HttpResponse(status=405)


def tutee_page_tutoring(request,tutee_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    else:
        if request.method == 'GET':
            tutoring_list = [Tutoring for Tutoring in Tutoring.objects.filter(tutee_id=tutee_id).values()]
            return HttpResponse(status=201)
        elif request.method == 'POST':
            try:
                req_data = json.loads(request.body.decode())
                option_gender = req_data['gender']
                option_subject = req_data['subject']
                option_age_min = req_data['minAge']
                option_age_max = req_data['maxAge']
            except (KeyError, JSONDecodeError) as e:
                return HttpResponse(status=400)
            tutor_list=Tutor.objects.filter(subject=option_subject).filter(gender=option_gender).filter(age__gte=option_age_min).filter(age__lte=option_age_max)
            sorted_tutor_list=tutor_list.order_by('distance')    
            return HttpResponse(status=201)
        else:
            return HttpResponse(status=405)

def tutee_request_tutoring(request,tutee_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    else:
        if request.method == 'POST':
            try:
                req_data = json.loads(request.body.decode())
                tutorid = req_data['TutorID']
                option_subject = req_data['subject']
            except (KeyError, JSONDecodeError) as e:
                return HttpResponse(status=400)
            tutee1=Tutee.objects.filter(id=tutee_id)
            tutoring_new = Tutoring()

            return HttpResponse(status=201)
        else:
            return HttpResponse(status=405)


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=403)

@csrf_exempt
def certificate(request):
    if request.method == 'POST':

        copiedexcel = copy.deepcopy(request.FILES['file']) # requests.post has somewhat side effect
        data=pd.read_excel("seed.xlsx")

        data_list=data['name'].dropna()

        #최종 데이터를 담을 리스트 만들어두기
        final_data={}
        final_cnt={}

        for i in range(len(data_list)):
            final_data[i]=data[data_list[i]].dropna()#dropna()=> 빈값(nan) 제거
            final_cnt[i]=[i for k in range(len(final_data[i]))]#점분산시 i for k => random.uniform(0.~) 
            data_mean=np.mean(np.array(final_data[i]))
            data_error=np.std(np.array(final_data[i]))
            plt.bar(data_list[i],data_mean)
            plt.errorbar(i,data_mean,yerr=data_error,color='black',zorder=6)
            plt.scatter(final_cnt[i],final_data[i],color='white',edgecolor='black',marker='o',s=[5],alpha=0.2,zorder=5)

        plt.title('ratio')
        plt.xticks(fontsize= 8, in_layout=True,rotation=-70)#x축 label 설정
        plt.tight_layout()#이름이 잘리는 경우를 방지 - x,y축 data label이 짧다면 없애도 됨

        plt.savefig('ske_SNU10.png')

    else:
        return HttpResponseNotAllowed(['POST'])
        