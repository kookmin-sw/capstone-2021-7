import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, CheckBox, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Menu = () => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.menu}>
        <View style={styles.store}>
            <View style={styles.top}>
                <View>
                    <FontAwesome name="square" size={80} color="#E0E0E0" />
                </View>
                <View style={styles.storename}>
                    <Text style={styles.catename}>지연이네 카테고리1</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="heart-outline" size={40} color="pink" />
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView style={styles.menulist}>
            <View style={styles.tq}>
                <View>
                    <FontAwesome name="square" size={80} color="#E0E0E0" />
                </View>
                <View style={styles.tqname}>
                    <Text style={styles.food}>짜장면</Text>
                    <Text style={styles.price}>5000원</Text>
                </View>
                <CheckBox 
                style={styles.check}
                value={isSelected}
                onValueChange={setSelection}
                ></CheckBox>
            </View>
            <View style={styles.tq}>
                <View>
                    <FontAwesome name="square" size={80} color="#E0E0E0" />
                </View>
                <View style={styles.tqname}>
                    <Text style={styles.food}>짬뽕</Text>
                    <Text style={styles.price}>7000원</Text>
                </View>
                <CheckBox style={styles.check}></CheckBox>
            </View>
        </ScrollView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.order}>주문하기</Text>
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
      flex:0.3,
      paddingTop:30,
      borderBottomColor: "#3498DB",
      borderBottomWidth:5,
      width:'100%',
      alignItems: 'center',
      justifyContent:'center'
  },
  top:{
    flexDirection:'row',
    alignItems:'center',
  //   marginLeft:50,
  },
  storename:{
      marginLeft:20,
      marginRight:50,
      justifyContent:'center'
  },
  catename:{
      fontSize:22,
      fontWeight:'bold'
  },
  menulist: {
      flex:1,
      width:'100%',
      marginLeft:60,
      paddingTop:'5%',
  },
  check:{
      alignSelf:'center',

  },
  button: {
      backgroundColor: "#3498DB",
      borderRadius:5,
      width:400,
      height:55,
      marginBottom:'10%',
      justifyContent:'center',
  },
  order:{
      textAlign:'center',
      color:'white',
      fontSize:20,
      fontWeight:'bold',
  },
  tq:{
      flexDirection:'row',
      padding:7,
      borderBottomColor:'#dbdbdb',
      borderBottomWidth:1,
      width:'85%'
  },  
  tqname:{
    marginLeft:15,
    width:235,
    justifyContent:'center',
  },
  food:{
      fontWeight:'bold',
      fontSize:18,
      marginRight:80
  },
  price:{
      fontSize:15,
      color:"#3498DB",
      lineHeight:20,
  }
});

export default Menu;