import React, { useContext } from 'react';

import { StyleSheet, View } from 'react-native';
import Postcode from 'react-native-daum-postcode';

import { useNavigation } from '@react-navigation/native';

import { UserLocationContext } from '../context/userlocationcontext';

const ShowPostcode = () => {
  const navigation = useNavigation();
  const { setUserLocation }  = useContext(UserLocationContext);

  return (
    <View style={styles.container}>
      <Postcode
        style={{ width: 300, height: 300 }}
        jsOptions={{ animated: true }}
        onSelected={ async ( data ) => {
          setUserLocation("");
          console.log(data.address)
          await setUserLocation(data.address);
          navigation.push('location')
        }}
      />
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
});

export default ShowPostcode;