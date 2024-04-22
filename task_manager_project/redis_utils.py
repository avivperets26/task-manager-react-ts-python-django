import redis
import json
from tasks.models import Task  # Import the Task model

# Connect to Redis
redis_conn = redis.Redis(host='localhost', port=6379, db=0) 

# Worker process
while True:
    # Retrieve task from Redis queue
    serialized_task = redis_conn.rpop('task_queue') # Pop the last task from the queue
    if serialized_task:
        task = json.loads(serialized_task) # Deserialize the task
        task_data = task['object'] # Extract the task data
        new_task = Task.objects.create(title=task_data['title'], description=task_data['description']) # Create a new Task object
        print("Processed Task:", new_task) # Print the processed task
