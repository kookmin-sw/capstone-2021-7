# Generated by Django 3.1.7 on 2021-05-04 10:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0007_auto_20210429_1322'),
        ('account', '0010_auto_20210504_1916'),
    ]

    operations = [
        migrations.CreateModel(
            name='User_SmallCategory_Feedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('scenario', models.CharField(choices=[('AWS', 'AWS'), ('SELF', 'SELF')], default='null', max_length=150)),
                ('score', models.IntegerField(default=0)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('smallCategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='category.smallcategory')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
