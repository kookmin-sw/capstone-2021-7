import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  return (
    <View style={styles.myprofile}>
      <Text style={styles.signintext}>
        <Ionicons name="person" size={70} color="#3498DB" />{'\t'}로그인
      </Text>
      <View>
        <TextInput style={styles.input} placeholder=" 아이디"></TextInput>
        <TextInput style={styles.input}placeholder=" 비밀번호"></TextInput>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.text}>완료{'\t'}{'\t'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.text}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myprofile: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signintext: {
    fontSize: 40,
    fontWeight:'bold',
    color:"#3498DB",
    paddingBottom:50
  },
  input: {
    borderColor:'#DBDBDB',
    borderWidth:2,
    borderRadius:5,
    marginBottom:15,
    width:300,
    height:50,
  },
  buttons: {
    flexDirection:'row',
  },
  button1: {
    borderColor:"#3498DB",
    borderWidth:2,
    backgroundColor:"#3498DB",
    borderRadius:5,
    padding:10,
    margin:10,
    width:100,
  },
  button2: {
    borderColor:"#3498DB",
    borderWidth:2,
    backgroundColor:"#3498DB",
    borderRadius:5,
    padding:10,
    margin:10,
    width:180
  },
  text:{
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
  }
});

export default Login;