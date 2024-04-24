# node/models.py
from django.db import models

class Node(models.Model):
    name = models.CharField(max_length=100)
    address = models.GenericIPAddressField(protocol='IPv4')
    status = models.IntegerField(choices=[
        (0, 'offline'),
        (1, 'error'),
        (2, 'online'),
    ])

    def __str__(self):
        return self.name