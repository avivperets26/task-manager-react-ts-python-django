from django.urls import path
from .views import TaskListCreateAPIView, TaskDetailAPIView, get_csrf_token,TaskListView

app_name = 'tasks'  # Define the app name that acts as the namespace

urlpatterns = [
    path('', TaskListCreateAPIView.as_view(), name='task-list-create'), # Define the URL pattern for the TaskListCreateAPIView
    path('tasks/', TaskListView.as_view(), name='task-list'), # Define the URL pattern for the TaskListView
    path('<int:pk>/', TaskDetailAPIView.as_view(), name='task-detail'), # Define the URL pattern for the TaskDetailAPIView
    path('csrf/', get_csrf_token, name='get-csrf-token'),  # If CSRF token view is needed
]


