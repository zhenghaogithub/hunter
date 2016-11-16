from django.contrib import admin
from django.conf.urls import  include, url
from Web.views import *
from django.conf import settings
from django.conf.urls.static import static  
app_name='Design'
urlpatterns = [
    url(r'^index/$', index, name='index'),
]
 
