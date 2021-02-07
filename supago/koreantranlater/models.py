import os, uuid

from django.db import models
from django.utils import timezone

# Create your models here.

def translate_request_filename(instance, filename):
    ext = filename.split('.')[-1]
    now = timezone.localtime()
    path = str(now.year) + "/" + str(now.month) + "/" + str(now.day)
    format = uuid.uuid4().hex + "." + ext
    return os.path.join(path, format)


class KoreanTranslaterRequest(models.Model):
    text = models.TextField(blank = True ,default = "default")
    createdAt = models.DateTimeField(default = timezone.now)
    photo = models.FileField(upload_to = translate_request_filename)
    
    