import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Foundation } from '@expo/vector-icons';

const Multi = ({navigation}) => {
  return (
    <View style ={styles.multi}>
      <Text style={{fontWeight:'bold'}}>함께 추천 받을 유저의 전화번호를 입력하세요</Text>
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
});

export default Multi;