from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.abstract.serializers import AbstractSerializer
from core.user.models import User
from core.worksheet.models import Worksheet
from core.ocr.util.extract_text import image_to_text

class OCRSerializer(serializers.Serializer):
    author = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='public_id')
    image = serializers.ImageField(write_only=True)  # Add write_only=True to exclude it from the response

    def create(self, validated_data):
        print("validated_data: ", validated_data)
        # The 'validated_data' will contain the processed and validated data
        author = validated_data['author']
        image_file = validated_data['image']
        user = User.objects.get(email=author.email)
        
        worksheet = image_to_text(user, image_file)
        print("##"*10, "orc_serializer worksheet: ", "##"*10)
      
        return worksheet

    class Meta:
        model = Worksheet
        fields = ['id', 'author', 'worksheet', 'body', 'edited', 'created', 'updated', 'image']
        read_only_fields = ["edited"]