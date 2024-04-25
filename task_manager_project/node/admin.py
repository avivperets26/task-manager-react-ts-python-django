# task_manager_project\node\admin.py

from django.contrib import admin
from .models import Node

admin.site.register(Node)