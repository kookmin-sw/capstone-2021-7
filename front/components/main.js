import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { getBigCategory } from '../api/main-api';

const Main = () => {
  const navigation = useNavigation();
  const [bigCategory , setBigCategory] = useState([]);

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

  const renderBigCategory = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 15,
        }}
      >
        <TouchableOpacity onPress={()=> {
                navigation.navigate({
                  name : 'store',
                  params:{
                    categoryFlag: true,
                    categoryId:item.id,
                    categoryName:item.name,
                  }
              })}}>
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
    <View style ={styles.container}>
      <View style ={styles.top}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={50} color="#3498DB"/>
      </View>
      <View style ={styles.flat}>
        <FlatList
          data={bigCategory}
          renderItem={renderBigCategory}
          style={{ margin: 20 }}
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
  },
});

export default Main;