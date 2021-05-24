import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, FlatList, Image } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { getRecommendCategoryMany } from '../api/category-api';
import ShowActivityIndicator from './activityindicator';

const RecommendMany = ({navigation, route}) => {

  const [animating, setAnimating] = useState(true);
  const [manyCategoryList, setManyCategoryList] = useState([]);

  const onClick = (item) => {
    console.log("클릭한 아이템 : ",item)
    
    navigation.navigate({
      name : 'store',
      params:{
        from : false,
        categoryFlag: false,
        categoryId:item.id,
        categoryName:item.name,
        categoryImg:item.img
      }
    })
  }

  const postData = {
    phoneList: route.params.phoneList
  };

  const callGetRecommendCategoryMany = async () => {
      await getRecommendCategoryMany(postData)
      .then((result) => {
        console.log("받아온 데이터 : ",result.data);
        setManyCategoryList(result.data.smallCategoryList);
        setAnimating(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert('알수없는 오류가 발생했습니다');
      });
  }

  useEffect(() => {
    callGetRecommendCategoryMany();
  },[]);
  

  const renderManyCategory = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { onClick(item) }}>
        <View style={styles.listone}>
            <Image source={{ uri: item.img }} style={{ width:150, height:150, margin:10, borderRadius:45 }} />
            <Text style={{padding:10, alignSelf:"center"}}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <View style ={styles.multi}>
      <View style={styles.top}>
        <FontAwesome5 name="thumbs-up" size={50} color="#3498DB" />
      </View>
      {animating === true
        ? <ShowActivityIndicator/>
        : <FlatList
        data={manyCategoryList}
        renderItem={renderManyCategory}
        // style={{ margin: 10 }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        key={2}
    />
      }
      
      {/* <View style={{flex:3.5}}>
        <View style={styles.listone}>
          <FontAwesome name="circle" size={150} color="#E0E0E0" />
          <Text style={{padding:10}}></Text>
          <FontAwesome name="circle" size={150} color="#E0E0E0" />
          
        </View>
        
        <View style={styles.listtwo}>
          <FontAwesome name="circle" size={150} color="#E0E0E0" />
          <Text style={{padding:10}}></Text>
          <FontAwesome name="circle" size={150} color="#E0E0E0" />
          
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  multi: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent:'center',
  },
  top: {
    flex:0.6,
    alignItems:'center',
    justifyContent:'center',
    // marginTop:'10%',
    marginBottom:'15%',
    borderBottomColor:'#3498DB',
    borderBottomWidth:5,
    width:300,
    padding:'10%'
  },
  listone:{
    
  },
  listtwo:{
    flexDirection:'row',
  },
});

export default RecommendMany;