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
