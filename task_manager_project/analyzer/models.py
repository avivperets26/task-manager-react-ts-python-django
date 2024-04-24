# analyzer/models.py
from django.db import models
from node.models import Node

class Analyzer(models.Model):
    TYPE_CHOICES = (
        (0, 'pe'),
        (1, 'doc'),
        (2, 'script'),
    )

    name = models.CharField(max_length=100)
    type = models.IntegerField(choices=TYPE_CHOICES)
    nodes = models.ManyToManyField(Node, related_name='analyzers') # Add nodes field Many-to-many Relationship from Node to Analyzer
    
    def __str__(self):
        return self.name
    
    
