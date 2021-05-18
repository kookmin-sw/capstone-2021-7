# Generated by Django 3.1.7 on 2021-03-30 07:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0001_initial'),
        ('store', '0001_initial'),
        ('account', '0002_auto_20210330_0320'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='amount',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('male', 'male'), ('female', 'female')], default='null', max_length=150),
        ),
        migrations.AddField(
            model_name='user',
            name='name',
            field=models.CharField(default='null', max_length=150),
        ),
        migrations.AddField(
            model_name='user',
            name='phone',
            field=models.CharField(default='null', max_length=150, unique=True),
        ),
        migrations.AddField(
            model_name='user',
            name='price',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='user',
            name='taste',
            field=models.IntegerField(default=0),
        ),
        migrations.CreateModel(
            name='User_Store',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('store', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.store')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='User_SmallCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eventType', models.IntegerField(default=0)),
                ('eventCount', models.IntegerField(default=0)),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('smallCategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='category.smallcategory')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='User_Menu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('weather', models.CharField(default='null', max_length=150)),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.menu')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='userSmallCategory',
            field=models.ManyToManyField(through='account.User_SmallCategory', to='category.SmallCategory'),
        ),
        migrations.AddField(
            model_name='user',
            name='userStore',
            field=models.ManyToManyField(through='account.User_Store', to='store.Store'),
        ),
    ]