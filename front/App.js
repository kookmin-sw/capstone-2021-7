import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from './components/main';
import Recommend from './components/recommend';
import MyOrder from './components/myorder';
import Menu from './components/menu';
import Login from './components/login';
import MyProfile from './components/myprofile';
import MyStore from './components/mystore';
import Store from './components/store';


const Tab = createBottomTabNavigator();
const Home = () =>{
  return(
    <Tab.Navigator
      initialRouteName = "main"
    >
    <Tab.Screen name= "main" component = {Main}/>
    <Tab.Screen name= "mystore" component = {MyStore}/>
    <Tab.Screen name= "recommend" component = {Recommend}/>
    <Tab.Screen name= "myorder" component = {MyOrder}/>
    <Tab.Screen name= "myprofile" component = {MyProfile}/>
    </Tab.Navigator>
  );
}


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="main" component={Main}/>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="menu" component={Menu}/>
        <Stack.Screen name="myorder" component={MyOrder}/>
        <Stack.Screen name="myprofile" component={MyProfile}/>
        <Stack.Screen name="mystore" component={MyStore}/>
        <Stack.Screen name="recommend" component={Recommend}/>
        <Stack.Screen name="store" component={Store}/>
      </Stack.Navigator>
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

