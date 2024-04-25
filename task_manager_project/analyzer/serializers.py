# task_manager_project\analyzer\serializers.py
from rest_framework import serializers
from .models import Analyzer

class AnalyzerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Analyzer
        fields = ['id', 'name', 'type', 'nodes']