import React, {useState, useEffect, useContext} from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { getOrder} from '../api/user-api';

import { OrderContext } from '../context/ordercontext';

const MyOrder = () => {
  const navigation = useNavigation();

  const {orderList, setOrderList} = useContext(OrderContext);
  
  const callGetOrder = async () => {
    await getOrder()
    .then((result) => {
      setOrderList(result.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  useEffect(() => {
    callGetOrder();
  },[]);

  return (
    <View style={styles.store}>
      <View style={styles.top}>
        <View style={styles.category}>
          <FontAwesome5 name="clipboard-list" color="#3498DB" size={50} />
          <Text></Text>
          <Text style={styles.categoryname}>주문 내역</Text>
        </View>
      </View>

      <ScrollView style={styles.list}>
        {orderList.map((elem, key) => {
          console.log(elem);
          const words = elem.timestamp.split('-');
          const day = words[2].split('T');
          return(
            <TouchableOpacity 
              key = {elem.id}
              onPress = {()=> 
                navigation.navigate({
                  name : 'mydetailorder',
                  params:{
                    orderList : elem.menu
                  }
              })
              }
              >
              <View style={styles.tq}>
                <View>
                  <Image source={{ uri: elem.menu[0].storeImg }} style={styles.categoryimg} />
                </View>
                <View style={styles.tqname}>
                  <Text style={styles.smallText2}>{words[0]}  {words[1]}/{day[0]} </Text>
                  <Text style={styles.bigText}>{elem.menu[0].store}</Text>
                  <View style={{flexDirection: "row"}}>
                    <Text key={key} style={styles.smallText}>{elem.menu[0].name} 외 {elem.menu.length-1}개 </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
        )})}
        <View style={{marginBottom:'11%'}}></View>
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
    paddingTop:'5%',
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
  bigText:{
    fontSize:20,
    fontWeight:'bold',
  },
  smallText:{
    fontSize:15,
    fontWeight:'bold',
    color:'#3498DB',
  },
  smallText2:{
    fontSize:15,
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
  },
  categoryimg: {
    width: 70,
    height: 70,
    marginBottom:5,
    borderRadius:30,
  },
});


export default MyOrder;