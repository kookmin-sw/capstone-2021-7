import React ,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const MyProfile = () => {
  const [isSelected, setSelection] = useState(false);
  const [isSelected2, setSelection2] = useState(false);

  return (
    <View style={styles.myprofile}>
      <Text style={styles.signuptext}>
        <Ionicons name="person-add" size={70} color="#3498DB" />{'\t'}회원가입
      </Text>
      <View>
        <TextInput style={styles.input} placeholder="이름"></TextInput>
        <TextInput style={styles.input} placeholder="생년월일 ( ex: 19980824 )"></TextInput>
        <TextInput style={styles.input} placeholder="아이디"></TextInput>
        <TextInput style={styles.input} placeholder="비밀번호"></TextInput>
        <View style={styles.checks}>
          <CheckBox 
            style={styles.check}
            value={isSelected}
            onValueChange={setSelection}
          >
          </CheckBox><Text style={styles.label}>남자{'\t'}{'\t'}</Text>
          <CheckBox 
            style={styles.check}
            value={isSelected2}
            onValueChange={setSelection2}
          >
          </CheckBox><Text style={styles.label}>여자</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.text}>완료{'\t'}{'\t'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}>
          <Text style={styles.text}>로그인</Text>
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
  signuptext: {
    fontSize: 40,
    fontWeight:'bold',
    color:"#3498DB",
    paddingBottom:50,
  },
  input: {
    borderColor:'#DBDBDB',
    borderWidth:2,
    borderRadius:5,
    marginBottom:15,
    width:300,
    height:50,
  },
  checks: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  check: {
    tintColor:"#3498DB",
    alignSelf: "center"
  },
  buttons: {
    flexDirection:'row',
    marginTop:20,
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
  },
  label:{
    margin:8
  }
});

export default MyProfile;