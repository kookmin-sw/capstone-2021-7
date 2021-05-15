# Generated by Django 3.1.7 on 2021-05-10 06:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0007_auto_20210503_1156'),
        ('account', '0017_merge_20210510_1422'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(default=django.utils.timezone.now)),
                ('timeSlot', models.CharField(choices=[('morning', 'morning'), ('lunch', 'lunch'), ('latelunch', 'latelunch'), ('dinner', 'dinner'), ('midnignsnack', 'midnignsnack')], default='null', max_length=150)),
                ('weather', models.CharField(default='null', max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Order_Menu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.menu')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.order')),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='userMenu',
        ),
        migrations.DeleteModel(
            name='User_Menu',
        ),
        migrations.AddField(
            model_name='order',
            name='orderMenu',
            field=models.ManyToManyField(through='account.Order_Menu', to='store.Menu'),
        ),
        migrations.AddField(
            model_name='order',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]