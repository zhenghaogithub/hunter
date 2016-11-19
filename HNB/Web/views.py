#!/usr/bin/python
#coding:utf-8
import sys
import re
import os 
import datetime
from django.http import JsonResponse
from django.http import HttpResponse
from django.template import loader, Context
from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout



@login_required(login_url='/regist/signin/')
def index(request):
    #print "i am in index", request.user
    #return render_to_response("../templates/index.html",{"Request":request})
    return render_to_response("../templates/index.html")


def user(request):
    print "here in user", request.user
    user= request.user._wrapped
    #print type(user)
    #an important debug here
    #print user.__dict__
    usr = user.username
    email = user.email
    #print usr, type(usr)
    #print email, type(email)
    #data = serializers.serialize("json", SomeModel.objects.get(id=myid))
    #user = serializers.serialize("json", usr)
    #cast =[{'name':'zhenghao', 'character': 'Tony Stark / Iron Man'}]
    cast =[{'name':usr, 'email': email}]
    response = JsonResponse(cast, safe=False)
    return response

def subset(request):
    if request.method == 'POST':  
       paras =  request.POST     
       user = request.user
       print paras
       print user
       print paras['k']
       print paras['v']
        
    #print user.__dict__
    blocks =[{'1':[1,2,3], '2': [3,4,5]}]
    response = JsonResponse(blocks, safe=False)
    return response

