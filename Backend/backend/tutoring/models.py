from django.db import models
from django.contrib.auth.models import AbstractUser
from multiselectfield import MultiSelectField

# Create your models here.

class User(AbstractUser):
    phonenumber=models.CharField(null=True, blank=True, max_length=15,default='01000000000')

class Tutor(User):
    '''
    schedule = models.CharField(null=True, blank=True,max_length=40) # { 0:{start: date, end: date} 1:{start: date, end: date} ... ]
    address = models.CharField(null=True, blank=True,max_length=40) # { 0:{startRoad: "", startX: float, startY: float, endRoad: "", endX: float, endY: float}, 1:{...} ...]
    '''
    # certificate = models.ImageField
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )
    gender=models.CharField(max_length=20, choices=GENDER_CHOICES, null=True, blank=True)
    subject=models.CharField(max_length=40, null=True, blank=True) # multiselect or char ?
    name=models.CharField(max_length=10,null=True,blank=True)
    '''
    photo=models.ImageField(upload_to='tutor/',null=True)
    '''
    distance=models.FloatField(default=0,null=True,blank=True)
    age=models.IntegerField(null=True,blank=True)

class Tutee(User):
    '''
    address=models.CharField(null=True,blank=True,max_length=40) # [Road: "", X: float, Y: float, detail: ""]
    schedule = models.CharField(null=True,blank=True,max_length=40)  # [ 0: {start: date,end: date} 1: {start: date, end: date} ... ]
    '''
    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )
    name=models.CharField(max_length=10,null=True,blank=True)
    gender=models.CharField(max_length=20, choices=GENDER_CHOICES,null=True,blank=True)
    subject=models.CharField(max_length=80, null=True, blank=True)
    age=models.IntegerField(null=True,blank=True)
    
class Tutoring(models.Model):
    subject=models.CharField(max_length=40)
    tutee=models.ForeignKey(
        Tutee,
        on_delete=models.CASCADE,
    )
    tutor=models.ForeignKey(
        Tutor,
        on_delete=models.CASCADE,
    )
    state=models.CharField(max_length=10,default="requested")
    address=models.CharField(max_length=40)
    fee=models.IntegerField()

class Review(models.Model):
    tutee=models.ForeignKey(
        Tutee,
        on_delete=models.CASCADE,
    )
    tutor=models.ForeignKey(
        Tutor,
        on_delete=models.CASCADE,
    )
    content=models.TextField(default="Not reviewed yet")
    '''
    date=models.DateField(auto_now=True)
    create_date=models.DateField(auto_now_add=True)
    '''