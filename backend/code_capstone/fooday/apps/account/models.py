from django.db import models

from django.contrib.auth.models import AbstractUser
from django.utils import timezone

from apps.category.models import *
from apps.store.models import *

# Create your models here.


class User(AbstractUser):
    GENDER = (
        ('male','male'),
        ('female','female')
    )
    password = models.CharField(max_length=256)
    phone = models.CharField(max_length = 150, unique = True ,default = "null")
    name = models.CharField(max_length = 150, default = "null")
    gender = models.CharField(max_length = 150, choices = GENDER, default = "null")
    taste = models.IntegerField(default = -1)
    price = models.IntegerField(default = -1)
    amount = models.IntegerField(default = -1)
    userSmallCategory = models.ManyToManyField(SmallCategory, through = "User_SmallCategory")
    userStore = models.ManyToManyField(Store, through = "User_Store")
    userMenu = models.ManyToManyField(Menu, through = "User_Menu")
    age = models.IntegerField(default = 0)
    
    
class User_SmallCategory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    smallCategory = models.ForeignKey(SmallCategory, on_delete=models.CASCADE)
    eventType = models.IntegerField(default = 0)
    eventCount = models.IntegerField(default = 0)
    timestamp = models.DateTimeField(default = timezone.now)
     
class User_Store(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    
class User_Menu(models.Model):
    SLOT = (
        ('morning','morning'),
        ('lunch','lunch'),
        ('latelunch','latelunch'),
        ('dinner','dinner'),
        ('midnignsnack','midnignsnack')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default = timezone.now)
    timeSlot = models.CharField(max_length = 150, choices = SLOT, default = "null")
    weather = models.CharField(max_length = 150, default = "null")
    
    
    
    

    
