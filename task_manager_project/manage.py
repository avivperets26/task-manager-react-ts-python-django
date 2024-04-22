#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main(): # pragma: no cover
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings') # Set the DJANGO_SETTINGS_MODULE environment variable
    try: # Try to import the execute_from_command_line function
        from django.core.management import execute_from_command_line # Import the execute_from_command_line function
    except ImportError as exc: # Handle ImportError
        raise ImportError( # Raise ImportError
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv) # Execute the command line


if __name__ == '__main__': # Check if the script is being run directly
    main()
