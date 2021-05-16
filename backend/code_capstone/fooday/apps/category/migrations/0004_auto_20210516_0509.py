# Generated by Django 3.1.7 on 2021-05-16 05:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0003_auto_20210516_0504'),
    ]

    sqlCache = []
    reverseSqlCache = []

    data_list = [
        {"id":1, "name":"\ub2ed\uace0\uae30"},
        {"id":2, "name":"\ub3fc\uc9c0\uace0\uae30"},
        {"id":3, "name":"\uc18c\uace0\uae30"},
        {"id":4, "name":"\uae40\uce58"},
        {"id":5, "name":"\ub41c\uc7a5"},
        {"id":6, "name":"\ud584"},
        {"id":7, "name":"\ub450\ubd80"},
        {"id":8, "name":"\uc0dd\uc120"},
        {"id":9, "name":"\ub5a1"},
        {"id":10, "name":"\ubc25"},
        {"id":11, "name":"\uba74"},
        {"id":12, "name":"\ud280\uae40"},
        {"id":13, "name":"\uac11\uac01\ub958"},
        {"id":14, "name":"\ucc44\uc18c"},
        {"id":15, "name":"\ud55c\uc2dd"},
        {"id":16, "name":"\ucc1c"},
        {"id":17, "name":"\ud0d5"},
        {"id":18, "name":"\ubd84\uc2dd"},
        {"id":19, "name":"\uc77c\uc2dd"},
        {"id":20, "name":"\uc591\uc2dd"},
        {"id":21, "name":"\uc911\uad6d"},
        {"id":22, "name":"\uc544\uc2dc\uc548"},
        {"id":23, "name":"\ud328\uc2a4\ud2b8\ud478\ub4dc"},
        {"id":24, "name":"\uc57c\uc2dd"},
        {"id":25, "name":"\ube75"}]

    for data in data_list:
        sqlCache.append(
            """
                INSERT INTO category_tag(`id`, `name`)
                VALUES('{id}', '{name}')
            """.format(
                id = data["id"],
                name = data["name"]
                )
        )

    reverseSqlCache.append(
        """
            DELETE FROM category_tag;
            ALTER TABLE category_tag auto_increment=1;
        """
    )

    operations = [
        migrations.RunSQL(
            sql = sqlCache,
            reverse_sql = reverseSqlCache
        )
    ]


