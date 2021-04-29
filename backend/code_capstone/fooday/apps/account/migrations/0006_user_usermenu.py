# Generated by Django 3.1.7 on 2021-04-27 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_auto_20210409_0146'),
        ('account', '0005_auto_20210412_0943'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='userMenu',
            field=models.ManyToManyField(through='account.User_Menu', to='store.Menu'),
        ),
    ]