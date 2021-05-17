import React ,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';

import { RadioButton } from 'react-native-paper';
import { postUserInformation } from '../api/user-api';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const Survey = ({route, navigation}) => {
  const {name, phone, username, password, gender, age} = route.params;

  const [taste, setTaste] = useState("1");
  const [price, setPrice] = useState("1");
  const [amount, setAmount] = useState("1");

  // const callPostUserInformation = async () => {
  //   await postUserInformation(postData)
  //     .then(() => {
  //       navigation.navigate('success');
  //       })
  //     .catch((err) => console.log(err));
  // };

  const inspection = (e) => {
    e.preventDefault();
    if(taste=="" || price=="" || amount==""){
        alert('빈칸에 값을 입력해주세요');
    }
    else if((taste<1 || taste>5) || (price<1 || price>5) || (amount<1 || amount>5)){
        alert('1부터 5까지의 값을 입력해주세요');
    }
    else{
      {
        navigation.navigate('rating', {
          name: name,
          phone: phone,
          username: username,
          password: password,
          gender: gender,
          age: age,
          taste: taste,
          price: price,
          amount: amount
        });
      }
    }
  }
  return(
    <View style={styles.survey}>
        <View style={{alignItems:'center'}}>
          <Text style={styles.labeltext}>
            <MaterialCommunityIcons name="numeric-1-box-multiple" size={25} color="#3498DB" />
            {'\t'}'맛'에 대한 중요도를 점수로 평가해주세요!(1~5점)
          </Text>
          <View style={styles.radiobtn}>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>1점</Text>
              <RadioButton
                value="1"
                color="#3498DB"
                status={ taste === '1' ? 'checked' : 'unchecked' }
                onPress={() => setTaste('1')}
              />
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>2점</Text>
              <RadioButton
                value="2"
                color="#3498DB"
                status={ taste === '2' ? 'checked' : 'unchecked' }
                onPress={() => setTaste('2')}
              />
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>3점</Text>
              <RadioButton
                value="3"
                color="#3498DB"
                status={ taste === '3' ? 'checked' : 'unchecked' }
                onPress={() => setTaste('3')}
              />
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>4점</Text>
              <RadioButton
                value="4"
                color="#3498DB"
                status={ taste === '4' ? 'checked' : 'unchecked' }
                onPress={() => setTaste('4')}
              />
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>5점</Text>
              <RadioButton
                value="5"
                color="#3498DB"
                status={ taste === '5' ? 'checked' : 'unchecked' }
                onPress={() => setTaste('5')}
              />
            </View>
          </View>
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={styles.labeltext}>
            <MaterialCommunityIcons name="numeric-2-box-multiple" size={25} color="#3498DB" />
            {'\t'}'가격'에 대한 중요도를 점수로 평가해주세요!(1~5점)
          </Text>
          <View style={styles.radiobtn}>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>1점</Text>
              <View style={{borderWidth:1}}>
                <RadioButton
                  value="1"
                  color="#3498DB"
                  status={ price === '1' ? 'checked' : 'unchecked' }
                  onPress={() => setPrice('1')}
                />
              </View>
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold', borderRadius:35}}>2점</Text>
              <View style={{borderWidth:1}}>
              <RadioButton
                value="2"
                color="#3498DB"
                status={ price === '2' ? 'checked' : 'unchecked' }
                onPress={() => setPrice('2')}
              />
              </View>
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>3점</Text>
              <View style={{borderWidth:1}}>
              <RadioButton
                value="3"
                color="#3498DB"
                status={ price === '3' ? 'checked' : 'unchecked' }
                onPress={() => setPrice('3')}
              />
              </View>
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>4점</Text>
              <View style={{borderWidth:1}}>
              <RadioButton
                value="4"
                color="#3498DB"
                status={ price === '4' ? 'checked' : 'unchecked' }
                onPress={() => setPrice('4')}
              />
              </View>
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>5점</Text>
              <View style={{borderWidth:1}}>
              <RadioButton
                value="5"
                color="#3498DB"
                status={ price === '5' ? 'checked' : 'unchecked' }
                onPress={() => setPrice('5')}
              />
              </View>
            </View>
          </View>
        </View>
        <View style={{alignItems:'center'}}>
          <Text style={styles.labeltext}>
            <MaterialCommunityIcons name="numeric-1-box-multiple" size={25} color="#3498DB" />
            {'\t'}'양'에 대한 중요도를 점수로 평가해주세요!(1~5점)
          </Text>
          <View style={styles.radiobtn}>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>1점</Text>
              <RadioButton
                value="1"
                color="#3498DB"
                status={ amount === '1' ? 'checked' : 'unchecked' }
                onPress={() => setAmount('1')}
              />
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>2점</Text>
              <RadioButton
                value="2"
                color="#3498DB"
                status={ amount === '2' ? 'checked' : 'unchecked' }
                onPress={() => setAmount('2')}
              />
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>3점</Text>
              <RadioButton
                value="3"
                color="#3498DB"
                status={ amount === '3' ? 'checked' : 'unchecked' }
                onPress={() => setAmount('3')}
              />
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>4점</Text>
              <RadioButton
                value="4"
                color="#3498DB"
                status={ amount === '4' ? 'checked' : 'unchecked' }
                onPress={() => setAmount('4')}
              />
            </View>
            <View style={styles.radiobtn}>
              <Text style={{fontWeight:'bold'}}>5점</Text>
              <RadioButton
                value="5"
                color="#3498DB"
                status={ amount === '5' ? 'checked' : 'unchecked' }
                onPress={() => setAmount('5')}
              />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.btn} onPress={inspection}>
              <Text style={styles.btntext}>다음</Text>
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
  inputs: {
    borderColor:'#DBDBDB',
    borderWidth:2,
    borderRadius:5,
    marginBottom:20,
    marginTop:30,
    width:300,
    height:50,
  },
  btn: {
    borderColor:"#3498DB",
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    backgroundColor:"#3498DB",
    borderRadius:5,
    padding:10,
    margin:10,
    width:300,
    height:50
  },
  labeltext: {
    color:"#3498DB",
    fontWeight:'bold', 
    fontSize: 15
  },
  btntext: {
    color:'white', 
    fontWeight:'bold', 
    fontSize: 18
  },
  radiobtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:5,
    marginBottom:10
  }
});

export default Survey;