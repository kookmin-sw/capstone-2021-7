import React ,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const MyProfile = ({navigation}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const onChangeName = e => {
    setName(e.target.value);
  }
  const onChangePhone = e => {
    setPhone(e.target.value);
  }
  const onChangeUsername = e => {
    setUsername(e.target.value);
  }
  const onChangePassword = e => {
    setPassword(e.target.value);
  }
  const onChangeGender = e => {
    setGender(e.target.value);
  }


  //검증 및 유효성 검사
  const inspection = (e) => {
    e.preventDefault();

    if(name=="" || phone=="" || username=="" || password=="" || gender=="")
    {
      alert('빈칸에 값을 입력해주세요');
      return;
    }
    else {
      navigation.navigate('survey');
      
      console.log({
        name,
        phone,
        username,
        password,
        gender
      });
    }
  }
  
  return (
    <View style={styles.myprofile}>
      <Text style={styles.signuptext}>
        <Ionicons name="person-add" size={70} color="#3498DB" />{'\t'}회원가입
      </Text>
      <View>
        <TextInput value={name} style={styles.input} onChange={onChangeName} placeholder="이름"></TextInput>
        <TextInput value={phone} style={styles.input} onChange={onChangePhone} placeholder="번호 ( ex: 01012345678 )"></TextInput>
        <TextInput value={username} style={styles.input} onChange={onChangeUsername} placeholder="아이디"></TextInput>
        <TextInput value={password} style={styles.input} onChange={onChangePassword} placeholder="비밀번호"></TextInput>
        <TextInput value={gender} style={styles.input} onChange={onChangeGender} placeholder="성별 ( ex: 남 )"></TextInput>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
         style={styles.button1}
         onPress={inspection}
         >
          <Text style={styles.text}>완료{'\t'}{'\t'}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button2}
        onPress={()=>navigation.navigate('login')}
        >
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