from django.conf.urls import url
from . import views
from django.conf.urls import include,url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns 



#it is the namespace
app_name='Robot'
urlpatterns = [
	url(r'^index/$',  views.index, name='index'),
	url(r'^robot', views.robot, name='robot'),
	]
urlpatterns +=staticfiles_urlpatterns()
