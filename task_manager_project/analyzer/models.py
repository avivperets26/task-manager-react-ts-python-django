from django.db import models
from node.models import Node

class Analyzer(models.Model):
    TYPE_CHOICES = ( # Add TYPE_CHOICES tuple
        (0, 'pe'),
        (1, 'doc'),
        (2, 'script'),
    )

    name = models.CharField(max_length=100) # Add name field
    type = models.IntegerField(choices=TYPE_CHOICES) # Add type field
    
    nodes = models.ManyToManyField(Node, related_name='analyzers') # Add nodes field Many-to-many Relationship from Node to Analyzer
    def __str__(self):
        return self.name
    
    
