from rest_framework import viewsets
from .models import Analyzer
from .serializers import AnalyzerSerializer

class AnalyzerViewSet(viewsets.ModelViewSet): # Add AnalyzerViewSet class
    queryset = Analyzer.objects.all() # Add queryset attribute
    serializer_class = AnalyzerSerializer # Add serializer_class attribute
