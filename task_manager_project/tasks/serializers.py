from rest_framework import serializers
from django.core.serializers import serialize
from .models import Task
import json

class TaskSerializer(serializers.ModelSerializer): # Add TaskSerializer class
    class Meta:
        model = Task
        fields = '__all__'
        
def serialize_task_for_storage(task):
    """
    Serializes a task model instance for storage or queuing systems.
    Returns a JSON string.
    """
    task_data = {
        'task_id': task.task_id,
        'object': str(task.object),
        'title': task.title,
        'description': task.description,
        'created_by': task.created_by,
        'status': task.status,
        'creation_ts': task.creation_ts.isoformat(),
        'completed_ts': task.completed_ts.isoformat() if task.completed_ts else None,
        'verdict': task.verdict,
        'analyzer': task.analyzer_id if task.analyzer else None,
    }
    return json.dumps(task_data)