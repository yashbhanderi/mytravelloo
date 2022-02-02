from . import views
from django.urls import path

urlpatterns = [
    path('signup/', views.signupView, name="signup"),
    path('login/', views.loginView, name="login"),
    path('check-token/', views.check_token, name="check_token"),

    path('check-date/', views.date_checking, name="date-checking"),

    path('get-destination-group/', views.destinationGroup,
         name="get-destination-group"),
    path('get-destination-list/', views.destinationList,
         name="get-destination-list"),
    path('get-destination/<int:id>/', views.destination, name="get-destination"),
    path('payment/',
         views.payment_checking, name="payment-checking"),
    path('get-trips/', views.get_trips, name="get-trips"),
    path('get-mail/', views.get_mail, name="get-mail"),
]
