import React, { useContext, useState } from 'react';

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { UserLocationContext } from '../context/userlocationcontext';

import { postLocation } from '../api/user-api';

const Location = () => {
  const navigation = useNavigation();

  const [detailLocation, setDetailLocation] = useState("");

  const {userLocation, setUserLocation} = useContext(UserLocationContext);

  const callPostLocation = async ( location ) => {
    await postLocation({ name: location })
    .then((result)=> {
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err.response);
    })
  }

  const onClick = () => {
    let location = userLocation + " " + detailLocation
    setUserLocation(location);
    callPostLocation(location);
    navigation.navigate('main');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userlocation}>{userLocation}</Text>
      <View>
        <TextInput
          style={styles.input}
          value={detailLocation}
          onChangeText={text => setDetailLocation(text)}
          placeholder="상세주소를 입력해주세요"
        />
        <TouchableOpacity style={styles.searchbtn} onPress={onClick}>
          <Text style={styles.searchtext}>확인</Text>
        </TouchableOpacity>
        {/* <Button title="확인" onPress={onClick}/> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width:200,
    margin: 12,
    borderWidth: 2,
    textAlign:'center'
  },
  userlocation: {
    fontSize:18,
    fontWeight:'bold',
  },
  searchbtn: {
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:150,
    backgroundColor:'#3498DB',
    borderRadius:5
  },
  searchtext: {
    color:"white",
    fontWeight:'bold',
    fontSize:14
  }
});

export default Location;