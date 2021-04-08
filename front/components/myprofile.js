import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const MyProfile = () => {
  return (
    <View style={styles.myprofile}>
      <Text style={styles.signintext}>
        <Ionicons name="person-add" size={70} color="#3498DB" />{'\t'}회원가입
      </Text>
      <View style={styles.input}>
        <TextInput placeholder="이름"></TextInput>
        <TextInput placeholder="생년월일 ( ex: 19980824 )"></TextInput>
        <TextInput placeholder="아이디"></TextInput>
        <TextInput placeholder="비밀번호"></TextInput>
        <View style={styles.check}>
          <CheckBox></CheckBox><Text>남자    </Text>
          <CheckBox></CheckBox><Text>여자</Text>
        </View>
        
        
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <Text>완료{'\t'}{'\t'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>로그인</Text>
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
    color:"#3498DB"
  },
  input: {

  },
  button: {
    flexDirection:'row'
  },
  check: {
    flexDirection:'row'
  }
});

export default MyProfile;