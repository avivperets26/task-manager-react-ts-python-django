# task_manager_project\scripts\task_worker.py

#! /usr/bin/env python

import requests
import json
import logging
import time
import redis
import signal
import sys

# Handle Ctrl+C to quit the loop
def signal_handler(sig, frame):
    print('You pressed Ctrl+C! Exiting...')
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

logging.basicConfig(level=logging.INFO)
# Redis connection
redis_conn = redis.Redis(host='localhost', port=6379, db=0)
# Node endpoint for task analysis
node_ip = '127.0.0.1'
ANALYZE_URL = f'http://{node_ip}:8080/analyze/'
# Base URL for your tasks API
API_URL = "http://localhost:8000/tasks/"
# Headers for API requests
HEADERS = {'Authorization': 'Token yourapitokenhere'}

def validate_task(task_data):
    # Check that the task data contains the expected keys
    required_keys = ['op', 'object', 'type']
    if not all(key in task_data for key in required_keys):
        logging.error(f"Invalid task data: {task_data}")
        return False
    return True


def get_task(task_id):
    try:
        response = requests.get(f"{API_URL}{task_id}/", headers=HEADERS)
        response.raise_for_status()
        
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to get task {task_id}: {str(e)}")
        return None
    
    return response.json()

def create_task(data):
    try:
        response = requests.post(API_URL, json=data, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to create task: {str(e)}")
        return None

def update_task(task_id, data):
    try:
        response = requests.put(f"{API_URL}{task_id}/", json=data, headers=HEADERS)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to update task {task_id}: {str(e)}")
        return None

def delete_task(task_id):
    try:
        response = requests.delete(f"{API_URL}{task_id}/", headers=HEADERS)
        response.raise_for_status()
        return True
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to delete task {task_id}: {str(e)}")
        return False
    
# Add the task to the Redis queue
def process_task(task_data):
    # Validate the task data
    if not validate_task(task_data):
        return

    # Send task to node for processing
    node_url = 'http://' + node_ip + ':8080/analyze'
    try:
        response = requests.post(node_url, json=task_data)
        response.raise_for_status()  # Raise an exception for non-200 responses
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to process task: {e}")
        return

    # Parse the response
    try:
        result = response.json()
    except json.JSONDecodeError as e:
        logging.error(f"Failed to decode response from node: {e}")
        return

    # Check that the result contains the expected keys
    required_keys = ['task_id', 'status', 'verdict']
    if not all(key in result for key in required_keys):
        logging.error(f"Invalid result from node: {result}")
        return

    # Update task status in the Django application
    update_data = {'status': result.get('status'), 'verdict': result.get('verdict')}
    update_task(task_data['task_id'], update_data)

# Worker process
while True:
    # Retrieve task from Redis queue
    serialized_task = redis_conn.lpop('task_queue')
    if serialized_task:
        task_data = json.loads(serialized_task)
        logging.info(f"Retrieved task from Redis: {task_data}")
        process_task(task_data)
    else:
        logging.info("No task found in Redis queue")  

def worker():
    while True:
        serialized_task = redis_conn.lpop('task_queue')
       
        if serialized_task:
            #task = json.loads(serialized_task[1].decode('utf-8'))  # Decode the task data before loading it
            task_data = json.loads(serialized_task)
            #print("worker(): task_data_str:: ",task_data_str)
            logging.info(f"Processing task: {task_data}")  # Log the task that's being processed
            process_task(task_data)
        else:
            logging.info("No task found in the queue")  # Log a message when no task is found
        time.sleep(1)  # Sleep for a second before checking for the next task


# def worker():
#     while True:
#         try:
#             # Fetch all tasks from the API
#             tasks_response = requests.get(API_URL, headers=HEADERS)
#             tasks_response.raise_for_status()  # Raise an exception for non-200 responses
#             tasks = tasks_response.json()
            
#             for task in tasks:
#                 task_id = task.get('task_id')
#                 if not get_task(task_id):
#                     create_task(task)
#                 process_task(task)
        
#         except requests.exceptions.RequestException as e:
#             logging.error(f"Failed to fetch tasks: {str(e)}")
        
#         sleep(5)  # Sleep for a while before checking for new tasks again

if __name__ == "__main__":
    worker()
