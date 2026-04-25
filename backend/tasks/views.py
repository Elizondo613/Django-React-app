from rest_framework import viewsets, mixins
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
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

    #Backends activos en este ViewSet
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    #Filtrado exacto por campo
    filterset_fields = ['completed']

    #Búsqueda por texto en title
    search_fields = ['title']

    #Ordenamiento permitido
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']  # orden por defecto