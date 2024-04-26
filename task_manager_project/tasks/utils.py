import redis
from django.conf import settings
from .serializers import serialize_task_for_storage

def get_redis_connection(): 
    """
    Helper function to get a Redis connection using the Django settings.
    """
    return redis.Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB)

def add_task_to_redis(task):
    """
    Serializes a task and adds it to a Redis list (queue).
    """
    redis_conn = get_redis_connection()
    serialized_task = serialize_task_for_storage(task)
    redis_conn.lpush('task_queue', serialized_task)