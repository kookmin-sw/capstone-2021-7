import json
import boto3
import numpy as np
import random
from scipy.sparse import csc_matrix

def lambda_handler(event, context):
    # TODO implement

    users = event['user_id']

    # collaborative filtering topmenu 뽑기

    if len(users)<=1:
        dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')
        table = dynamodb.Table('fooday_recommendation')
        table_category = dynamodb.Table('category_tag_sim')

        recommendation= np.array(table.get_item(Key={"user_id": id})["Item"]["preds_dict"], dtype=np.float64)

        if np.sum(recommendation)==0:
            return {
                'statusCode': 404,
                'body': '정보가 없습니다.'
            }


        recommendation_idx = []
        for i, rating in enumerate(recommendation):
            recommendation_idx.append((rating,i+1))

        recommendation_idx.sort(key=lambda x: -x[0])


        result = [i[1] for i in recommendation_idx]



        result_random = random.sample(result[:5], 3)


        # content-based topmenu 뽑기

        topmenu = result[0]

        content_based =  np.array(table_category.get_item(Key={"category_id": topmenu})["Item"]["tag_sim"], dtype=np.float64)

        content_based_idx = [] # (유사도 점수, 번호)
        for i, score in enumerate(content_based):
            content_based_idx.append((score,i+1))


        content_based_idx.sort(key=lambda x: (-x[0], random.random()))

        topmenu_sim = 0
        for score, idx in content_based_idx:
            if idx not in result_random:
                topmenu_sim= idx
                break

        result = result_random + [topmenu_sim]

    else :
        result = pagerank(users)

    return {
        'statusCode': 200,
        'user_list' : json.dumps(users),
        'body': json.dumps(result)
    }


def pagerank(users):

    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-2')
    table = dynamodb.Table('recommendation_graph')

    data = np.array(table.get_item(Key={"id": "weight"})["Item"]["list"], dtype=np.float64)
    rows = np.array(table.get_item(Key={"id": "from_node"})["Item"]["list"], dtype=np.int)
    cols = np.array(table.get_item(Key={"id": "to_node"})["Item"]["list"], dtype=np.int)
    idx2node = table.get_item(Key={"id": "idx2node"})["Item"]["list"]

    A = csc_matrix((data, (rows, cols)))
    # print(A.shape)

    user_list = []
    for id in users:
        user_list.append('user '+str(id))

    bias = np.asarray([1/len(users) if node in user_list else 0 for node in idx2node])

    max_iter = 50
    df = 0.9

    ir = 1 / A.shape[0]
    rank = np.asarray([ir] * A.shape[0])

    if np.sum(bias) != 1:
      bias = 1/A.shape[0]

    for n_iter in range(1, max_iter + 1):
        rank_new = A.dot(rank) # call scipy.sparse safe_sparse_dot()
        rank_new = sum(abs(rank_new.reshape(1, -1))).reshape(-1)
        rank_new = df * rank_new + (1 - df) * bias
        diff = abs(rank - rank_new).sum()
        rank = rank_new
        if diff<0.02 : break

    rank_ = {idx2node[idx]:value for idx, value in enumerate(rank)}
    userrank = {node:value for node, value in rank_.items() if 'user' in node}
    menurank = {node:value for node, value in rank_.items() if 'menu' in node}


    result = []
    for menu, value in sorted(menurank.items(), key=lambda x:-x[1])[:4] :
        result.append(int(menu.split()[1]))

    return result