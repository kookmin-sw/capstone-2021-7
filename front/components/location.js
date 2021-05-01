import React, { useContext, useState } from 'react';

import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { UserLocationContext } from '../context/userlocationcontext';

const Location = () => {
  const navigation = useNavigation();

  const [detailLocation, setDetailLocation] = useState("");

  const {userLocation, setUserLocation} = useContext(UserLocationContext);

  const onClick = () => {
    setUserLocation(userLocation + " " + detailLocation);
    navigation.navigate('main');
  }

  return (
    <View style={styles.container}>
      <Text>{userLocation}</Text>
      <View>
        <TextInput
          style={styles.input}
          value={detailLocation}
          onChangeText={text => setDetailLocation(text)}
          placeholder="상세주소를 입력해주세요"
        />
        <Button title="확인" onPress={onClick}/>
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
    margin: 12,
    borderWidth: 1,
  },
});

export default Location;