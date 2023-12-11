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

def ocr_worksheet(worksheet_image):
    ## this code runs on local machine but cannot connect to aws in container
    sesion = boto3.Session(region_name=region)

    textract = sesion.client('textract' )  

    img = worksheet_image.read()
    bytes_test = bytearray(img)
    res =  textract.analyze_document(Document={'Bytes': bytes_test},
                                     FeatureTypes = ['TABLES'])
 #       res = client.detect_document_text(Document={'Bytes': bytes_test}, FeatureTypes=['RAW_TEXT'])

  #  res = textract.analyze_document(Document={bytearray}, FeatureTypes=['TABLES'])
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
   
    worksheet_data = ocr_worksheet(image)
    body_json = json.dumps(worksheet_data, cls=DjangoJSONEncoder)
    # user = User.objects.get(email=author.email)
    # # Create a Worksheet object with the dummy data
    # worksheet = Worksheet(
    #     author= user,
    #     body=body_json,
    # )
    print("##"*10, "images to text extrattexetlsdkfa ", "##"*10)
    # worksheet.save()
    return body_json
