from rest_framework import viewsets
from rest_framework import filters

class AbstractViewSet (viewsets.ModelViewSet):
    """
    Abstract ViewSet for all ViewSets in the project
    """
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["updated", "created"]
    ordering = ["-updated"]
    