import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';


import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { getSmallCategory } from '../api/rating-api';

const Rating = ({route, navigation}) => {
  
  const {name, phone, username, password, gender, taste, price, amount} = route.params;

  const [smallCategory , setSmallCategory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const callGetSmallCategory = async () => {
    await getSmallCategory()
      .then((result) => {
        setSmallCategory(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callGetSmallCategory();
  },[]);

  const onClick = (item) => {
    console.log(item.id);
  }

  const postData = {name: name, phone: phone, username: username, password: password, gender: gender, taste: taste, price: price, amount: amount};

  const print = () =>{
    console.log('ok')
  }
  const renderSmallCategory = ({ item }) => {
    // console.log(item);
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 15,
        }}
      >
        <TouchableOpacity onPress={() => { onClick(item) }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <FontAwesome name="circle" size={72} color="#E0E0E0" />
            {/* <Image source={{ uri: item.src }} style={styles.tinyImage} /> */}
            <View style={{ width: 60 }}>
              <Text style={{ textAlign: "center" }}>{item.name} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      );
    }

    return (
      <View style ={styles.rating}>
        <View style ={styles.top}>
          <Text style={styles.title}>카테고리 중 5개 이상을 골라 점수를 입력해주세요!</Text>
          <Text style={styles.sub}>
            평가는 1점에서 5점 사이만 가능합니다
            <FontAwesome5 name="smile" size={20} color="#3498DB" />
          </Text>
        </View>
        <View style={styles.flat}>
          <FlatList
            data={smallCategory}
            renderItem={renderSmallCategory}
            style={{ margin: 20 }}
            keyExtractor={(item) => item.id.toString()} 
            numColumns={4}
            key={4}
          />
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Hello World!</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.btn}>
          <Text style={styles.btntext}>완료</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  rating: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top : {
    flex: 0.4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },
  title: {
    color: "#3498DB",
    fontWeight: 'bold',
    fontSize:18,
  },
  sub: {
    color: "#3498DB",
    fontWeight: 'bold',
    fontSize:15,
    marginTop:5,
  },
  flat: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 5,
    borderTopColor: "#3498DB",
  },
  btn: {
    borderColor:"#3498DB",
    justifyContent:'center',
    alignItems:'center',
    borderWidth:2,
    backgroundColor:"#3498DB",
    borderRadius:5,
    padding:10,
    margin:10,
    width:350,
    height:50
  },
  btntext: {
    color:'white', 
    fontWeight:'bold', 
    fontSize: 18
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Rating;