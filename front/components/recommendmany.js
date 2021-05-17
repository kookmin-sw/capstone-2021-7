import React, { useState } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const RecommendMany = ({navigation}) => {
  return (
    <View style ={styles.multi}>
      <View style={styles.top}>
        <FontAwesome5 style={{marginBottom:'10%'}} name="thumbs-up" size={70} color="#3498DB" />
      </View>
      <View style={{flex:3}}>
        <View style={styles.listone}>
          <FontAwesome name="circle" size={180} color="#E0E0E0" />
          <Text style={{padding:15}}></Text>
          <FontAwesome name="circle" size={180} color="#E0E0E0" />
          {/* <Image source={{ uri: item.img }} style={{ width:40, height:40, marginBottom:5 }} /> */}
        </View>
        <View style={styles.listtwo}>
          <FontAwesome name="circle" size={180} color="#E0E0E0" />
          <Text style={{padding:15}}></Text>
          <FontAwesome name="circle" size={180} color="#E0E0E0" />
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
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginTop:'15%',
    marginBottom:'15%',
    borderBottomColor:'#3498DB',
    borderBottomWidth:5,
    width:350
  },
  listone:{
    flexDirection:'row',
  },
  listtwo:{
    flexDirection:'row',
  },
});

export default RecommendMany;