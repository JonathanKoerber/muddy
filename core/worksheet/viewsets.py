from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from core.abstract.viewsets import AbstractViewSet
from core.worksheet.models import Worksheet
from core.worksheet.serializers import WorksheetSerializer
from core.auth.permissions import UserPermission

class WorksheetViewSet(AbstractViewSet):
    http_method_names = ('post', 'get', 'put', 'delete')
    permission_classes = (UserPermission,)
    serializer_class = WorksheetSerializer

    def get_queryset(self):
        return Worksheet.objects.all()

    def get_object(self):
        obj = Worksheet.objects.get_object_by_public_id(self.kwargs['pk'])

        self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        print("Create Worksheet", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

