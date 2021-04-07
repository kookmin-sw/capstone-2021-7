import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { color } from 'react-native-reanimated';

const Store = () => {
  return (
    <View style={styles.store}>
      <View style={styles.top}>
        <Text style={styles.category}>
          <FontAwesome name="circle" size={120} color="#E0E0E0"/>{'\n'}카테고리1{'\t'}{'\t'}
        </Text>
        <Text style={styles.feedback}>
          <TouchableOpacity>
            <Text style={styles.feedtext}>
              <FontAwesome5 name="thumbs-up" size={24} color="blue" />이 추천 좋아요{'\n'}
            </Text>
          </TouchableOpacity>{'\n'}
          <TouchableOpacity>
            <Text style={styles.feedtext}>
              <FontAwesome5 name="thumbs-down" size={24} color="red" /> 이 추천 별로예요
            </Text>
          </TouchableOpacity>
        </Text>
      </View>

      <View style={styles.list}>
        <TouchableOpacity>
          <Text style={styles.text}>
            <FontAwesome name="square" size={70} color="#E0E0E0" />{'\t'}지연이네 카테고리1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>
            <FontAwesome name="square" size={70} color="#E0E0E0" />{'\t'}은솔이네 카테고리1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>
            <FontAwesome name="square" size={70} color="#E0E0E0" />{'\t'}종민이네 카테고리1
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>
            <FontAwesome name="square" size={70} color="#E0E0E0" />{'\t'}유미네 카테고리1
          </Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  store: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    paddingTop:'10%',
    flex:1,
    borderBottomColor:"#3498DB",
    borderBottomWidth:5,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    flexDirection:'row',
  },
  list: {
    flex:2,
    paddingTop:'10%',
  },
  category: {
    fontSize:28,
    fontWeight:'bold',
  },
  // feedback:{
  // }
  text: {
    fontSize:20,
    fontWeight:'bold',
    textAlign:'justify',
    
  },
  feedtext: {
    fontSize:15,
    fontWeight:"bold",
    color:'#898989'
  }
});

export default Store;