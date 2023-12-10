from core.worksheet.models import Worksheet
from django.core.serializers.json import DjangoJSONEncoder
from PIL import Image
import pytesseract
from core.user.models import User
import json
import boto3
import json
import re
from PIL import Image, ImageDraw

key = ''
secret = ''
region = 'us-west-2'

def ocr_worksheet():
    ## this code runs on local machine but cannot connect to aws in container
    sesion = boto3.Session(aws_access_key_id=key, 
                          aws_secret_access_key=secret,
                          region_name=region,
                         )

    textract = sesion.resource('textract' )  
    with open('images/worksheet3.jpg', 'rb') as image:
        img = image.read()
        bytes_test = bytearray(img)
        res =  textract.analyze_document(Document={'Bytes': bytes_test},
                                    FeatureTypes = ['TABLES'])
        # res = client.detect_document_text(Document={'Bytes': bytes_test}, FeatureTypes=['RAW_TEXT'])

    for block in res['Blocks']:
        if block['BlockType'] == 'LINE':
            #write all lines to a file
            print(block['Text'])
            with open('rex.txt', 'a') as f:
                f.write(block['Text']+'\n')


    question_pattern = r"^(\d+)\.\s*(-?\s*\d+\s*[\-?x\+\*\\]\s*\d+)\s*$"
    text_pattern = r"^\w+(\s+\w+)*$"

    worksheet = {'title': '', 'description': '', 'questions': []}

    for block in res['Blocks']:
        if block['BlockType'] == 'LINE':
            line = block['Text']
            
            question_match = re.match(question_pattern, line)
            text_match = re.match(text_pattern, line)

            if question_match:
                worksheet['questions'].append({
                    'id': int(question_match.group(1)),
                    'question': question_match.group(2)})
            elif text_match and not worksheet['title']:
                worksheet['title'] = line
            elif text_match:
                worksheet['description'] += line+'\n'


    return worksheet




def image_to_text(author, image):
    # Dummy data for Worksheet
    # worksheet_data = {
    #     'id': '1',
    #     'title': 'Worksheet 1',
    #     'description': 'This is the first worksheet',
    #     'questions': [
    #         {'questionId': '1', 'question': '1 + 1 = ?', 'answer': '2'},
    #         {'questionId': '2', 'question': '1 + 2 = ?', 'answer': '3'},
    #         {'questionId': '3', 'question': '1 + 3 = ?', 'answer': '4'},
    #         {'questionId': '4', 'question': '1 + 4 = ?', 'answer': '5'},
    #         {'questionId': '5', 'question': '1 + 5 = ?', 'answer': '6'},
    #     ]
    # }
    worksheet_data = ocr_worksheet()
    test = pytesseract.image_to_string(Image.open(image))
    print("test: ", test)
    body_json = json.dumps(worksheet_data, cls=DjangoJSONEncoder)

    user = User.objects.get(email=author.email)
    # Create a Worksheet object with the dummy data
    worksheet = Worksheet(
        author= user,
        body=body_json,
    )
    worksheet.save()
    return body_json
