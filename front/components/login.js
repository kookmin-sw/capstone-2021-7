import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const Login = () => {
  return (
    <View style={styles.myprofile}>
      <Text style={styles.signintext}>
        <Ionicons name="person" size={70} color="#3498DB" />{'\t'}로그인
      </Text>
      <View style={styles.input}>
        <TextInput placeholder="아이디"></TextInput>
        <TextInput placeholder="비밀번호"></TextInput>
      </View>
      <View style={styles.button}>
        <TouchableOpacity>
          <Text>완료{'\t'}{'\t'}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>회원가입</Text>
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
});

export default Login;