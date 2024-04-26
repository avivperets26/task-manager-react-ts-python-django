# task_manager_project\tasks\urls.py

from django.urls import path
from .views import TaskListCreateAPIView, TaskDetailAPIView, get_csrf_token,TaskListView

app_name = 'tasks'  # Define the app name that acts as the namespace

urlpatterns = [
    path('', TaskListCreateAPIView.as_view(), name='task-list-create'),
    path('tasks/', TaskListView.as_view(), name='task-list'),
    path('<int:pk>/', TaskDetailAPIView.as_view(), name='task-detail'),
    path('csrf/', get_csrf_token, name='get-csrf-token'),  # If CSRF token view is needed
]


# from django.urls import path
# from . import views


# urlpatterns = [
#     path('', views.task_list, name='task-list'), # Add the URL pattern for the task_list view function to the urlpatterns list in the tasks/urls.py file
#     path('<int:pk>/', views.task_detail, name='task-detail'), # Add the URL pattern for the task_detail view function to the urlpatterns list in the tasks/urls.py file
#     path('get-csrf-token/', views.get_csrf_token, name='get_csrf_token'), # Add the URL pattern for the get_csrf_token view function to the urlpatterns list in the tasks/urls.py file 
#     path('create/', views.task_create, name='task-create'), # Add the URL pattern for the task_create view function to the urlpatterns list in the tasks/urls.py file
#     path('<int:pk>/update/', views.task_update, name='task-update'), # Add the URL pattern for the task_update view function to the urlpatterns list in the tasks/urls.py file
# ]