from django.shortcuts import render
from django.http import HttpResponse

def user_register(request):
    return HttpResponse("This is the user register view.")

def user_login(request):
    return HttpResponse("This is the user login view.")

def user_profile(request):
    return HttpResponse("This is the user profile view.")

def user_logout(request):
    return HttpResponse("This is the user logout view.")
