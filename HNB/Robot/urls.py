from django.conf.urls import url
from django.conf.urls import include,url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns 
from Robot import views


#it is the namespace
app_name='Robot'
urlpatterns = [
	  url(r'^robot', views.robot, name='robot'),
	]
#urlpatterns +=staticfiles_urlpatterns()
