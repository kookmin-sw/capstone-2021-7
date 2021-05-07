import React, { useContext } from 'react';

import { Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { TouchableOpacity } from "react-native-gesture-handler";

import { FontAwesome } from '@expo/vector-icons';

import { UserLocationContext } from '../context/userlocationcontext';

const Header = () => {
    const navigation = useNavigation();
    const {userLocation, setUserLocation} = useContext(UserLocationContext)
    
    return (
        <View>
          <View>
            <Text>Fooday</Text>
          </View>
          <View style= {{ flexDirection: 'row' }}>
            <Text>{userLocation}</Text>
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

export default Header;