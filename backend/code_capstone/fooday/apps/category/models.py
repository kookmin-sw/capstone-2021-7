from django.db import models

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length = 256, default = "null")

class BigCategory(models.Model):
    name = models.CharField(max_length = 256, default = "null")
    img = models.ImageField(upload_to="bigcategory", null = True, blank = True)

class SmallCategory(models.Model):
    name = models.CharField(max_length = 256, default = "null")
    img = models.ImageField(upload_to="smallcategory", null = True, blank = True)
    tag = models.ManyToManyField(Tag, through = "SmallCategory_Tag", related_name = "smallCategory")

class SmallCategory_Tag(models.Model):
    smallCategory = models.ForeignKey(SmallCategory, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
