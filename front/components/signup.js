import React ,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button,ScrollView } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { RadioButton } from 'react-native-paper';

import Loader from './loader';

import { checkUserName, checkPhone } from '../api/user-api';

const SignUp = ({navigation}) => {
  const [animating, setAnimating] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword, setCheckPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("")

  const callCheckUserName = async () => {
    await checkUserName({
      username: username
    })
    .then((result) => {
      setCheckId(true)
    })
    .catch((err)=>{
      if(err.response.data.message==='해당 아이디가 이미 존재합니다.'){
        setCheckId(false);
      }})
  }
  
  const callCheckPhone = async () => {
    await checkPhone({
      phone: phone
    })
    .then((result) => {
      setCheckNumber(true);
    })
    .catch((err) => {
      if(err.response.data.message==='해당 전화번호가 이미 존재합니다.'){
        setCheckId(false);
      }
    });
  }

  const inspection = async () => {
    let success = true;
    if (name=="" || phone=="" || username=="" || password=="" || age==""){
      alert('빈칸에 값을 입력하세요')
      return;
    }

    await checkUserName({
      username: username
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch((err)=>{
      if(err.response.data.message==='해당 아이디가 이미 존재합니다.'){
        alert('이미사용중인 아이디입니다');
        success = false;
    }})

    if (success ===false ){
      return;
    }
  
    await checkPhone({
      phone: phone
    })
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      if(err.response.data.message==='해당 전화번호가 이미 존재합니다.'){
        alert('이미등록된 번호입니다.')
        success= false;
      }
    });

    if (success ===false ){
      return;
    }
  
    //비밀번호 확인 일치여부
    if(password!=checkpassword){
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    //나이 두자릿수
    if(age<10 || age>99){
      alert('나이가 올바르지 않습니다.');
      return;
    }

    
    navigation.navigate('survey', {
      name: name,
      phone: phone,
      username: username,
      password: password,
      age: age,
      gender: gender
    });
    
  }
  
  return (
    <ScrollView style={{flex:1}}>
      <View style={styles.myprofile}>

        <View style={styles.top}>
          <Text style={styles.signuptext}>
            <Ionicons name="person-add" size={60} color="#3498DB" />{'\t'}회원가입
          </Text>
        </View>

        <View style={styles.inputs}>
          <TextInput value={name} style={styles.input} onChangeText={text => setName(text)} placeholder=" 이름"></TextInput>
          <TextInput value={phone} style={styles.input} keyboardType="number-pad" onChangeText={text => setPhone(text)} placeholder=" 번호 ( ex: 01012345678 )"></TextInput>
          <TextInput value={username} style={styles.input} returnKeyType="next" onChangeText={text => setUsername(text)} placeholder=" 아이디"></TextInput>
          <TextInput secureTextEntry={true} value={password} style={styles.input} onChangeText={text => setPassword(text)} placeholder=" 비밀번호"></TextInput>
          <TextInput secureTextEntry={true} value={checkpassword} style={styles.input} onChangeText={text => setCheckPassword(text)} placeholder=" 비밀번호 확인"></TextInput>
          <TextInput value={age} style={styles.input} onChangeText={text => setAge(text)} placeholder=" 나이 ( ex: 24 )"></TextInput>
          <View style={styles.radiobtn}>
            <View style={styles.radiobtn}>
              <Text>남자 </Text>
              <View style={{borderWidth:1, borderRadius:35}}>
              <RadioButton
                value="male"
                color="#3498DB"
                status={ gender === 'male' ? 'checked' : 'unchecked' }
                onPress={() => setGender('male')}
              />
              </View>
            </View>
            <View style={styles.radiobtn}>
              <Text>여자 </Text>
              <View style={{borderWidth:1, borderRadius:35}}>
              <RadioButton
                value="female"
                color="#3498DB"
                status={ gender === 'female' ? 'checked' : 'unchecked' }
                onPress={() => setGender('female')}
              />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
          style={styles.button}
          onPress={() => {
            inspection();
          }}>
            <Text style={styles.text}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  myprofile: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex:1,
    justifyContent:'center',
    textAlign:'center',
    marginTop:'5%',
  },
  signuptext: {
    fontSize: 40,
    fontWeight:'bold',
    color:"#3498DB",
    paddingBottom:50,
  },
  inputs: {
    flex:5,
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
    flex:1,
    flexDirection:'row',
    marginTop:20,
  },
  button: {
    borderColor:"#3498DB",
    borderWidth:2,
    backgroundColor:"#3498DB",
    borderRadius:5,
    padding:15,
    margin:10,
    width:300,
  },
  text:{
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center',
    color:'white',
  },
  radiobtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:25,
    marginRight:30
  }
});

export default SignUp;