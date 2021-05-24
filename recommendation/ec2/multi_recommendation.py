import pandas as pd
import numpy as np
import pymysql
import boto3

conn = pymysql.connect(host = 'fooday-db.cr1v8hlf8bjk.ap-northeast-2.rds.amazonaws.com',
                       port = 3306,
                       user = 'admin',
                       password = 'qkr13245',
                       db = 'deploy')

# df 불러오기
df_feedback = pd.read_sql_query("SELECT * FROM account_user_smallcategory_feedback", conn)
df_order = pd.read_sql_query("SELECT * FROM account_user_smallcategory_order", conn)
df_like = pd.read_sql_query("SELECT * FROM account_user_smallcategory_like", conn)
df_user = pd.read_sql_query("SELECT * FROM account_user", conn)
df_menu = pd.read_sql_query("SELECT * FROM category_smallcategory", conn)

# 주문횟수 1로 만들기
df_order["rating"] = 1
df_order_new = df_order.groupby(["user_id", "smallCategory_id"]).sum().reset_index()
df_order_new["rating"] = 1

# 선호도 1로 만들기
df_like_new = df_like[df_like["rating"]>=4].copy()
df_like_new["rating"] = 1

# graph_user data 만들기
graph_user = pd.concat([df_like_new[["user_id", "smallCategory_id", "rating"]], df_order_new[["user_id", "smallCategory_id", "rating"]]], ignore_index=True)
graph_user = graph_user.groupby(["user_id", "smallCategory_id"]).sum().reset_index()
graph_user.rename(columns={"user_id":"from_node", "smallCategory_id":"to_node", "rating":"weight"}, inplace=True)
user_weight_sum = graph_user.groupby("from_node")["weight"].sum().to_dict()
graph_user["weight"] = graph_user.apply(lambda x: x['weight']/user_weight_sum[x['from_node']], axis=1)

# graph_menu data 만들기
graph_menu = graph_user.copy()
graph_menu.rename(columns={"from_node":"to_node", "to_node":"from_node"}, inplace=True)
menu_weight_sum = graph_menu.groupby("from_node")["weight"].sum().to_dict()
graph_menu["weight"] = graph_menu.apply(lambda x: x['weight']/menu_weight_sum[x['from_node']], axis=1)
graph_menu

# user id
graph_user["from_node"] = graph_user["from_node"].apply(lambda x: "user "+ str(x))
graph_user["to_node"] = graph_user["to_node"].apply(lambda x: "menu "+ str(x))
graph_menu["from_node"] = graph_menu["from_node"].apply(lambda x: "menu "+ str(x))
graph_menu["to_node"] = graph_menu["to_node"].apply(lambda x: "user "+ str(x))
graph = pd.concat([graph_user, graph_menu], ignore_index=True)

idx2node = df_user["id"].apply(lambda x : "user "+ str(x)).tolist() + df_menu["id"].apply(lambda x : "menu "+ str(x)).tolist() #['user 1', 'user 2'...'menu 1',,,]
node2idx = {node:idx for idx, node in enumerate(idx2node)}

graph["from_node"] = graph["from_node"].apply(lambda x : node2idx[x]).astype(int)
graph["to_node"] = graph["to_node"].apply(lambda x : node2idx[x]).astype(int)

## dynamodb 와 연결
dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')
table = dynamodb.Table('recommendation_graph')

# 결과 dynamoDB에 올리기
table.put_item(
    Item = {
        'id' : 'from_node',
        'list' : list(map(str, graph['from_node'].tolist()))
    }
)

table.put_item(
    Item = {
        'id' : 'to_node',
        'list' : list(map(str, graph['to_node'].tolist()))
    }
)

table.put_item(
    Item = {
        'id' : 'weight',
        'list' : list(map(str, graph['weight'].tolist()))
    }
)

table.put_item(
    Item = {
        'id' : 'idx2node',
        'list' : list(map(str, idx2node))
    }
)