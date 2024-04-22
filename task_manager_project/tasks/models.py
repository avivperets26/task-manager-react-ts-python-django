from django.db import models
from django.utils import timezone

class Task(models.Model):
    title = models.CharField(max_length=100) # Add title field
    description = models.TextField() # Add description field
    createdAt = models.DateTimeField(default=timezone.now)   # Add createdAt field
    LastChange = models.DateTimeField(auto_now=True)  # Add LastChange field
    createdBy = models.CharField(max_length=100, default='Anonymous')  # Add createdBy field
    type = models.IntegerField(default=1)  # Add type field

    def __str__(self): # Define the __str__ method
        return self.title # Return the title of the task
    