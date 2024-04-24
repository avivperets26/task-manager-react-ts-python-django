# analyzer/models.py
from django.db import models

class Analyzer(models.Model):
    TYPE_CHOICES = (
        (0, 'pe'),
        (1, 'doc'),
        (2, 'script'),
    )

    name = models.CharField(max_length=100)
    type = models.IntegerField(choices=TYPE_CHOICES)

    def __str__(self):
        return self.name
