import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { getLocationList} from '../api/user-api';

import { UserLocationContext } from '../context/userlocationcontext';

const LocationList = () => {
  const navigation = useNavigation();

  const [locationList, setLocationList] = useState([]);

  const {userLocation, setUserLocation} = useContext(UserLocationContext);

  const callGetLocationList = async () => {
    await getLocationList()
    .then((result) => {
      setLocationList(result.data);
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    console.log("출발했나");
    callGetLocationList();
  },[]);

  return (
    <View style={styles.store}>
      <View style={styles.top}>
        <View style={styles.category}>
          <Text style={styles.categoryname}>위치를 입력해주세요</Text>
          <Text></Text>
          <TouchableOpacity style={styles.searchbtn} onPress={()=>navigation.push('postcode')}>
            <Text style={styles.searchtext}>주소 검색하기</Text>
          </TouchableOpacity>
          {/* <Button title="주소검색하기" onPress={()=>navigation.push('postcode')}/> */}
        </View>
      </View>

      <ScrollView style={styles.list}>
        <Text style={styles.categoryname}>최근 주소</Text>
        <Text></Text>
        {locationList.map((elem, key) => {
          return(
            <TouchableOpacity key = {key} onPress = {()=> {
              Alert.alert(
                "해당 주소로 위치를 설정하시겠습니까?",
                "",
                [
                  { text: "OK", onPress: () => {
                    setUserLocation(elem.name);
                    navigation.navigate('main');
                  }},
                  { text: "cancle", onPress: () => console.log("Ask me later pressed")}
                ]
              );
              
              }}>
              <View style={styles.tq}>
                <View style={styles.tqname}>
                  <Text style={styles.bigText}>{elem.name}</Text>
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
    fontSize:15,
    color:'gray',
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
    borderBottomWidth:1,
    borderBottomColor:'gray',
    paddingBottom:10,
    paddingTop:10
  },
  tqname:{
    marginLeft:15,
    justifyContent:'center',
  },
  searchbtn: {
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:150,
    backgroundColor:'#3498DB',
    borderRadius:5
  },
  searchtext: {
    color:"white",
    fontWeight:'bold',
    fontSize:14
  }
});


export default LocationList;