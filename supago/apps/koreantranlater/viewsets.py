from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from django.core.files.storage import FileSystemStorage
from django.conf import settings

from .models import *
from .serializers import *

import os, uuid
from django.utils import timezone

def detect_text_uri(uri):
    """Detects text in the file located in Google Cloud Storage or on the Web.
    """
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = uri

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print('Texts:')

    for text in texts:
        print('\n"{}"'.format(text.description))

        vertices = (['({},{})'.format(vertex.x, vertex.y)
                    for vertex in text.bounding_poly.vertices])

        print('bounds: {}'.format(','.join(vertices)))

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

def detect_text(path):
    print(path)
    """Detects text in the file."""
    from google.cloud import vision
    import io
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations
    print('Texts:')

    for text in texts:
        print('\n"{}"'.format(text.description))

        vertices = (['({},{})'.format(vertex.x, vertex.y)
                    for vertex in text.bounding_poly.vertices])

        print('bounds: {}'.format(','.join(vertices)))

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))

class KoreanTranslaterRequestViewSet(viewsets.ModelViewSet):

    queryset = KoreanTranslaterRequest.objects.all()
    serializer_class = KoreanTranslaterRequestSerializer

    def create(self, request, *args, **kwargs):
        photo = request.FILES['photo']
        ext = photo.name.split('.')[-1]
        format = uuid.uuid4().hex + "." + ext
        data = photo.read()
        fileCache = open('apps/koreantranlater/' + format, mode = 'wb')
        fileCache.write(data)
        fileCache.close()
        # texts = detect_text('apps/koreantranlater/' + format)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        os.remove('apps/koreantranlater/' + format)

        return Response(
            data={
                'data' : serializer.data,
            }, 
            status=status.HTTP_201_CREATED, 
            headers=headers)
