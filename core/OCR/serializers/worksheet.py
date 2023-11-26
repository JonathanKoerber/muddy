from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.abstract.serializers import AbstractSerializer
from core.OCR.models import OCR
from core.user.models import User
from core.worksheet.models import Worksheet

class  OCRSerializer(AbstractSerializer):
    author = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')
    worksheet = serializers.SlugRelatedField(queryset=Worksheet.objects.all(), slug_field='public_id')

    def validate_author(self, value):
        if self.context["request"].user != value:
            raise ValidationError("You can't create a post for another user.")
        return value

    class Meta:
        model = OCR
        # List of all the fields that can be included in a request or a response
        fields = ['id', 'author', 'worksheet', 'body', 'edited', 'created', 'updated']
        read_only_fields = ["edited"]