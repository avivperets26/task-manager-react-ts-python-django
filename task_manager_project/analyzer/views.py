# task_manager_project\analyzer\views.py
from rest_framework import viewsets
from .models import Analyzer
from .serializers import AnalyzerSerializer

class AnalyzerViewSet(viewsets.ModelViewSet):
    queryset = Analyzer.objects.all()
    serializer_class = AnalyzerSerializer
