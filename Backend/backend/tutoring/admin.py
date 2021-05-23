from django.contrib import admin
from .models import User,Tutee,Tutor
# Register your models here.

admin.site.register(User)
admin.site.register(Tutor)
admin.site.register(Tutee)