# task_manager_project\node\tests.py
from django.test import TestCase
from .models import Node

class NodeModelTestCase(TestCase):
    def setUp(self):
        self.node = Node.objects.create(name='Test Node', address='192.168.1.1', status=2)

    def test_node_creation(self):
        """
        Test that nodes are created correctly.
        """
        # Retrieve the node from the database
        saved_node = Node.objects.get(name='Test Node')

        # Assert that the retrieved node matches the created node
        self.assertEqual(saved_node.name, 'Test Node')
        self.assertEqual(saved_node.address, '192.168.1.1')
        self.assertEqual(saved_node.status, 2)

    def test_node_update(self):
        updated_name = 'Updated Test Node'
        self.node.name = updated_name
        self.node.save()
        self.assertEqual(Node.objects.get(id=self.node.id).name, updated_name)

    def test_node_deletion(self):
        node_count_before_deletion = Node.objects.count()
        self.node.delete()
        self.assertEqual(Node.objects.count(), node_count_before_deletion - 1)
