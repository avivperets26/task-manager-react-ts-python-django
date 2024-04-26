# task_manager_project/tasks/tests.py

import json
from django.test import TestCase
from django.utils import timezone
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Task
from .serializers import TaskSerializer
from .utils import get_redis_connection, add_task_to_redis
from django.core.exceptions import ValidationError

class TaskModelTestCase(TestCase): 
    def test_task_creation(self): 
        """
        Test that tasks are created correctly.
        """
        # Create a task
        task = Task.objects.create(
            title='Test Task 1',
            description='This is a test task 1',
            created_by='Test User',
            status=0,
            creation_ts=timezone.now(),
            verdict=2  
        )
        
        # Retrieve the task from the database
        saved_task = Task.objects.get(title='Test Task 1')
        
        # Assert that the retrieved task matches the created task
        self.assertEqual(saved_task.title, 'Test Task 1')
        self.assertEqual(saved_task.description, 'This is a test task 1')
        self.assertEqual(saved_task.created_by, 'Test User')
        self.assertEqual(saved_task.status, 0)
        self.assertEqual(saved_task.verdict, 2)  # Clean verdict

    

class TaskViewSetTestCase(TestCase): 
    def test_list_tasks(self):
        Task.objects.create(title='Test Task 1', status=0, verdict=2)
        Task.objects.create(title='Test Task 2', status=1, verdict=1)

        response = self.client.get('/tasks/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)


class TaskDetailAPIViewTestCase(TestCase):
    def setUp(self):        
        self.task = Task.objects.create(title='Test Task 1', status=0, verdict=2)
        
    def test_retrieve_task(self):
        response = self.client.get(reverse('tasks:task-detail', kwargs={'pk': self.task.pk}))
        self.assertEqual(response.status_code, 200)

    def test_update_task(self):        
        url = reverse('tasks:task-detail', kwargs={'pk': self.task.pk})
        data_dict = {'title': 'Updated Task', 'description': 'Updated Description'}
        data_json = json.dumps(data_dict)
        response = self.client.patch(url, data_json, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], data_dict['title'])
        self.assertEqual(response.data['description'], data_dict['description'])

    def test_delete_task(self):
        response = self.client.delete(reverse('tasks:task-detail', kwargs={'pk': self.task.pk}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        

class TaskListCreateAPIViewTestCase(TestCase):
    def test_create_task(self):
        url = reverse('tasks:task-list-create')
        data = {
            'title': 'Test Task 1',
            'description': 'This is a test task 1',
            'created_by': 'Test User',
            'status': 0,
            'creation_ts': timezone.now().isoformat(),
            'verdict': 2,
        }
        data_json = json.dumps(data)
        response = self.client.post(url, data_json, content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
class TaskStatusChoicesTestCase(TestCase):
    def test_invalid_status_choice(self):
        with self.assertRaises(ValidationError):
            task = Task(title='Test Task 1', status=4, verdict=2)
            task.full_clean()  # Validate the fields
            
class TaskVerdictChoicesTestCase(TestCase):
    def test_invalid_verdict_choice(self):        
        with self.assertRaises(ValidationError):
            task = Task(title='Test Task 1', status=0, verdict=4)
            task.full_clean()  # Validate the fields
            
class TaskModelFieldsTestCase(TestCase):
    def test_task_object_field(self):        
        task = Task.objects.create(title='Test Task 1', status=0, verdict=2)
        self.assertIsNotNone(task.object)

    def test_task_title_max_length(self):        
        max_length = Task._meta.get_field('title').max_length
        task = Task.objects.create(title='X' * max_length, status=0, verdict=2)
        self.assertEqual(len(task.title), max_length)

class TaskRedisIntegrationTestCase(TestCase):
    def test_task_added_to_redis(self):        
        task = Task.objects.create(title='Test Task 1', status=0, verdict=2)
        add_task_to_redis(task)
        redis_conn = get_redis_connection()
        queued_task_json = redis_conn.lindex('task_queue', 0).decode('utf-8')
        queued_task_data = json.loads(queued_task_json)
        self.assertEqual(queued_task_data['title'], 'Test Task 1')
        

class TaskSerializerTestCase(APITestCase):
    def test_task_serializer(self):        
        task_data = {
            'title': 'Test Task 1',
            'description': 'This is a test task 1',
            'created_by': 'Test User',
            'status': 0,
            'verdict': 2
        }
        serializer = TaskSerializer(data=task_data)
        self.assertTrue(serializer.is_valid())
        task_instance = serializer.save()

        # Check serialized data
        serialized_data = serializer.data
        self.assertEqual(serialized_data['title'].strip(), task_data['title'])  # Strip trailing whitespace
        self.assertEqual(serialized_data['description'], task_data['description'])
        self.assertEqual(serialized_data['created_by'], task_data['created_by'])
        self.assertEqual(serialized_data['status'], task_data['status'])
        self.assertEqual(serialized_data['verdict'], task_data['verdict'])

        # Check deserialized instance
        self.assertEqual(task_instance.title, task_data['title'])
        self.assertEqual(task_instance.description, task_data['description'])
        self.assertEqual(task_instance.created_by, task_data['created_by'])
        self.assertEqual(task_instance.status, task_data['status'])
        self.assertEqual(task_instance.verdict, task_data['verdict'])

class TaskUtilsTestCase(TestCase):
    def test_get_redis_connection(self):        
        redis_conn = get_redis_connection()
        redis_conn.set('test_key', 'test_value')
        self.assertEqual(redis_conn.get('test_key').decode(), 'test_value')

    def test_add_task_to_redis(self):        
        # Test if a task is correctly added to Redis
        task = Task.objects.create(title='Test Task 1', status=0, verdict=2)
        add_task_to_redis(task)

        redis_conn = get_redis_connection()
        serialized_task = json.loads(redis_conn.lpop('task_queue').decode('utf-8'))

        self.assertEqual(serialized_task['title'], 'Test Task 1')
        self.assertEqual(serialized_task['status'], 0)
        self.assertEqual(serialized_task['verdict'], 2)
