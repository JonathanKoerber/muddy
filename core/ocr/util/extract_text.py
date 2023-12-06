from core.worksheet.models import Worksheet
from django.core.serializers.json import DjangoJSONEncoder
from core.user.models import User
import json

def image_to_text(author, image):
    # Dummy data for Worksheet
    worksheet_data = {
        'id': '1',
        'title': 'Worksheet 1',
        'description': 'This is the first worksheet',
        'questions': [
            {'questionId': '1', 'question': '1 + 1 = ?', 'answer': '2'},
            {'questionId': '2', 'question': '1 + 2 = ?', 'answer': '3'},
            {'questionId': '3', 'question': '1 + 3 = ?', 'answer': '4'},
            {'questionId': '4', 'question': '1 + 4 = ?', 'answer': '5'},
            {'questionId': '5', 'question': '1 + 5 = ?', 'answer': '6'},
        ]
    }

    body_json = json.dumps(worksheet_data, cls=DjangoJSONEncoder)

    user = User.objects.get(email=author.email)
    # Create a Worksheet object with the dummy data
    worksheet = Worksheet(
        author= user,
        body=body_json,
    )
    worksheet.save()
    return worksheet
