# task_manager_project\tasks\serializers.py

from rest_framework import serializers
from django.core.serializers import serialize
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        
def serialize_task_for_storage(task):
    """
    Serializes a task model instance for storage or queuing systems.
    Returns a JSON string.
    """
    return serialize('json', [task])