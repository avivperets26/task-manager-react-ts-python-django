from django.urls import path
from . import views

urlpatterns = [ # URL patterns
     path('info/', views.network_info, name='network-info'), 
    path('settings/', views.network_settings, name='network-settings'),
]