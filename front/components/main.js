import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getBigCategory } from '../api/main-api';

import { UserLocationContext } from '../context/userlocationcontext';

const Main = () => {
  const navigation = useNavigation();

  const [bigCategory , setBigCategory] = useState([]);

  const { userLocation } = useContext(UserLocationContext);

  const callGetBigCategory = async () => {
    await getBigCategory()
      .then((result) => {
        setBigCategory(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callGetBigCategory();
  },[]);

  const onClick = (item) => {
    console.log(item)
    if (userLocation ==="위치정보를 입력해주세요"){
      Alert.alert(
        "위치 정보를 입력해주세요",
        "화면 상단의 돋보기를 눌러 위치정보를 입력해주세요",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    } else {
      navigation.navigate({
        name : 'store',
        params:{
          from : false,
          categoryFlag: true,
          categoryId:item.id,
          categoryName:item.name,
          categoryImg:item.img
        }
    })
    }
  }

  const renderBigCategory = ({ item }) => {
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
            {/* <FontAwesome name="circle" size={72} color="#E0E0E0" /> */}
            <Image source={{ uri: item.img }} style={{ width:40, height:40, marginBottom:5 }} />
            <View style={{ width: 65 }}>
              <Text style={{ textAlign: "center" }}>{item.name} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style ={styles.container}>
      <View style ={styles.top}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={50} color="#3498DB"/>
      </View>
      <View style ={styles.flat}>
        <FlatList
          data={bigCategory}
          renderItem={renderBigCategory}
          style={{ margin: 10 }}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          key={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top : {
    flex: 0.4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flat: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 5,
    borderTopColor: "#3498DB",
  }
});

export default Main;