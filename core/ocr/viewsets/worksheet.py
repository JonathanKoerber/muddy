from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from core.abstract.viewsets import AbstractViewSet
from core.ocr.serializers import OCRSerializer
from core.auth.permissions import UserPermission
from rest_framework.parsers import MultiPartParser, FormParser
from core.worksheet.serializers import WorksheetSerializer
import json


class OCRViewSet(AbstractViewSet):
    http_method_names = ['post']
    permission_classes = (UserPermission,)
    serializer_class = OCRSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        print("Request: ", request)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Call the create method of the serializer to get the created Worksheet instance
        worksheet = serializer.create(serializer.validated_data)

        worksheet_serializer = OCRSerializer(worksheet)
        worksheet_data = worksheet_serializer.data
        
        print("##"*10, "OCR worksheets ViewSet", "##"*10)
        # Return the response with processed text
        return Response({
            'worksheet': json.loads(worksheet_data),
        }, status=status.HTTP_201_CREATED)

