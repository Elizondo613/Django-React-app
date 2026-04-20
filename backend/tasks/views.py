from rest_framework import viewsets, mixins
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer