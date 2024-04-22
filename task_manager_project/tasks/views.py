from django.http import HttpResponse ,JsonResponse
from .models import Task  # Import the Task model
from django.views.decorators.csrf import csrf_exempt
import json
import redis
from django.middleware.csrf import get_token
from django.core.paginator import Paginator

#@csrf_exempt
from django.forms.models import model_to_dict

def task_list(request): # Define the task_list view
    tasks = Task.objects.all() # Get all tasks from the database
    paginator = Paginator(tasks, 8)  # Show 10 tasks per page
    page_number = request.GET.get('page', 1) # Get the page number from the request
    page_obj = paginator.get_page(page_number) # Get the page object for the current page number
    data = [model_to_dict(task) for task in page_obj]  # Convert each task object to a dictionary
    response_data = { # Create a dictionary with the response data
        "tasks": data, # Add the tasks data to the response
        "totalTasks": paginator.count, # Add the total number of tasks to the response
        "currentPage": page_obj.number, # Add the current page number to the response
        "numPages": paginator.num_pages # Add the total number of pages to the response
    }
    return JsonResponse(response_data, safe=False) # Return the response data as JSON

#@csrf_exempt 
def get_csrf_token(request): # Define the get_csrf_token view
    # Get the CSRF token for the current session
    csrf_token = get_token(request)  
    # Ensure the response sets the CSRF cookie
    return JsonResponse({'csrf_token': csrf_token})

from django.utils import timezone

def task_create(request): # Define the task_create view
    if request.method == 'POST': # Check if the request method is POST
        try:
            data = json.loads(request.body.decode('utf-8')) # Load the JSON data from the request body
            # Retrieve nested objects from the data dictionary
            object_data = data.get('object', {})
            title = object_data.get('title', '') # Get title from request or set default
            description = object_data.get('description', '') # Get description from request or set default
            createdBy = object_data.get('createdBy', 'Anonymous')  # Get createdBy from request or set default
            
            # Explicitly set the values for the additional fields
            createdAt = timezone.now()  # Set the current timestamp for createdAt
            LastChange = timezone.now()  # Set the current timestamp for LastChange
            type = data.get('type', 1)  # Get the type from the request or set default
            
            task = Task.objects.create(title=title, description=description, createdBy=createdBy, createdAt=createdAt, LastChange=LastChange, type=type) # Create a new task object
            return JsonResponse({'id': task.id, 'title': task.title, 'description': task.description, 'createdAt': task.createdAt, 'LastChange': task.LastChange, 'createdBy': task.createdBy}, status=201) # Return the task data with status code 201 (Created)
        except json.JSONDecodeError: # Handle JSON decoding error
            return JsonResponse({'error': 'Invalid JSON format in request body'}, status=400) # Return an error response with status code 400 (Bad Request)

    
def task_detail(request, pk): # Define the task_detail view
     
    try:
        task = Task.objects.get(pk=pk) # Get the task with the specified primary key
    except Task.DoesNotExist:
        return HttpResponse(status=404) # Return 404 if the task does not exist

    if request.method == 'GET': # Check if the request method is GET
        return JsonResponse({'id': task.id, 'title': task.title, 'description': task.description, 'createdAt': task.createdAt, 'LastChange': task.LastChange, 'createdBy': task.createdBy}) # Return the task data as JSON
    
    elif request.method == 'DELETE': # Check if the request method is DELETE
        task.delete() # Delete the task from the database
        return HttpResponse(status=204)  # Return success with status code 204 (No Content)
    
    
    
def task_update(request, pk): # Define the task_update view
    try:
        task = Task.objects.get(pk=pk) # Get the task with the specified primary key
    except Task.DoesNotExist: # Handle the case where the task does not exist
        return HttpResponse(status=404)     # Return 404 if the task does not exist

    if request.method == 'PUT' or request.method == 'PATCH': # Check if the request method is PUT or PATCH
        try:
            data = json.loads(request.body.decode('utf-8')) # Load the JSON data from the request body
            # Update task attributes based on request data
            task.title = data.get('title', task.title)
            task.description = data.get('description', task.description) # Update the description if provided
            task.createdBy = data.get('createdBy', task.createdBy) # Update the createdBy if provided
            # Save the updated task
            task.save()
            # Return the updated task
            return JsonResponse({'id': task.id, 'title': task.title, 'description': task.description, 'createdAt': task.createdAt, 'LastChange': task.LastChange, 'createdBy': task.createdBy}) # Return the updated task data
        except json.JSONDecodeError: # Handle JSON decoding error
            return JsonResponse({'error': 'Invalid JSON format in request body'}, status=400) # Return an error response with status code 400 (Bad Request)
    else:
        return HttpResponse(status=405)  # Method Not Allowed


# Connect to Redis
redis_conn = redis.Redis(host='localhost', port=6379, db=0)

