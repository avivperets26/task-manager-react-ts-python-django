# task_manager_project\tasks\models.py
from django.db import models
import uuid
from django.utils import timezone
from analyzer.models import Analyzer

    
class Task(models.Model):
    STATUS_CHOICES = (
        (0, 'waiting'),
        (1, 'processing'),
        (2, 'finished'),
        (3, 'error'),
    )
    VERDICT_CHOICES = (
        (0, 'malicious'),
        (1, 'suspicious'),
        (2, 'clean'),
    )

    task_id = models.AutoField(primary_key=True)
    object = models.UUIDField(default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, default='')
    description = models.TextField(blank=True)  # Allow description to be empty
    created_by = models.CharField(max_length=255, blank=True)  # Allow createdBy to be empty
    status = models.IntegerField(choices=STATUS_CHOICES, default=0)
    creation_ts = models.DateTimeField(default=timezone.now)
    completed_ts = models.DateTimeField(null=True, blank=True)
    verdict = models.IntegerField(choices=VERDICT_CHOICES)
    analyzer = models.ForeignKey(Analyzer, on_delete=models.CASCADE, related_name='tasks', null=True, blank=True)

    def __str__(self):
        return f"Task {self.task_id}"






# from django.db import models
# from django.utils import timezone

# class Task(models.Model):
#     title = models.CharField(max_length=100) # Add title field
#     description = models.TextField() # Add description field
#     createdAt = models.DateTimeField(default=timezone.now)   # Add createdAt field
#     LastChange = models.DateTimeField(auto_now=True)  # Add LastChange field
#     createdBy = models.CharField(max_length=100, default='Anonymous')  # Add createdBy field
#     type = models.IntegerField(default=1)  # Add type field

#     def __str__(self): # Define the __str__ method
#         return self.title # Return the title of the task
    