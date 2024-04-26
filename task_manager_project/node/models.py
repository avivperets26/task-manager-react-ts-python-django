from django.db import models

class Node(models.Model): # Change the class name to Node
    name = models.CharField(max_length=100) # Change the name of the node
    address = models.GenericIPAddressField(protocol='IPv4') # Change the address field
    status = models.IntegerField(choices=[ # Change the status field
        (0, 'offline'),
        (1, 'error'),
        (2, 'online'),
    ])

    def __str__(self):
        return self.name