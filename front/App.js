import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import "react-native-gesture-handler";
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from './components/main';
import Recommend from './components/recommend';
import Store from './components/store';
import MyOrder from './components/myorder';
import MyProfile from './components/myprofile';
import MyStore from './components/mystore';

const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName = "main" >
        <Tab.Screen name= "main" component = {Main}/>
        <Tab.Screen name= "mystore" component = {MyStore}/>
        <Tab.Screen name= "store" component = {Store}/>
        <Tab.Screen name= "myorder" component = {MyOrder}/>
        <Tab.Screen name= "myprofile" component = {MyProfile}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
