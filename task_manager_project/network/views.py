from django.shortcuts import render
from django.http import HttpResponse


def network_info(request):
    return HttpResponse("This is the network info view.")   

def network_settings(request): 
    return HttpResponse("This is the network settings view.") 
