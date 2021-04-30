# Generated by Django 3.1.7 on 2021-04-29 13:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('category', '0006_auto_20210429_0917'),
    ]

    sqlCache = []
    reverseSqlCache = []

    tagList=[ 
        [1,1],
        [1,23],
        [2,1],
        [2,23],
        [3,9],
        [3,18],
        [4,6],
        [4,10],
        [4,14],
        [4,18],
        [5,2],
        [5,18],
        [6,2],
        [6,18],
        [7,11],
        [7,18],
        [8,11],
        [8,18],
        [9,11],
        [9,9],
        [9,18],
        [10,11],
        [10,18],
        [11,2],
        [11,12],
        [11,19],
        [12,8],
        [12,10],
        [12,19],

        [13,10],
        [13,2],
        [13,3],
        [13,1],
        [13,8],
        [13,6],
        [13,19],


        [14,10],
        [14,2],
        [14,3],
        [14,1],
        [14,8],
        [14,6],
        [14,19],

        [15,11],
        [15,19],
        
        [16,11],
        [16,19],
        
        [17,8],
        [17,19],

        [18,14],
        [18,19],

        [19,11],
        [19,2],
        [19,19],

        [20,10],
        [20,19],

        [21,3],
        [21,19],

        [22,2],
        [22,24],

        [23,2],
        [23,24],

        [24,11],
        [24,21],
        
        [25,11],
        [25,21],
        
        [26,2],
        [26,3],
        [26,21],
        
        [27,10],
        [27,21],
        
        [28,7],
        [28,21],

        [29,2],
        [29,21],
        
        [30,12],
        [30,2],
        [30,21],

        [31,1],
        [31,21],
        
        [32,1],
        [32,21],

        [33,11],
        [33,21],
        
        [34,1],
        [34,21],

        [35,2],
        [35,21],

        [36,11],
        
        [37,2],
        [37,3],
        [37,11],
        [37,21],

        [38,10],
        [38,15],
        
        [39,10],
        [39,15],
        
        [40,10],
        [40,15],

        [41,1],
        [41,17],
        [41,15],

        [42,2],
        [42,15],

        [43,2],
        [43,3],
        [43,15],
        
        [44,2],
        [44,15],
        
        [45,2],
        [45,15],

        [46,2],
        [46,15],

        [47,8],
        [47,15],
        
        [48,15],

        [49,10],
        [49,15],

        [50,2],
        [50,15],

        [51,13],
        [51,15],

        [52,10],
        [52,15],

        [53,2],
        [53,16],
        [53,15],

        [54,1],
        [54,16],
        [54,15],

        [55,2],
        [55,17],
        [55,15],

        [56,1],
        [56,17],
        [56,15],

        [57,4],
        [57,17],
        [57,15],

        [58,5],
        [58,17],
        [58,15],
        
        [59,6],
        [59,2],
        [59,7],
        [59,17],
        [59,15],
        
        [60,7],
        [60,17],
        [60,15],
        
        [61,3],
        [61,17],
        [61,15],

        [62,5],
        [62,17],
        [62,15],

        [63,3],
        [63,17],
        [63,15],

        [64,1],
        [64,15],

        [65,4],
        [65,2],
        [65,16],
        [65,15],
        
        [66,2],
        [66,16],
        [66,15],
        
        [67,2],
        [67,16],
        [67,15],
        
        [68,8],
        [68,16],
        [68,15],

        [69,2],
        [69,17],
        [69,15],
        
        [70,11],
        [70,20],
        
        [71,11],
        [71,20],

        [72,10],
        [72,20],

        [73,10],
        [73,20],

        [74,25],
        [74,20],

        [75,3],
        [75,2],
        [75,20],

        [76,3],
        [76,2],
        [76,20],

        [77,2],
        [77,20],

        [78,10],
        [78,20],

        [79,25],
        [79,2],
        [79,3],
        [79,1],
        [79,14],
        [79,23],

        [80,14],
        
        [81,25],
        [81,14],
        [81,2],

        [82,2],
        [82,24],
        
        [83,2],
        [83,3],
        [83,10],
        [83,6],
        [83,14],

        [84,2],
        [84,17],
        
        [85,1],
        [85,24],
        
        
        [87,2],
        [87,24],
        
        [88,2],
        [88,24],
        
        [89,11],
        [89,22],

        [90,14],
        [90,10],
        [90,22],
        
        [91,14],
        [91,2],
        [91,3],
        [91,22],
    
        [92,11],
        [92,22],
        ]

    for tag in tagList:
        sqlCache.append(
            """
                INSERT INTO category_smallcategory_tag(smallCategory_id, tag_id)
                VALUES('{smallCategory_id}','{tag_id}');
            """.format(
                smallCategory_id = tag[0],
                tag_id = tag[1]
                )
        )

    reverseSqlCache.append(
        """
            DELETE FROM category_smallcategory_tag;
            ALTER TABLE category_smallcategory_tag auto_increment=1;
        """
    )


    operations = [
        migrations.RunSQL(
            sql = sqlCache, 
            reverse_sql = reverseSqlCache
        )
    ]