import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Multi = ({navigation}) => {
  return (
    <View style ={styles.multi}>
      <Text style={{fontWeight:'bold', fontSize:15}}>함께 추천 받을 유저의 전화번호를 입력하세요</Text>
      <View style={styles.input}>
        <MaterialCommunityIcons name="cellphone-basic" size={55} color="#3498DB" />
        <TextInput style={styles.textinput} placeholder=" ex) 01012345678"></TextInput>
      </View>
 
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
    textAlign:'center'
  },
  input:{
    flexDirection:'row', 
    justifyContent:'center',
    alignItems:'center',
    marginTop:'5%'
  }
});

export default Multi;