# Generated by Django 3.1.7 on 2021-05-08 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0015_auto_20210505_0233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_smallcategory_feedback',
            name='scenario',
            field=models.CharField(choices=[('AWS', 'AWS'), ('SELF', 'SELF'), ('TIME', 'TIME'), ('WEATHER', 'WEATHER')], default='null', max_length=150),
        ),
    ]