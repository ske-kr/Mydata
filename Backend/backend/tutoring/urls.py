from django.urls import path
from tutoring import views

urlpatterns = [
    path('signup/tutee/', views.signup_tutee, name='signup'),
    path('signup/tutor/', views.signup_tutor, name='signup'),
    path('signup/tutor/certificate/', views.certificate, name='certificate'),
    path('signup/uniqueid/<str:id>', views.uniqueid, name='sidnup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('isloggedin/', views.isloggedin, name='isloggedin'),

    path('tutor/<int:tutor_id>/',views.tutor_page_profile,name='tutor_profile'),
    path('tutor/review/<int:tutor_id>/',views.tutor_page_review,name='tutor_review'),
    path('tutor/tutoring/<int:tutor_id>/',views.tutor_page_tutoring,name='tutor_tutoring'),
    
    path('tutee/<int:tutee_id>/',views.tutee_page_profile,name='tutee_profile'),
    path('tutee/review/<int:tutee_id>/',views.tutee_page_review,name='tutee_profile'),
    path('tutee/tutoring/<int:tutee_id>/',views.tutee_page_tutoring,name='tutee_profile'),

    path('tutee/request/<int:tutee_id>/',views.tutee_request_tutoring,name='tutee_request'),
    path('token/', views.token, name='token')
]