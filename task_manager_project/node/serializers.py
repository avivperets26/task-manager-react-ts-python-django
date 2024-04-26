from rest_framework import serializers
from .models import Node

class NodeSerializer(serializers.ModelSerializer): # Add NodeSerializer class
    class Meta: # Add Meta class
        model = Node
        fields = '__all__'