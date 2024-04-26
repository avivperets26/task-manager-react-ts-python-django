from django.test import TestCase
from .models import Analyzer

class AnalyzerModelTestCase(TestCase):
    def setUp(self):
        # Create an Analyzer instance with valid data
        Analyzer.objects.create(name='Analyzer 1', type=0)  # Use integer value for type

    def test_analyzer_creation(self):
        # Test that analyzers are created correctly
        analyzer = Analyzer.objects.get(name='Analyzer 1')
        self.assertEqual(analyzer.type, 0)  # Check that the type is set correctly

    def test_analyzer_deletion(self):
        # Test that analyzers can be deleted
        analyzer = Analyzer.objects.get(name='Analyzer 1')
        analyzer.delete()
        self.assertEqual(Analyzer.objects.count(), 0)  # Check that the analyzer is deleted

    def test_analyzer_update(self):
        # Test that analyzer data can be updated
        analyzer = Analyzer.objects.get(name='Analyzer 1')
        analyzer.name = 'Updated Analyzer'
        analyzer.save()
        updated_analyzer = Analyzer.objects.get(name='Updated Analyzer')
        self.assertEqual(updated_analyzer.name, 'Updated Analyzer')  # Check that the name is updated
