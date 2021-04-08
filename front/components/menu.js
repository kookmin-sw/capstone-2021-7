import React from 'react';
import { StyleSheet, Text, View, CheckBox, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Menu = () => {
  return (
    <View style={styles.menu}>
        <View style={styles.store}>
            <Text>
                <FontAwesome name="square" size={70} color="#E0E0E0" />지연이네 카테고리1
                <Ionicons name="heart-outline" size={24} color="pink" />
            </Text>
        </View>
        <View style={styles.menulist}>
            <Text style={styles.one}>
                <FontAwesome name="square" size={70} color="#E0E0E0" />짜장면          
                <CheckBox style={styles.check}></CheckBox>
            </Text>
            <Text>
                <FontAwesome name="square" size={70} color="#E0E0E0" />짬뽕          
                <CheckBox style={styles.check}></CheckBox>
            </Text>
            <Text>
                <FontAwesome name="square" size={70} color="#E0E0E0" />탕수육          
                <CheckBox style={styles.check}></CheckBox>
            </Text>
            <Text>
                <FontAwesome name="square" size={70} color="#E0E0E0" />팔보채          
                <CheckBox style={styles.check}></CheckBox>
            </Text>
            <Text>
                <FontAwesome name="square" size={70} color="#E0E0E0" />유산슬          
                <CheckBox style={styles.check}></CheckBox>
            </Text>
        </View>
        <TouchableOpacity>
          <Text>주문하기</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  store: {
      borderBottomColor: "#3498DB",
      borderBottomWidth:5,
      alignItems: 'center',
      justifyContent:'center'
  },
  menulist: {
      
  },
  one: {

  },
  check:{
      alignSelf:'center',
  }
});

export default Menu;