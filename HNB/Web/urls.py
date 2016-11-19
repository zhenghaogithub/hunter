from django.contrib import admin
from django.conf.urls import  include, url
from django.conf import settings
from django.conf.urls.static import static  
from Web import views 
app_name='Design'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^user/$', views.user, name='user'),
    url(r'^dancing/subset/$', views.subset, name='subset'),
]
 
