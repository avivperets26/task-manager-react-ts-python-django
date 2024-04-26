from rest_framework import serializers
from .models import Analyzer

class AnalyzerSerializer(serializers.ModelSerializer): # Add AnalyzerSerializer class
    class Meta: # Add Meta class
        model = Analyzer # Add model attribute
        fields = ['id', 'name', 'type', 'nodes'] # Add fields attribute