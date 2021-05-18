import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, Modal, ScrollView, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { getSmallCategory } from '../api/rating-api';
import { signup } from '../api/user-api';

const Rating = ({route}) => {

  const navigation = useNavigation();

  const {name, phone, username, password, gender, age, taste, price, amount} = route.params;

  const [smallCategory , setSmallCategory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [postList, setPostList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [checkedItem, setCheckedList] = useState([]);
  const [clickedItem , setClickedItem] = useState(9999);

  const callGetSmallCategory = async () => {
    await getSmallCategory()
      .then((result) => {
        setSmallCategory(result.data);
      })
      .catch((err) => console.log(err));
  };

  const handdleClick = (val) => {
    if (eventList.includes(clickedItem.id)) {
      setEventList(eventList.filter(item => item !== clickedItem.id));
      setCheckedList(checkedItem.filter(item => item.obj.id !== clickedItem.id));
      setPostList(postList.filter(item => item[0] !== clickedItem.id));
    }
    setEventList(eventList => [...eventList, clickedItem.id]);
    setCheckedList(checkedItem => [...checkedItem, {obj:clickedItem, val:val}]);
    setPostList(postList => [...postList, [clickedItem.id,val]]);
    setModalVisible(!modalVisible);
    setClickedItem(9999);
  }

  useEffect(() => {
    callGetSmallCategory();
  },[]);

  const aboutModal = () => {
    console.log("클릭된게 뭐야??",clickedItem);
    console.log(eventList);
    if (eventList.includes(clickedItem.id)){
      Alert.alert(
        "이미 평가한 카테고리입니다.",
        "다시 평가하시겠습니까?",
        [
          { text: "OK", onPress: () => setModalVisible(!modalVisible)},
          { text: "cancle", onPress: () => {console.log("Ask me later pressed"),setClickedItem(9999);}}

        ]
      );
    }else {
      setModalVisible(!modalVisible);
    }
  }

  useEffect(() => {
    if (clickedItem !== 9999){
      aboutModal();
    }
  }, [clickedItem]);

  const onClick = (item) => {
    setClickedItem(item);
  }

  const postData = {
    name: name, 
    phone: phone, 
    username: username, 
    password: password, 
    age: age, 
    gender: gender, 
    taste: taste, 
    price: price, 
    amount: amount,
    eventList: postList

  };

  const callSignup = async () =>{
    if (postList.length <5){
      alert('5개 이상 평가해주세요');
    }else {
      await signup(postData)
      .then((result) => {
        console.log("로그인에 잘되었어?",result.data);
        navigation.navigate('success');
      })
      .catch((err) => {
        console.log(err.response.data);
        alert('알수없는 오류가 발생했습니다');
      });
    }
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
        <TouchableOpacity onPress={ () => {
            onClick(item) }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {/* <FontAwesome name="circle" size={72} color="#E0E0E0" /> */}
            {/* <Image source={{ uri: item.src }} style={styles.tinyImage} /> */}
            <Image source={{ uri: item.img }} style={{ width:40, height:40, marginBottom:5, borderRadius:23 }} />
            <View style={{ width: 60 }}>
              <Text style={{ textAlign: "center" }}>{item.name} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      );
    }

  return (
    <>
    <ScrollView >
    <View style ={styles.rating}>
      <View style ={styles.top}>
        <Text style={styles.title}>카테고리 중 5개 이상을 골라 점수를 입력해주세요!</Text>
        <Text style={styles.sub}>
          평가는 1점에서 5점 사이만 가능합니다
          <FontAwesome5 name="smile" size={20} color="#3498DB" />
        </Text>
        <Text style={styles.count}>평가한 음식 수: {eventList.length} 개</Text>
        <Text style={styles.count}>평가한 음식 </Text>
        <Text></Text>
        <ScrollView horizontal={true} style={{flexDirection: "row"}}>
          {checkedItem.map((elem, key)=>{
            return (
              <View key={key} style={{flexDirection: "row"}}>
              <Text  style={{fontSize:24, fontWeight:'bold'}}>{elem.obj.name}({elem.val})</Text>
              <TouchableOpacity onPress={()=>{
                Alert.alert(
                  "평가를 취소하시겠습니까?",
                  "",
                  [
                    { text: "OK", onPress: () => {
                      setEventList(eventList.filter(item => item !== elem.obj.id));
                      setCheckedList(checkedItem.filter(item => item.obj.id !== elem.obj.id));
                      setPostList(postList.filter(item => item[0] !== clickedItem.id));
                    }},
                    { text: "cancle", onPress: () => console.log("Ask me later pressed")}
                  ]
                );
              }}>
                <AntDesign name="delete" size={24} color="black" />
              </TouchableOpacity>
              <Text>   </Text>
              </View>
            )
          })} 
        </ScrollView>
        
        
      </View>
      <View style={styles.flat}>
        <FlatList
          data={smallCategory}
          renderItem={renderSmallCategory}
          style={{ margin: 10 }}
          keyExtractor={(item) => item.id.toString()} 
          numColumns={3}
          key={3}
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
              <Text style={styles.modalText}>점수를 선택해주세요</Text>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handdleClick(1);
                  }}>
                  <Text style={styles.textStyle}>1점</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handdleClick(2);
                  }}>
                  <Text style={styles.textStyle}>2점</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handdleClick(3);
                  }}>
                  <Text style={styles.textStyle}>3점</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handdleClick(4);
                  }}>
                  <Text style={styles.textStyle}>4점</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handdleClick(5);
                  }}>
                  <Text style={styles.textStyle}>5점</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                  style={styles.cancelbutton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.canceltext}>취소</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      
    </View>
    </ScrollView>
    <TouchableOpacity onPress={() => callSignup()} style={styles.btn}>
      <Text style={styles.btntext}>완료</Text>
    </TouchableOpacity>
    </>
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
    flex: 1.5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
    padding:10,
  },
  title: {
    color: "#3498DB",
    fontWeight: 'bold',
    fontSize:16,
  },
  sub: {
    color: "#3498DB",
    fontWeight: 'bold',
    fontSize:14,
    marginTop:5,
    marginBottom:10,
  },
  flat: {
    flex: 1,
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
  },
  btntext: {
    color:'white', 
    fontWeight:'bold', 
    fontSize: 18
  },
  centeredView: {
    // flex: 1,
    position:'absolute',
    justifyContent: "center",
    alignItems: "center",
    left:22,
    top:300
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
  buttons:{
    flexDirection:'row',
    marginTop:15,
    marginBottom:30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    borderWidth:1,
    margin:5,
  },
  cancelbutton:{
    backgroundColor:"#3498DB",
    alignItems:'center',
    justifyContent:'center',
    width:200,
    height:50,
  },
  canceltext:{
    color:'white',
    fontSize: 18,
    fontWeight:'bold'
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
    fontWeight:'bold',
    fontSize:20,
    marginBottom: 15,
    textAlign: "center"
  },
  count:{
    color:'black', 
    fontWeight:'900', 
    fontSize:20,
    marginTop:10,
  }
});

export default Rating;