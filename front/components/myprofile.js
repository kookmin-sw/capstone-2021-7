import React ,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { RadioButton } from 'react-native-paper';

const MyProfile = ({navigation}) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("")

  //검증 및 유효성 검사
  const inspection = (e) => {
    e.preventDefault();

    if(name=="" || phone=="" || username=="" || password=="" || age=="")
    {
      alert('빈칸에 값을 입력해주세요');
      return;
    }
    //나이 두자릿수
    else if(age<10 || age>99){
      alert('나이가 올바르지 않습니다.');
      return;
    }
    //번호 중복 검사
    //아이디 중복 검사
    else {
      {
        navigation.navigate('survey', {
          name: name,
          phone: phone,
          username: username,
          password: password,
          gender: gender
        });
      }
    }
  }
  
  return (
    <View style={styles.myprofile}>
      <View style={styles.top}>
        <Text style={styles.signuptext}>
          <Ionicons name="person-add" size={60} color="#3498DB" />{'\t'}회원가입
        </Text>
      </View>
      <View style={styles.inputs}>
        <TextInput value={name} style={styles.input} onChangeText={text => setName(text)} placeholder=" 이름"></TextInput>
        <TextInput value={phone} style={styles.input} onChangeText={text => setPhone(text)} placeholder=" 번호 ( ex: 01012345678 )"></TextInput>
        <TextInput value={username} style={styles.input} onChangeText={text => setUsername(text)} placeholder=" 아이디"></TextInput>
        <TextInput value={password} style={styles.input} onChangeText={text => setPassword(text)} placeholder=" 비밀번호"></TextInput>
        <TextInput value={age} style={styles.input} onChangeText={text => setAge(text)} placeholder=" 나이 ( ex: 24 )"></TextInput>
        <View style={styles.radiobtn}>
          <View style={styles.radiobtn}>
            <Text>남자</Text>
            <RadioButton
              value="male"
              color="#3498DB"
              status={ gender === 'male' ? 'checked' : 'unchecked' }
              onPress={() => setGender('male')}
            />
          </View>
          <View style={styles.radiobtn}>
            <Text>여자</Text>
            <RadioButton
              value="female"
              color="#3498DB"
              status={ gender === 'female' ? 'checked' : 'unchecked' }
              onPress={() => setGender('female')}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
         style={styles.button1}
         onPress={inspection}
         >
          <Text style={styles.text}>다음</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button2}
        onPress={()=> navigation.navigate('login')}
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
  top: {
    flex:1,
    justifyContent:'center',
    textAlign:'center',
    marginTop:'15%'
  },
  signuptext: {
    fontSize: 40,
    fontWeight:'bold',
    color:"#3498DB",
    paddingBottom:50,
  },
  inputs: {
    flex:4,
    justifyContent:'center',
    textAlign:'center'
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
    padding:15,
    margin:10,
    width:100,
  },
  button2: {
    borderColor:"#3498DB",
    justifyContent:'center',
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
  },
  radiobtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:25,
    marginRight:30
  }
});

export default MyProfile;