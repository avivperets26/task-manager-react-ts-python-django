"""
URL configuration for task_manager_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# task_manager_project\config\urls.py

from django.contrib import admin
from django.urls import include, path 
from rest_framework.routers import DefaultRouter 
from node.views import NodeViewSet
from analyzer.views import AnalyzerViewSet
from tasks.views import TaskViewSet

router = DefaultRouter()
router.register(r'nodes', NodeViewSet)
router.register(r'analyzers', AnalyzerViewSet)
router.register(r'tasks', TaskViewSet)

urlpatterns = [ # URL patterns
    path('admin/', admin.site.urls), # Admin URL
    #path('tasks/', include('tasks.urls', namespace='tasks')),  # Tasks URL with namespace
    path('api/', include(router.urls)),
    #path('', include(router.urls)),
] 
