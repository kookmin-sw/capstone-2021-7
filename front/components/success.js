import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

const Success = ({navigation}) => {
  return (
      <View style={styles.success}>
          <FontAwesome5 name="check-circle" size={72} color="#3498DB" />
          <Text style={styles.text}>회원가입이 완료되었습니다.</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('login')} style={styles.btn}>
              <Text style={styles.text2}>로그인하기</Text>
          </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
    success:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:22,
        color:"#3498DB",
        fontWeight:'bold',
        marginTop:20,
        marginBottom:50
    },
    text2:{
        fontSize:18,
        color:"white",
        fontWeight:'bold',
    },
    btn:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3,
        borderWidth:1,
        borderColor:"#3498DB",
        width:200,
        height:50,
        backgroundColor:"#3498DB",
    }
});

export default Success;