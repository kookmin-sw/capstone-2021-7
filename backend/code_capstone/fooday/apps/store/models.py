from django.db import models

from apps.category.models import *
from apps.account.models import *

# Create your models here.

class Store(models.Model):
    location = models.CharField(max_length = 256, default = "null")
    intro = models.TextField(default = "null")
    name = models.CharField(max_length = 150, default = "null")
    img = models.ImageField(upload_to="image", null = True, blank = True)
    bigcategory = models.ManyToManyField(BigCategory, through = "Store_BigCategory")
        
class Store_BigCategory(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    bigCategory = models.ForeignKey(BigCategory, on_delete=models.CASCADE)

class Menu(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name = "menu")
    price = models.CharField(max_length = 150, default = "null")
    name = models.CharField(max_length = 150, default = "null")
    img = models.ImageField(upload_to="food", blank= True, null= True)
    
