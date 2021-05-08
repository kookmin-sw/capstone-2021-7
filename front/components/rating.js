import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { getSmallCategory } from '../api/rating-api';

const Rating = () => {

  const [smallCategory , setSmallCategory] = useState([]);

  const callGetSmallCategory = async () => {
    await getSmallCategory()
      .then((result) => {
        setSmallCategory(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callGetSmallCategory();
  },[]);

  const onClick = (item) => {
    console.log(item.id);
    // console.log(item);
    // if (userLocation ==="위치정보를 입력해주세요"){
    //   Alert.alert(
    //     "위치 정보를 입력해주세요",
    //     "화면 상단의 돋보기를 눌러 위치정보를 입력해주세요",
    //     [
    //       { text: "OK", onPress: () => console.log("OK Pressed") }
    //     ]
    //   );
    // } else {
    //   navigation.navigate({
    //     name : 'store',
    //     params:{
    //       from : false,
    //       categoryFlag: true,
    //       categoryId:item.id,
    //       categoryName:item.name,
    //     }
    // })
    // }
  }

  const renderSmallCategory = ({ item }) => {
    // console.log(item);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 15,
        }}
      >
        <TouchableOpacity onPress={() => { onClick(item) }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FontAwesome name="circle" size={72} color="#E0E0E0" />
            {/* <Image source={{ uri: item.src }} style={styles.tinyImage} /> */}
            <View style={{ width: 60 }}>
              <Text style={{ textAlign: "center" }}>{item.name} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      );
    }

    return (
      <View style ={styles.rating}>
        <View style ={styles.top}>
          <Text style={styles.title}>카테고리 중 5개를 골라 점수를 입력해주세요!</Text>
          <Text style={styles.sub}>
            1점에서 5점 사이로 평가해주세요
            <FontAwesome5 name="smile" size={20} color="#3498DB" />
          </Text>
        </View>
        <View style={styles.flat}>
          <FlatList
            data={smallCategory}
            renderItem={renderSmallCategory}
            style={{ margin: 20 }}
            keyExtractor={(item) => item.id.toString()} 
            numColumns={4}
            key={4}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  rating: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top : {
    flex: 0.4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },
  title: {
    color: "#3498DB",
    fontWeight: 'bold',
    fontSize:18,
  },
  sub: {
    color: "#3498DB",
    fontWeight: 'bold',
    fontSize:15,
    marginTop:5,
  },
  flat: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 5,
    borderTopColor: "#3498DB",
  }
});

export default Rating;