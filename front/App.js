import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from './components/main';
import Recommend from './components/recommend';
import Store from './components/store';
import MyOrder from './components/myorder';
import MyProfile from './components/myprofile';
import MyStore from './components/mystore';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName = "store"
      >
        <Tab.Screen name= "main" component = {Main}/>
        <Tab.Screen name= "mystore" component = {MyStore}/>
        <Tab.Screen name= "store" component = {Store}/>
        <Tab.Screen name= "myorder" component = {MyOrder}/>
        <Tab.Screen name= "myprofile" component = {MyProfile}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

