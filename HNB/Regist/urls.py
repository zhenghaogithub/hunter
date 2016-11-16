from django.conf.urls import url
from . import views
from django.conf.urls import include,url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns 
#it is the namespace
app_name='Register'
urlpatterns = [
	# ex: /regist/
	url(r'^$',views.mainpage, name='main'),
	url(r'^signup/$',views.sign_up, name='signup'),
	url(r'^activation/',views.activate, name='activation'),
	url(r'^signin/$',views.sign_in, name='signin'),
	url(r'^logout/$',views.log_out, name='logout'),
	]
urlpatterns +=staticfiles_urlpatterns()
