import React, {useState, useEffect} from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { getOrder} from '../api/user-api';

const MyOrder = () => {
  const navigation = useNavigation();

  const [orderList, setOrderList] = useState([]);

  const callGetOrder = async () => {
    await getOrder()
    .then((result) => {
      setOrderList(result.data);
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    console.log("출발했나");
    callGetOrder();
  },[]);

  return (
    <View style={styles.store}>
      <View style={styles.top}>
        <View style={styles.category}>
          <FontAwesome name="circle" size={120} color="#E0E0E0"/>
          <Text style={styles.categoryname}>주문 내역</Text>
        </View>
      </View>

      <ScrollView style={styles.list}>
        {orderList.map((elem, key) => {
          const words = elem.timestamp.split('-');
          const day = words[2].split('T');
          console.log(words);
          return(
            <TouchableOpacity 
              key = {key}
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
                  <FontAwesome name="square" size={80} color="#E0E0E0" />
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
  }
});


export default MyOrder;