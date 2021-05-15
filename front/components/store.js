import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { UserLocationContext } from '../context/userlocationcontext';

import { getStoreBySmallCatgory, getStoreByBigCatgory } from '../api/store-api';
import { categoryFeedback } from '../api/category-api';

const Store = ({ route }) => {
  const navigation = useNavigation();

  // const [smallCategoryId, setSmallCategoryId] = useState();
  const [storeList, setStoreList] = useState([]);

  const { userLocation } = useContext(UserLocationContext);

  const callGetStoreBySmallCatgory = async () => {
    await getStoreBySmallCatgory({
        location : userLocation,
        smallCategory : route.params.categoryId
      })
      .then((result) => {
        setStoreList(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const callGetStoreByBigCatgory = async () => {
    await getStoreByBigCatgory({
        location : userLocation,
        bigCategory : route.params.categoryId
      })
      .then((result) => {
        setStoreList(result.data);
        console.log(result.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const callCategoryFeedback = async (type) => {
    if (type === true){
      await categoryFeedback({
        scenario : route.params.recommendType,
        smallCategory : route.params.categoryId,
        score : 1
      })
      .then((result) => {
        console.log(result);
        Alert.alert(
          "좋아요를 눌렀습니다.",
          "",
          [
            { text: "OK", onPress: () => console.log("ㅇㅇ") }
          ]
        );
      })
      .catch((err) => {
        if (err.response.data.message === "피드백 할 수 있는 시간대가 아닙니다."){
          Alert.alert(
            "이미 피드백이 끝난 카테고리입니다.",
            "다음 시간대에 다시 피드백을 할 수 있습니다.",
            [
              { text: "OK", onPress: () => console.log("ㅇㅇ") }
            ]
          );
        }
      })
    } else {
      await categoryFeedback({
        scenario : route.params.recommendType,
        smallCategory : route.params.categoryId,
        score : -1
      })
      .then((result) => {
        console.log(result);
        Alert.alert(
          "싫어요를 눌렀습니다.",
          "",
          [
            { text: "OK", onPress: () => console.log("ㅇㅇ") }
          ]
        );
      })
      .catch((err) => {
        if (err.response.data.message === "피드백 할 수 있는 시간대가 아닙니다."){
          Alert.alert(
            "이미 피드백이 끝난 카테고리입니다.",
            "다음 시간대에 다시 피드백을 할 수 있습니다.",
            [
              { text: "OK", onPress: () => console.log("ㅇㅇ") }
            ]
          );
        }
      })
    }}

  useEffect(() => {
    console.log(route.params.categoryFlag);
    if (route.params.categoryFlag == false){
      callGetStoreBySmallCatgory();
    } else{
      callGetStoreByBigCatgory();
    }

  },[]);

  return (
    <View style={styles.store}>
      <View style={styles.top}>
        <View style={styles.category}>
          <Image source={{ uri: route.params.categoryImg }} style={styles.categoryimg} />
          <Text style={styles.categoryname}>{route.params.categoryName}</Text>
        </View>
        {route.params.from === false
        ? <View></View>
        : <Text style={styles.feedback}>
            <TouchableOpacity onPress={() => {
              Alert.alert(
                "정말로 좋아요를 누르시겠습니까?",
                "한번 피드백을 하면 다음 시간대 까지는 해당 카테고리에 대해 피드백을 남기실 수 없습니다.",
                [
                  { text: "OK", onPress: () => callCategoryFeedback(true)},
                  { text: "cancle", onPress: () => console.log("Ask me later pressed")}
                ]
              );

              }}>
              <Text style={styles.feedtext}>
                <FontAwesome5 name="thumbs-up" size={24} color="blue" />  이 추천 좋아요{'\n'}
              </Text>
            </TouchableOpacity>{'\n'}
            <TouchableOpacity onPress={() => {
              Alert.alert(
                "정말로 싫어요를 누르시겠습니까?",
                "한번 피드백을 하면 다음 시간대 까지는 해당 카테고리에 대해 피드백을 남기실 수 없습니다.",
                [
                  { text: "OK", onPress: () => callCategoryFeedback(false)},
                  { text: "cancle", onPress: () => console.log("Ask me later pressed")}
                ]
              );

              }}>
              <Text style={styles.feedtext}>
                <FontAwesome5 name="thumbs-down" size={24} color="red" />  이 추천 별로예요
              </Text>
            </TouchableOpacity>
          </Text>
        }
      </View>

      <ScrollView style={styles.list}>
        {storeList.map((elem, key) => {
          return(
            <TouchableOpacity
              key = {key}
              onPress={()=> {
                navigation.navigate({
                  name : 'menu',
                  params:{
                    storeId:elem.id,
                    storeName:elem.name,
                    storeLocation:elem.location,
                    storeIntro:elem.intro,
                    storeImg:elem.img
                  }
              })}}>
              <View style={styles.tq}>
                  {/* <FontAwesome name="square" size={80} color="#E0E0E0" /> */}
                  <Image source={{ uri: elem.img }} style={styles.storeimg} />
                <View style={styles.tqname}>
                  <Text style={styles.bigText}>{elem.name}</Text>
                  <View style={{
                    flexDirection: "row"
                  }}>
                    {elem.menu.map((elem, key) =>
                      <Text key={key} style={styles.smallText}>{elem.name}, </Text>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
        )})}
        <View style={{marginBottom:'7%'}}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  store: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10
  },
  top: {
    flex:0.4,
    borderBottomColor:"#3498DB",
    borderBottomWidth:5,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    paddingTop:5,
    width:'100%'

  },
  list: {
    flex:5,
    paddingTop:'5%',
    width:'90%',
  },
  category: {
    alignItems:'center',
    justifyContent:'center',
    marginBottom:15,
    marginTop:15,
    flexBasis:'50%'
  },
  categoryname:{
    fontSize:21,
    fontWeight:'bold',
  },
  categoryimg:{
    width:70,
    height:70,
    marginBottom:5
  },
  storeimg:{
		flexBasis: '20%',
    width:60,
    height:60
	},
  bigText:{
    fontSize:19,
    fontWeight:'bold',
    marginBottom:5
  },
  smallText:{
    fontSize:14,
    fontWeight:'bold',
    color:'#3498DB',
  },
  feedtext: {
    fontSize:15,
    fontWeight:"bold",
    color:'#898989'
  },
  tq: {
    flexDirection:'row',
    margin:3
  },
  tqname:{
    marginLeft:15,
    marginRight:15,
    justifyContent:'center',
  },
  feedback: {
    fontWeight:"bold",
    color:'#898989',
    flexBasis: '50%'

  },
});

export default Store;