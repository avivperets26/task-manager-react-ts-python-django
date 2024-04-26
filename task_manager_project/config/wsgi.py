"""
WSGI config for task_manager_project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/wsgi/
"""
import os

from django.core.wsgi import get_wsgi_application # Import the get_wsgi_application function

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings') # Set the DJANGO_SETTINGS_MODULE environment variable

application = get_wsgi_application() # Get the WSGI application
