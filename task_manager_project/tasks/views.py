from rest_framework import generics,pagination
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Task
from .serializers import TaskSerializer
from .utils import add_task_to_redis  
from rest_framework import viewsets


class TaskListView(generics.ListAPIView): # Define the TaskListView class
    queryset = Task.objects.all() # Define the queryset attribute
    serializer_class = TaskSerializer # Define the serializer_class attribute
    pagination_class = pagination.PageNumberPagination # Define the pagination_class attribute

class TaskViewSet(viewsets.ModelViewSet): # Define the TaskViewSet class
    queryset = Task.objects.all() # Define the queryset attribute
    serializer_class = TaskSerializer # Define the serializer_class attribute

class TaskListCreateAPIView(generics.ListCreateAPIView): # Define the TaskListCreateAPIView class
    queryset = Task.objects.all() # Define the queryset attribute
    serializer_class = TaskSerializer   # Define the serializer_class attribute

    def perform_create(self, serializer): # Override the perform_create method
        instance = serializer.save() # Save the new task instance
        add_task_to_redis(instance)  # Push the new task to Redis

    def get(self, request, *args, **kwargs): # Override the get method to handle GET requests for the list of tasks 
        # Handle GET request to list tasks
        return self.list(request, *args, **kwargs) 

    def post(self, request, *args, **kwargs): # Override the post method to handle POST requests to create a new task
        # Handle POST request to create a new task
        return self.create(request, *args, **kwargs)

class TaskDetailAPIView(generics.RetrieveUpdateDestroyAPIView): # Define the TaskDetailAPIView class
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

@api_view(['GET'])
def get_csrf_token(request): # Define the get_csrf_token view
    from django.middleware.csrf import get_token
    csrf_token = get_token(request)
    return Response({'csrf_token': csrf_token})

@api_view(['POST'])
def task_results(request): # Define the task_results view
    task_id = request.data.get('task_id')
    status = request.data.get('status')
    verdict = request.data.get('verdict')
    
    # Update task based on the results
    task = Task.objects.get(id=task_id)
    task.status = status
    task.verdict = verdict
    task.save()
    
    return Response({"message": "Task updated successfully"})

