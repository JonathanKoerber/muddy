from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from core.OCR.serializers import ORCSerializer

# takes a image and returns the text
class RegisterViewSet(ViewSet):
    serializer_class = ORCSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        res = {
            "text": serializer.save(),
        }
        return Response({
            "text": res["text"],
        }, status=status.HTTP_201_CREATED)
