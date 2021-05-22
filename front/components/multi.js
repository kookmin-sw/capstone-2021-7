import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { checkPhone } from '../api/user-api';
import { getRecommendCategoryMany } from '../api/user-api';

const Multi = ({navigation}) => {

  const [phone, setPhone] = useState("");
  const [phoneList, setPhoneList] = useState([]);

  const addNumber = async () => {
    if(phone===""){
       alert('번호를 입력해주세요')
    }
    else if(phoneList.includes(phone)){
      alert('이미 추가한 번호입니다')
    }
    else{
      await checkPhone({
        phone: phone
      })
      .then((result) => {
        alert('존재하지 않는 사용자입니다')
      })
      .catch((err) => {
        if(err.response.data.message==='해당 전화번호가 이미 존재합니다.'){
          setPhoneList(phoneList => [...phoneList, phone]);
          setPhone("")
        }
      });    
    }
  }


  const postData = {
    phoneList: phoneList
  };

  const callGetRecommendCategoryMany = async () =>{
    if (phoneList.length < 1){
      alert('인원이 부족합니다');
    }
    else {
      await getRecommendCategoryMany(postData)
      .then((result) => {
        console.log(postData);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        alert('알수없는 오류가 발생했습니다');
      });
    }
  }

  return (
    <View style ={styles.multi}>
      <View style={{flex:0.5}}></View>
      <Ionicons style={{marginBottom:'5%'}} name="people" size={80} color="#3498DB" />
      <Text style={{fontWeight:'bold', fontSize:15}}>함께 추천 받을 유저의 전화번호를 입력하세요</Text>
      <View style={styles.input}>
        <MaterialCommunityIcons name="cellphone-basic" size={50} color="#3498DB" />
        <TextInput style={styles.textinput} value={phone} onChangeText={text => setPhone(text)} placeholder=" ex) 01012345678"></TextInput>
        <TouchableOpacity onPress={addNumber}>
          <FontAwesome5 name="plus" size={20} color="#3498DB" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop:'7%'}}>
        {phoneList.map((elem, key)=>{
          return (
            <View key={key} style={{flexDirection: "row"}}>
              <Text  style={styles.list}>{elem}</Text>
              <View style={styles.number}>
                <TouchableOpacity onPress={()=>{
                  Alert.alert(
                    "Fooday",
                    "목록에서 선택한 번호가 지워집니다",
                    [
                      { text: "삭제", onPress: () => {
                        setPhoneList(phoneList.filter(item => item !== elem));
                      }},
                      { text: "취소", style: "cancel", onPress: () => console.log("취소")}
                    ]
                  );
                }}>
                  <AntDesign name="delete" size={18} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
          )
        })}
      </ScrollView>
      <TouchableOpacity style={styles.btn} onPress={()=>callGetRecommendCategoryMany()}>
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
    marginRight:20
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