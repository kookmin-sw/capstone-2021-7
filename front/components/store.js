import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
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

      <ScrollView style={styles.list}>
        <TouchableOpacity>
          <View style={styles.tq}>
            <View>
              <FontAwesome name="square" size={80} color="#E0E0E0" />
            </View>
            <View style={styles.tqname}>
              <Text style={styles.bigText}>지연이네 카테고리1</Text>
              <Text style={styles.smallText}>지연이의 지성, 지연이의 미모</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.tq}>
            <View>
              <FontAwesome name="square" size={80} color="#E0E0E0" />
            </View>
            <View style={styles.tqname}>
              <Text style={styles.bigText}>은솔이네 카테고리1</Text>
              <Text style={styles.smallText}>은솔이의 지성, 은솔이의 미모</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.tq}>
            <View>
              <FontAwesome name="square" size={80} color="#E0E0E0" />
            </View>
            <View style={styles.tqname}>
              <Text style={styles.bigText}>종민이네 카테고리1</Text>
              <Text style={styles.smallText}>종민이의 지성, 종민이의 미모</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.tq}>
            <View>
              <FontAwesome name="square" size={80} color="#E0E0E0" />
            </View>
            <View style={styles.tqname}>
              <Text style={styles.bigText}>유미네 카테고리1</Text>
              <Text style={styles.smallText}>유미의 지성, 유미의 미모</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.tq}>
            <View>
              <FontAwesome name="square" size={80} color="#E0E0E0" />
            </View>
            <View style={styles.tqname}>
              <Text style={styles.bigText}>달콩이네 카테고리1</Text>
              <Text style={styles.smallText}>달콩이의 지성, 달콩이의 미모</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.tq}>
            <View>
              <FontAwesome name="square" size={80} color="#E0E0E0" />
            </View>
            <View style={styles.tqname}>
              <Text style={styles.bigText}>서리네 카테고리1</Text>
              <Text style={styles.smallText}>서리의 지성, 서리의 미모</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.tq}>
            <View>
              <FontAwesome name="square" size={80} color="#E0E0E0" />
            </View>
            <View style={styles.tqname}>
              <Text style={styles.bigText}>모찌네 카테고리1</Text>
              <Text style={styles.smallText}>모찌의 지성, 모찌의 미모</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
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
    flex:0.5,
    marginTop:30,
    borderBottomColor:"#3498DB",
    borderBottomWidth:5,
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    flexDirection:'row',
  },
  list: {
    flex:5,
    paddingTop:'10%',
    width:'100%',
    paddingLeft:'20%',
  },
  category: {
    fontSize:28,
    fontWeight:'bold',
  },
  // feedback:{
  // }
  bigText:{
    fontSize:20,
    fontWeight:'bold',
  },
  smallText:{
    fontSize:15,
    fontWeight:'bold',
    color:'#3498DB',
  },
  feedtext: {
    fontSize:15,
    fontWeight:"bold",
    color:'#898989'
  },
  tq: {
    flexDirection:'row',
  },
  tqname:{
    marginLeft:15,
    justifyContent:'center',
  }
});

export default Store;