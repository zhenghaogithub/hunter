from django.shortcuts import render,redirect
from django.http import HttpResponseRedirect, HttpResponse,QueryDict
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from datetime import *
import urllib2
from xml.dom import minidom
from .forms import SignupForm, SigninForm
from django.db.models import Count
from django.shortcuts import get_object_or_404
import email
import email.mime
from email.mime.image import MIMEImage
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import smtplib
import time

def sign_up(request):
	if request.method == 'POST':
		form = SignupForm(request.POST)
		if form.is_valid():
			user_instance=form.save()
			username=request.POST['username']
			password=request.POST['password']
			user=authenticate(username=username,password=password)
			#The user is not active until they activate their account through email
			user.is_active=False
			user.save()
			id=user.id
			email=user.email
                        #add by zhenghao, here must consider if wrong??
			send_email(email,id)
			return render(request,'../templates/regist/thankyou.html')
		else:
			return render(request,'../templates/regist/sign_up.html',{'form':form})
	else:
		form = SignupForm()
		return render(request,'../templates/regist/sign_up.html',{'form':form})


def activate(request):
	id=int(request.GET.get('id'))
	user = User.objects.get(id=id)
	user.is_active=True
	user.save()
	return render(request,'../templates/regist/activation.html')


def sign_in(request):
        #direct = request.GET.get('next')
        #print 'direct is ' + direct
        #print "i am work here"
	if request.method=='POST':
		form=SigninForm(request.POST)
		if form.is_valid():
			username=request.POST['username']
			password=request.POST['password']
			user=authenticate(username=username,password=password)
			if user is not None:
				if user.is_active:											#Make sure the account is activated
					login(request,user)
		                        #return render(request,'../templates/demo/sign_in.html',{'form':form})
					#return redirect('MyRegister:main')
					return redirect('Design:index')
					#return redirect(direct)
                                        #return HttpResponseRedirect(direct)  
                                        
	                                #return render(request,direct)
		
				else:
					return render(request,'ErrorPage.html')
			else:
				return render(request,'../templates/regist/ErrorPage.html',{'errormessage':'Invalid login'})
		else:
			return render(request,'../templates/regist/sign_in.html',{'form':form})
	else:
		form=SigninForm()
		return render(request,'../templates/regist/sign_in.html',{'form':form})


@login_required(login_url='/regist/signin/')
def mainpage(request):
	if request.method == 'GET':
		message="You are logged in successfully"
		return render(request,'../templates/regist/mainpage.html',{'user':request.user,'message':message})
	elif request.method =='POST':
		if request.POST.get("logout"):
			#return redirect('register_activate:logout')
			return redirect('MyRegister:logout')
		else:
			#return redirect('register_activate:thankyou')
			return redirect('MyRegister:thankyou')


def log_out(request):
	logout(request)
	return redirect('Design:index')
	#return render(request,'../templates/regist/log_out.html')


def sendEmail(authInfo, fromAdd, toAdd, subject, plainText, htmlText):
	strFrom = fromAdd
	strTo = ', '.join(toAdd)
	server = authInfo.get('server')
	user = authInfo.get('user')
	passwd = authInfo.get('password')
	if not (server and user and passwd) :
		print 'incomplete login info, exit now'
		return

	msgRoot = MIMEMultipart('related')
	msgRoot['Subject'] = subject
	msgRoot['From'] = strFrom
	msgRoot['To'] = strTo
	msgAlternative = MIMEMultipart('alternative')
	msgRoot.attach(msgAlternative)
	msgText = MIMEText(htmlText, 'html', 'utf-8')
	msgAlternative.attach(msgText)
	try:
		smtp = smtplib.SMTP_SSL('smtp.163.com', 465)
		smtp.login(user,passwd)
		rst = smtp.sendmail(strFrom, strTo, msgRoot.as_string())
		smtp.quit()
		return True
	except Exception, e:    
		print e


def send_email(toaddr,id):
	text = "Hi!\nHow are you?\nHere is the link to activate your account:\nhttp://127.0.0.1:8000/regist/activation/?id=%s" %(id)
	# Record the MIME types of both parts - text/plain and text/html.
        times = time.strftime('%Y-%m-%d', time.localtime(time.time()))
	times = times + time.strftime('-%H:%M', time.localtime(time.time()))
	authInfo = {}
	authInfo['server'] = 'smtp.163.com'
	authInfo['user'] = 'zhenghao20070826'
	authInfo['password'] = 'zhenghao441514'
	fromAdd = 'zhenghao20070826@163.com'
	toAdd = ['976069849@qq.com','zhenghao20070826@163.com']
	subject = 'job report'

	h1 = '<html> <p>Dear Hao.Zheng</p>'
	body = text
	last = "<p> Best Regards</p> <p text-indent:5em>   Hao.Zheng</p> </html>"
	times = "<p> %s </p> </html>"%(times)


	message = h1 +   body + last + times
	htmlText= ''
	#print message
	#plainText = message
	htmlText = str(message)
	plainText = ''
	
	for add in toAdd:
	    temp = []
	    temp.append(add)
	    sendEmail(authInfo, fromAdd, temp, subject, plainText, htmlText)

