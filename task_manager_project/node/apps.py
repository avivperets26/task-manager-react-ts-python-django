from django.apps import AppConfig

class NodeConfig(AppConfig): # Change the class name to NodeConfig
    default_auto_field = 'django.db.models.BigAutoField' # Set the default auto field
    name = 'node'