import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const Choose = ({navigation}) => {
  return (
    <View style ={styles.choose}>
      <View style={styles.likemodal}>
        <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('음식 추천')}>
          <Ionicons style={{marginRight:20}} name="person" size={33} color="white" />
          <Text style={styles.btntext}>개인 추천 받기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={()=> navigation.navigate('sorry')}>
          <Ionicons style={{marginRight:20}} name="people" size={40} color="white" />
          <Text style={styles.btntext}>다수 추천 받기</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  choose: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likemodal: {
    backgroundColor:'white',
    borderRadius:10,
    padding:'10%',
    height:'40%',
    alignItems:'center',
    justifyContent:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btn:{
    flexDirection:'row',
    backgroundColor:"#3498DB",
    width:200,
    height:50,
    borderRadius:3,
    alignItems:'center',
    justifyContent:'center',
    marginTop:'2.5%',
    marginBottom:'5%'
  },
  btntext:{
    color:'white',
    fontSize:15,
    fontWeight:'bold',
  }
});

export default Choose;