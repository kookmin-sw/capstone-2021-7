import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

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
    console.log("타입 뭘로떠?",type);
    if (type === true){
      await categoryFeedback({
        scenario : route.params.recommendType,
        smallCategory : route.params.categoryId,
        score : 1
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      await categoryFeedback({
        scenario : route.params.recommendType,
        smallCategory : route.params.categoryId,
        score : -1
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
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
        <Text style={styles.category}>
          <FontAwesome name="circle" size={120} color="#E0E0E0"/>{'\n'}{route.params.categoryName}{'\t'}{'\t'}
        </Text>
        {route.params.from === false 
        ? <View></View>
        : <Text style={styles.feedback}>
            <TouchableOpacity onPress={() => {callCategoryFeedback(true)}}>
              <Text style={styles.feedtext}>
                <FontAwesome5 name="thumbs-up" size={24} color="blue" />이 추천 좋아요{'\n'}
              </Text>
            </TouchableOpacity>{'\n'}
            <TouchableOpacity onPress={() => {callCategoryFeedback(false)}}>
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
    flex:0.5,
    marginTop:30,
    borderBottomColor:"#3498DB",
    borderBottomWidth:5,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    flexDirection:'row',
  },
  list: {
    flex:5,
    paddingTop:'10%',
    width:'100%',
    paddingLeft:'20%',
  },
  category: {
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