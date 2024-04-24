# node/models.py
from django.db import models

class Node(models.Model):
    STATUS_CHOICES = (
        (0, 'offline'),
        (1, 'error'),
        (2, 'online'),
    )

    name = models.CharField(max_length=100)
    address = models.GenericIPAddressField(protocol='IPv4')
    status = models.IntegerField(choices=STATUS_CHOICES)

    def __str__(self):
        return self.name
