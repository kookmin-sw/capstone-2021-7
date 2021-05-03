import React ,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, CheckBox } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
const Survey = ({navigation}) => {

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

    // print = (e) => {
    //     e.preventDefault();

    //     console.log({
    //         name,
    //         phone,
    //         username,
    //         password,
    //         gender
    //       });
    // }
    return(
        <View style={styles.survey}>
            <Text>
                <MaterialCommunityIcons name="numeric-1-box-multiple" size={24} color="#3498DB" />
                '맛'에 대한 중요도를 점수로 평가해주세요!(1~5점)
                {'\n'}<TextInput value={taste} placeholder="ex)5" onChange={onChangeTaste}></TextInput>{'\n'}
                <MaterialCommunityIcons name="numeric-2-box-multiple" size={24} color="#3498DB" />
                '가격'에 대한 중요도를 점수로 평가해주세요!(1~5점)
                {'\n'}<TextInput value={price} placeholder="ex)5" onChange={onChangePrice}></TextInput>{'\n'}
                <MaterialCommunityIcons name="numeric-3-box-multiple" size={24} color="#3498DB" />
                '양'에 대한 중요도를 점수로 평가해주세요!(1~5점)
                {'\n'}<TextInput value={amount} placeholder="ex)5" onChange={onChangeAmount}></TextInput>
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('login')}>
                <Text>완료</Text>
            </TouchableOpacity>
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