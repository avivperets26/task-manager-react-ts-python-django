from django.apps import AppConfig

class AnalyzerConfig(AppConfig): # Add AnalyzerConfig class
    default_auto_field = 'django.db.models.BigAutoField' # Add default_auto_field attribute
    name = 'analyzer' # Add name attribute