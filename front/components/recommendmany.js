import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const RecommendMany = ({navigation}) => {
  return (
    <View style ={styles.multi}>
      <View style={styles.top}>
        <FontAwesome5 name="thumbs-up" size={50} color="#3498DB" />
      </View>
      <View style={{flex:3}}>
        <View style={styles.listone}>
          <FontAwesome name="circle" size={150} color="#E0E0E0" />
          <Text style={{padding:10}}></Text>
          <FontAwesome name="circle" size={150} color="#E0E0E0" />
          {/* <Image source={{ uri: item.img }} style={{ width:40, height:40, marginBottom:5 }} /> */}
        </View>
        {/* <View style={{flexDirection:'row'}}>
          <Text style={{ textAlign: "center" }}>카테고리1</Text>
        </View> */}
        <View style={styles.listtwo}>
          <FontAwesome name="circle" size={150} color="#E0E0E0" />
          <Text style={{padding:10}}></Text>
          <FontAwesome name="circle" size={150} color="#E0E0E0" />
          {/* <Image source={{ uri: item.img }} style={{ width:40, height:40, marginBottom:5 }} /> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  multi: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent:'center',
  },
  top: {
    flex:0.5,
    alignItems:'center',
    justifyContent:'center',
    marginTop:'15%',
    marginBottom:'15%',
    borderBottomColor:'#3498DB',
    borderBottomWidth:5,
    width:300
  },
  listone:{
    flexDirection:'row',
  },
  listtwo:{
    flexDirection:'row',
  },
});

export default RecommendMany;