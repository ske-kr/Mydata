from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    name=models.CharField(null=True, blank=True, max_length=15,default='이름을 설정하지 않았습니다')
    # already have fields
    # password, email, first_name, last_name, groups, user_permissions, is_staff, is_active, is_superuser, last_login, date_joined
