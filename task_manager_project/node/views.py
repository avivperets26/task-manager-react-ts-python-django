from rest_framework import viewsets
from .models import Node
from .serializers import NodeSerializer

class NodeViewSet(viewsets.ModelViewSet): # Add NodeViewSet class
    queryset = Node.objects.all() # Add queryset attribute
    serializer_class = NodeSerializer # Add serializer_class attribute