import React, { useContext } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { TouchableOpacity } from "react-native-gesture-handler";

import { FontAwesome } from '@expo/vector-icons';

import { UserLocationContext } from '../context/userlocationcontext';
import { color } from 'react-native-reanimated';

const Header = () => {
    const navigation = useNavigation();
    const {userLocation, setUserLocation} = useContext(UserLocationContext)
    
    return (
        <View >
          <View style={{ alignSelf: 'center', marginTop: 2 }} >
            <Text style ={styles.white}>Fooday</Text>
          </View>
          <View style= {{ alignSelf: 'center', flexDirection: 'row', marginTop: 10  }}>
            <Text style ={styles.white2}>{userLocation} </Text>
            <TouchableOpacity 
              onPress={() => {
                navigation.push('postcode')
              }}
            >
              <FontAwesome name="search" size={24} color="white"/>
            </TouchableOpacity>
          </View>
        </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 50,
    },
    white: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 20,
    },
    white2: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15,
    },
  });
export default Header;