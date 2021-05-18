import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Multi = ({navigation}) => {

  const [phone, setPhone] = useState("");
  const [phoneList, setPhoneList] = useState([]);

  const del = () => {
    Alert.alert(
      "Fooday",
      "목록에서 선택한 번호가 지워집니다",
      [
        { text: "취소", style: "cancel", onPress: () => console.log("취소") },
        { text: "삭제", onPress: () => console.log("삭제") }
      ]
    );
  }

  return (
    <View style ={styles.multi}>
      <View style={{flex:0.5}}></View>
      <Ionicons style={{marginBottom:'5%'}} name="people" size={80} color="#3498DB" />
      <Text style={{fontWeight:'bold', fontSize:15}}>함께 추천 받을 유저의 전화번호를 입력하세요</Text>
      <View style={styles.input}>
        <MaterialCommunityIcons name="cellphone-basic" size={50} color="#3498DB" />
        <TextInput style={styles.textinput} value={phone} onChangeText={text => setPhone(text)} placeholder=" ex) 01012345678"></TextInput>
        <TouchableOpacity onPress={console.log(phone)}>
          <FontAwesome5 name="plus" size={20} color="#3498DB" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop:'7%'}}>
        <View style={styles.number}>
          <Text style={styles.list}>01074230824</Text>
          <TouchableOpacity onPress={del}>
            <AntDesign name="delete" size={18} color="gray" />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.number}>
          <Text style={styles.list}>01082828282</Text>
          <AntDesign name="delete" size={18} color="gray" />
        </View>
        <View style={styles.number}>
          <Text style={styles.list}>01012345678</Text>
          <TouchableOpacity>
            <AntDesign name="delete" size={18} color="gray" />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('recommendmany')}>
        <Text style={{fontSize:18, color:'white', fontWeight:'bold'}}>추천받기</Text>
      </TouchableOpacity>
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
  textinput:{
    borderBottomWidth:5,
    borderColor:"#3498DB",
    width:200,
    alignItems:"center",
    justifyContent:'center',
    marginTop:'5%',
    textAlign:'center',
    fontSize:15,
  },
  input:{
    flexDirection:'row', 
    justifyContent:'center',
    alignItems:'center',
    marginTop:'5%'
  },
  list: {
    fontSize:15,
    color:'gray',
    fontWeight:'bold',
    marginRight:20,
    borderBottomColor:'gray',
    borderBottomWidth:2,
  },
  number: {
    flexDirection:'row',
    marginBottom:20,
  },
  btn: {
    backgroundColor:"#3498DB",
    height:50,
    width:250,
    marginBottom:'10%',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default Multi;