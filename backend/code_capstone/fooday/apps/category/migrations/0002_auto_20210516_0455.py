# Generated by Django 3.1.7 on 2021-05-16 04:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0001_initial'),
    ]

    sqlCache = []
    reverseSqlCache = []

    data_list = [
        {"id":1, "name":"\uce58\ud0a8", "img":"bigcategory/fried-chicken.png"},
        {"id":2, "name":"\ubd84\uc2dd", "img":"bigcategory/tteokbokki.png"},
        {"id":3, "name":"\uc77c\uc2dd/\ub3c8\uae4c\uc2a4", "img":"bigcategory/nigiri.png"},
        {"id":4, "name":"\uc871\ubc1c/\ubcf4\uc308", "img":"bigcategory/meat.png"},
        {"id":5, "name":"\uc911\uad6d\uc9d1", "img":"bigcategory/noodles.png"},
        {"id":6, "name":"\ud55c\uc2dd", "img":"bigcategory/rice.png"},
        {"id":7, "name":"\ud53c\uc790/\uc591\uc2dd", "img":"bigcategory/pizza.png"},
        {"id":8, "name":"\uce74\ud398/\ub514\uc800\ud2b8", "img":"bigcategory/cupcake.png"},
        {"id":9, "name":"\uc57c\uc2dd", "img":"bigcategory/iftar.png"}]

    for data in data_list:
        sqlCache.append(
            """
                INSERT INTO category_bigcategory(`id`, `name`, `img`)
                VALUES('{id}', '{name}', '{img}')
            """.format(
                id = data["id"],
                name = data["name"],
                img = data["img"]
                )
        )

    reverseSqlCache.append(
        """
            DELETE FROM category_bigcategory;
            ALTER TABLE category_bigcategory auto_increment=1;
        """
    )

    operations = [
        migrations.RunSQL(
            sql = sqlCache,
            reverse_sql = reverseSqlCache
        )
    ]

