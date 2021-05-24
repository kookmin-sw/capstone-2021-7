import sys, math, csv, pymysql, boto3
import numpy as np                                
import pandas as pd
import logging

## rds와 연결
host = "fooday-db.cr1v8hlf8bjk.ap-northeast-2.rds.amazonaws.com"
port = 3306
username = "admin"
database = "deploy"
password = "qkr13245"

def connect_RDS(host, port, username, password, database):
    try :
        conn = pymysql.connect(host=host, user=username, passwd=password, db=database, port=port, use_unicode=True, charset='utf8')
        # cursor는 db와 sql문장을 주고받는 역할
        cursor = conn.cursor()
    except :
        logging.error("RDS에 연결되지 않았습니다.")
        sys.exit(1)
    return conn, cursor

conn, cursor = connect_RDS(host, port, username, password, database)

## db 데이터 -> csv 파일 함수
def make_csv(feature) :
    # 컬럼명 가져오기
    column = []
    sql = "show full columns from %s" % feature
    cursor.execute(sql)
    rows = cursor.fetchall()
    for i in range(len(rows)) :
        column.append(rows[i][0])
    
    sql = "select * from %s" % feature
    cursor.execute(sql)
    rows = cursor.fetchall()

    rows = list(rows)
    for a in range(len(rows)):
        rows[a] = list(rows[a])

    f = open('%s.csv' % feature, 'w', encoding='utf-8', newline='')

    wr = csv.writer(f)
    wr.writerow(column)

    for i in range(len(rows)) :
        wr.writerow(rows[i])
    
    f.close()

def open_csv(data) :
    f = open('%s.csv' % data, 'r', encoding='utf-8')
    dataframe = pd.read_csv(f)
    return dataframe

## db 데이터 -> csv 파일
make_csv('account_user')
option_data = open_csv('account_user')

make_csv('account_user_smallcategory_like')
rating_data = open_csv('account_user_smallcategory_like')

make_csv('account_user_smallcategory_order')
order_data = open_csv('account_user_smallcategory_order')

make_csv('category_smallcategory_tag')
tag_data = open_csv('category_smallcategory_tag')

conn.close()

## 데이터 정리
## option_data 정리

option_data = option_data.loc[:,['id', 'amount', 'taste', 'age', 'price', 'gender']]

for id in option_data.index : 
    option_data.loc[id,'gender'] = np.int64(1) if option_data.loc[id,'gender'] == 'female' else np.int64(2)
    option_data.loc[id, 'age'] = np.int64(option_data.loc[id, 'age']/10)

#option_data = option_data.set_index('id')
option_data = option_data.pivot_table(index = 'id')

## rating_data 정리
rating_data_mf = rating_data
rating_data_nan = rating_data.pivot_table('rating', index='user_id', columns='smallCategory_id')
rating_data = rating_data_nan.fillna(0)
rating_data_t = rating_data.transpose()

## rating_data user_id와 option_data user_id 교집합 구하기
user_ids = list(set(rating_data.index) & set(option_data.index))

rating_data = rating_data.loc[user_ids, :]
rating_data_nan = rating_data_nan.loc[user_ids, :]
option_data = option_data.loc[user_ids, :]

## order_data 정리
for id in order_data['id'] :
      order_data.loc[order_data['id']==id,'timestamp'] = int(order_data[order_data['id']==id]['timestamp'][id-1][11:13])

## global average 구하기
from sklearn.metrics.pairwise import cosine_similarity
import math
import scipy.sparse as sparse

train_sparse_matrix = sparse.csr_matrix(rating_data.values)

train_averages = dict()
train_global_average = train_sparse_matrix.sum()/train_sparse_matrix.count_nonzero()
train_averages['global'] = train_global_average

def get_average_ratings(of_users) :
    # data_frame.transpose().count() -- 각 user가 평가한 카테고리 개수
    # data_frame.count() -- 각 카테고리가 평가된 횟수
    no_of_ratings = rating_data_nan.transpose().count() if of_users else rating_data_nan.count()

    ax = 1 if of_users else 0 # 1 - user axes, 0 - category axes
    sum_of_ratings = rating_data_nan.sum(axis=ax)
    u,m = rating_data_nan.index, rating_data_nan.columns
    average_ratings = {}
    for i in u if of_users else m :
        average_ratings[i] = sum_of_ratings[i]/no_of_ratings[i]

    return average_ratings

train_averages['user'] = get_average_ratings(of_users=True)
train_averages['food'] = get_average_ratings(of_users=False)

## svd 학습시키기
from surprise import SVD, Reader, Dataset, accuracy
import surprise
from surprise.model_selection import train_test_split

reader = Reader(rating_scale=(1,5))
data = Dataset.load_from_df(rating_data_mf[['user_id', 'smallCategory_id', 'rating']], reader)

trainset = data.build_full_trainset()

svd = SVD(n_factors=100, biased=True, random_state=15, verbose=True)
svd.fit(trainset)

## svd로 빈 rating 예측해서 채우기
rating_data_svd = rating_data.copy()
for user_id in rating_data.index :
  for smallCategory_id in rating_data.columns :
    if rating_data.loc[user_id][smallCategory_id] == 0 :
      rating_data_svd.loc[user_id][smallCategory_id] = (svd.test([(user_id, smallCategory_id, 0)]))[0].est 

## user based filtering - rating_data
rating_data_svd_t = rating_data_svd.transpose()
user_rating_sim = rating_data_svd_t.corr(method='pearson')

## user based filtering - option_data
user_option_sim_list = cosine_similarity(option_data, option_data)
user_option_sim = pd.DataFrame(data = user_option_sim_list, index = option_data.index, columns = option_data.index)

user_total_sim = user_rating_sim + user_option_sim

def user_based_filtering(user_id, item_id, row) :
    top_sim_users = user_total_sim[user_id][:].sort_values(ascending=False)
    top_sim_users = list(top_sim_users.index[1:]) ## 내 아이디가 아니면으로 변경
    top_user_ratings = rating_data.loc[top_sim_users, item_id]
    top_sim_user_ratings = list(top_user_ratings[top_user_ratings != 0][:5])
    top_sim_user_ratings.extend([train_averages['user'][user_id]])
    row.extend(top_sim_user_ratings)

## item based filtering
def item_based_filtering(user_id, item_id, row) :
    food_sim = cosine_similarity(rating_data_t, rating_data_t)
    food_sim_df = pd.DataFrame(data = food_sim, index = rating_data_t.index, columns = rating_data_t.index)

    top_sim_index = food_sim_df[item_id].sort_values(ascending=False).index
    top_food_ratings = rating_data.loc[user_id][top_sim_index[1:]] ## 내 아이디가 아니면으로 변경
    top_5_food_ratings = list(top_food_ratings[top_food_ratings!=0][:5])
    while len(top_5_food_ratings) != 5 :
        top_5_food_ratings.extend([train_averages['food'][item_id]]) 
    top_5_food_ratings.extend([train_averages['food'][item_id]])
    row.extend(top_5_food_ratings)

## 주문기록을 feature에 추가
def add_order_feature(user_id, item_id, row) : 
  is_userid = order_data['user_id'] == user_id
  is_category = order_data['smallCategory_id'] == item_id
  order_feature = len(order_data[is_userid & is_category])
  row.extend([order_feature])

## 전체 feature 생성
final_data = pd.DataFrame(columns=["user", "item", "GAvg", "sur1", "sur2", "sur3", "sur4", "sur5", "UAvg", "sfd1", "sfd2", "sfd3", "sfd4", "sfd5", "IAvg", "odn", "rating"])
for user in rating_data.index :
    user_rating = rating_data.loc[user,:]
    food_is_rating = list(user_rating[user_rating != 0].index)
    for item in food_is_rating :
        row = []
        row.extend([user, item, train_averages['global']])

        user_based_filtering(user, item, row)
        item_based_filtering(user, item, row)
        add_order_feature(user, item, row)

        row.extend([rating_data.loc[user, item]])
        final_data = final_data.append(pd.Series(row, index=final_data.columns), ignore_index=True)

## xgboost 학습
import xgboost as xgb
from sklearn.model_selection import train_test_split

x_feature = final_data.drop(['user', 'item', 'rating'], axis=1)
y_label = final_data['rating']

x_train, x_test, y_train, y_test = train_test_split(x_feature, y_label, shuffle = False, test_size=0.2)

xgb_model = xgb.XGBRegressor(objective='reg:squarederror', max_depth = 2, n_estimators=380, learning_rate=0.2)
xgb_model.fit(x_feature, y_label, eval_metric='rmse')

## 전체 유저 예측 
from operator import itemgetter

def XGBOOST(user_id) :
    predict_input = pd.DataFrame(columns=["GAvg", "sur1", "sur2", "sur3", "sur4", "sur5", "UAvg", "sfd1", "sfd2", "sfd3", "sfd4", "sfd5","odn", "IAvg"])
    category_index = rating_data.columns
    # 입력 feature 생성
    for item in category_index :
        row = []
        row.extend([train_averages['global']])

        user_based_filtering(user_id, item, row)
        item_based_filtering(user_id, item, row)
        add_order_feature(user_id, item, row)

        predict_input = predict_input.append(pd.Series(row, index=predict_input.columns), ignore_index=True)
    
    # 예측
    predictions = xgb_model.predict(predict_input).tolist()
    predictions_dict = {}
    i=1
    for predict, item_id in zip(predictions, category_index) :
        predictions_dict[item_id] = rating_data.loc[user_id, item_id] if rating_data.loc[user_id, item_id] != 0 else predict

    for index in range(1, 93) :
        if index not in category_index :
            predictions_dict[index] = 0
    
    return predictions_dict

    #return sorted(predictions_dict.items(), key=itemgetter(1), reverse=True)[:5]
    #return sorted(predictions_dict.items(), key=itemgetter(1), reverse=True)

## 예측 평점에 시간별 주문확률 추가
import datetime
from pytz import timezone

def what_is_current_timezone(now_time) :
    if 6 <= now_time and now_time < 11 : 
        return (6 <= order_data['timestamp']) & (order_data['timestamp'] < 11)
    elif 11 <= now_time and now_time < 15 : 
        return (11 <= order_data['timestamp']) & (order_data['timestamp'] < 15)
    elif 15 <= now_time and now_time < 18 : 
        return (15 <= order_data['timestamp']) & (order_data['timestamp'] < 18)
    elif 18 <= now_time and now_time < 21 : 
        return (18 <= order_data['timestamp']) & (order_data['timestamp'] < 21)
    elif 21 <= now_time or now_time < 6 :
        return (21 <= order_data['timestamp']) | (order_data['timestamp'] < 6)

def make_orderprob_dict(now_time) :
    order_prob_dict = {}
    category_index = rating_data.columns

    for item_id in range(1, 93) : 
        is_category = order_data['smallCategory_id'] == item_id
        is_timezone = what_is_current_timezone(now_time)
        order_prob = len(order_data[is_category & is_timezone]) / (len(order_data[is_category]) * 2) if len(order_data[is_category]) > 0 else 0
        order_prob_dict[item_id] = order_prob

    return order_prob_dict

now_kst = datetime.datetime.now(timezone('Asia/Seoul'))
now_time = int(now_kst.hour)

now_orderprob_dict = make_orderprob_dict(now_time)

## dynamodb 와 연결
dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')
table = dynamodb.Table('fooday_recommendation')

# 결과 dynamoDB에 올리기
for user_id in rating_data.index : 

    final_preds_all = {}
    preds_all = XGBOOST(user_id)
    for item_id in range(1, 93) :
        final_preds_all[item_id] = str(preds_all[item_id] + now_orderprob_dict[item_id])
    
    table.put_item(
        Item = {
            'user_id' : user_id,
            'preds_dict' : list(final_preds_all.values())
        }
    )