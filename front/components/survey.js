import React ,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';

import { postUserInformation } from '../api/user-api';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Survey = ({route, navigation}) => {
  const {name, phone, username, password, gender} = route.params;

  const [taste, setTaste] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const onChangeTaste = e => {
    setTaste(e.target.value);
  }
  const onChangePrice = e => {
    setPrice(e.target.value);
  }
  const onChangeAmount = e => {
    setAmount(e.target.value);
  }

  const postData = {name: name, phone: phone, username: username, password: password, gender: gender, taste: taste, price: price, amount: amount};
  const callPostUserInformation = async () => {
    await postUserInformation(postData)
      .then(() => {
        navigation.navigate('success');
        })
      .catch((err) => console.log(err));
  };

  const inspection = (e) => {
    e.preventDefault();
    if(taste=="" || price=="" || amount==""){
        alert('빈칸에 값을 입력해주세요');
    }
    else if((taste<1 || taste>5) || (price<1 || price>5) || (amount<1 || amount>5)){
        alert('1부터 5까지의 값을 입력해주세요');
    }
    else callPostUserInformation();
  }
  return(
    <View style={styles.survey}>
        <View>
          <MaterialCommunityIcons name="numeric-1-box-multiple" size={24} color="#3498DB" />
          <Text>'맛'에 대한 중요도를 점수로 평가해주세요!(1~5점)</Text>
          <TextInput  style={{borderWidth:1}} value={taste} placeholder="ex)5" onChangeText={text => setTaste(text)}></TextInput>
        </View>
        <View>
          <MaterialCommunityIcons name="numeric-2-box-multiple" size={24} color="#3498DB" />
          <Text>'가격'에 대한 중요도를 점수로 평가해주세요!(1~5점)</Text>
          <TextInput style={{borderWidth:1}} value={price} placeholder="ex)5" onChangeText={text => setPrice(text)}></TextInput>
        </View>
        <View>
          <MaterialCommunityIcons name="numeric-3-box-multiple" size={24} color="#3498DB" />
          <Text>'양'에 대한 중요도를 점수로 평가해주세요!(1~5점)</Text>
          <TextInput style={{borderWidth:1}} value={amount} placeholder="ex)5" onChangeText={text => setAmount(text)}></TextInput>
        </View>
        <View>
          <TouchableOpacity onPress={inspection}>
              <Text>완료</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  survey: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Survey;