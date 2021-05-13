import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

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
          <FontAwesome name="circle" size={120} color="#E0E0E0"/>
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
                <FontAwesome5 name="thumbs-up" size={24} color="blue" />이 추천 좋아요{'\n'}
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
                <FontAwesome5 name="thumbs-down" size={24} color="red" /> 이 추천 별로예요
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
                    storeIntro:elem.intro
                  }
              })}}>
              <View style={styles.tq}>
                <View>
                  <FontAwesome name="square" size={80} color="#E0E0E0" />
                </View>
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
  },
  top: {
    flex:0.4,
    marginTop:30,
    borderBottomColor:"#3498DB",
    borderBottomWidth:5,
    alignItems:'center',
    justifyContent:'center',
    width:350,
    flexDirection:'row',
  },
  list: {
    flex:5,
    paddingTop:'10%',
    width:350,
  },
  category: {
    alignItems:'center',
    justifyContent:'center',
    marginBottom:15
  },
  categoryname:{
    fontSize:28,
    fontWeight:'bold',
  },
  // feedback:{
  // }
  bigText:{
    fontSize:20,
    fontWeight:'bold',
  },
  smallText:{
    fontSize:15,
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
  },
  tqname:{
    marginLeft:15,
    justifyContent:'center',
  }
});

export default Store;