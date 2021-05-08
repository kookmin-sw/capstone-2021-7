// react
import React from 'react';

// react-native
import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Remote debugger']);

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
import Survey from './components/survey';
import Header from './components/header';
import Location from './components/location';
import Postcode from './components/postcode';
import Success from './components/success';

// context
import UserLocationProvider from './context/userlocationprovider';

// API

const MainStack = createStackNavigator();

const MainStackScreen = ({ location }) => {
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
            headerTitle: <Header location={location}/>
          }}/>
        <MainStack.Screen name="location" component={Location}/>
        <MainStack.Screen name="postcode" component={Postcode}/>
      </MainStack.Navigator>
  );
}

const MyProfileStack = createStackNavigator();

const MyProfileStackScreen = () => {
  return(
    <MyProfileStack.Navigator>
      <MyProfileStack.Screen name="myprofile" component={MyProfile}/>
      <MyProfileStack.Screen name="survey" component={Survey}/>
      <MyProfileStack.Screen name="login" component={Login}/>
      <MyProfileStack.Screen name="success" component={Success}/>
    </MyProfileStack.Navigator>
  );
}

const RecommendStack = createStackNavigator();

const RecommendStackScreen = () => {
  return(
    <RecommendStack.Navigator>
      <RecommendStack.Screen name="Recommend" component={Recommend}/>
    </RecommendStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <UserLocationProvider>
      <NavigationContainer >
        <Tab.Navigator initialRouteName = "main" >
          <Tab.Screen name="main" children={()=><MainStackScreen location={location}/>}/>
          <Tab.Screen name="mystore" component={MyStore}/>
          <Tab.Screen name="recommend" component={RecommendStackScreen}/>
          <Tab.Screen name="myorder" component={MyOrder}/>
          <Tab.Screen name="myprofile" component={MyProfileStackScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </UserLocationProvider>
  );
}

export default App;
