from Mydata.user.views import excel
from django.urls import path
from user import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('dataupload/', views,excel, name='data'),
    path('signin/', views.signin, name='signin'),
    # path('signout/', views.signout, name='signout'),

    # path('token/', views.token, name='token')
]