# Generated by Django 3.1.7 on 2021-04-29 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0006_user_usermenu'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='age',
            field=models.IntegerField(default=0),
        ),
    ]