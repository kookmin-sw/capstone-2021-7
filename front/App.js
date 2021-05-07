import 'react-native-gesture-handler';
// react
import React from 'react';

// react-native
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Remote debugger']);

// react-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// vector-icons

// component
import Main from './components/main';
import Recommend from './components/recommend';
import MyOrder from './components/myorder';
import Menu from './components/menu';
import Login from './components/login';
import MyProfile from './components/myprofile';
import MyStore from './components/mystore';
import Store from './components/store';
import Header from './components/header';
import Location from './components/location';
import Postcode from './components/postcode';

// context
import UserLocationProvider from './context/userlocationprovider';

// API

const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return(
      <MainStack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498DB',
            height: 100,
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
        }}>
        <MainStack.Screen 
          name="main" 
          component={Main}
          options={{
            headerTitle: <Header/>
          }}/>
        <MainStack.Screen name="location" component={Location}/>
        <MainStack.Screen name="postcode" component={Postcode}/>
        <MainStack.Screen name="store" component={Store}/>
        <MainStack.Screen name="menu" component={Menu}/>
      </MainStack.Navigator>
  );
}

const MyProfileStack = createStackNavigator();

const MyProfileStackScreen = () => {
  return(
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen name="myprofile" component={MyProfile}/>
    </MyProfileStack.Navigator>
  );
}

const RecommendStack = createStackNavigator();

const RecommendStackScreen = () => {
  return(
    <RecommendStack.Navigator>
      <RecommendStack.Screen name="myprofile" component={Recommend}/>
      <RecommendStack.Screen name="store" component={Store}/>
      <RecommendStack.Screen name="menu" component={Menu}/>
    </RecommendStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <UserLocationProvider>
      <NavigationContainer >
        <Tab.Navigator initialRouteName = "main" >
          <Tab.Screen name="main" children={()=><MainStackScreen/>}/>
          <Tab.Screen name="mystore" component={MyStore}/>
          <Tab.Screen name="recommend" children={()=><RecommendStackScreen/>}/>
          <Tab.Screen name="myorder" component={MyOrder}/>
          <Tab.Screen name="myprofile" component={MyProfileStackScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </UserLocationProvider>
  );
}

export default App;
