# task_manager_project\redis_utils.py
import logging
import redis
import json
import requests
from tasks.models import Task


# Set up logging
logging.basicConfig(level=logging.INFO)

# Connect to Redis
redis_conn = redis.Redis(host='localhost', port=6379, db=0)
node_ip = '127.0.0.1'


# Worker process
while True:
    # Retrieve task from Redis queue
    serialized_task = redis_conn.rpop('task_queue')
    if serialized_task:
        task_data = json.loads(serialized_task)
        logging.info(f"Retrieved task from Redis: {task_data}")
        
        
        # Simulate sending task to node for processing
        node_url = 'http://'+ node_ip +':8080/analyze'
        response = requests.post(node_url, json=task_data)

        # Handle task processing result
        if response.status_code == 200:
            result = response.json()
            task_id = result['task_id']
            status = result['status']
            verdict = result['verdict']
            logging.info(f"Task processed successfully: {result}")
            
            # Update task status in the database
            task = Task.objects.get(pk=task_id)
            task.status = status
            task.verdict = verdict
            task.save()
            print("Processed Task:", task)     
        else:
            print("Error processing task:", task_data)
            logging.error(f"Failed to process task: {response.content}")
    else:
        logging.info("No tasks in the queue. Waiting for new tasks...")
