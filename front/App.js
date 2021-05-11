import 'react-native-gesture-handler';
// react
import React, { useContext } from 'react';

// react-native
import { LogBox, Alert, TouchableOpacity } from 'react-native';
// LogBox.ignoreLogs(['Remote debugger']);

// react-navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

// vector-icons
import { Ionicons } from '@expo/vector-icons';

// component
import Main from './components/main';
import Recommend from './components/recommend';
import MyOrder from './components/myorder';
import Menu from './components/menu';
import Login from './components/login';
import MyStore from './components/mystore';
import Store from './components/store';
import Survey from './components/survey';
import Header from './components/header';
import Location from './components/location';
import Postcode from './components/postcode';
import Success from './components/success';
import Rating from './components/rating';
import SignUp from './components/signup';

// context
import UserLocationProvider from './context/userlocationprovider';
import { UserLocationContext } from './context/userlocationcontext';

// API

const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return(
      <MainStack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498DB',
            height: 120,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 20,
          },
          headerBackTitle: " ",
          headerBackTitleStyle: {
            color: 'white'
          },
        }}>
        <MainStack.Screen 
          name="main" 
          component={Main}
          options={{
            headerTitle: <Header/>
          }}/>
        <MainStack.Screen name="location" component={Location} options={{
            headerTitle: "위치정보 입력"
          }}/>
        <MainStack.Screen name="postcode" component={Postcode} options={{
            headerTitle: "위치정보 입력"
          }}/>
        <MainStack.Screen name="store" component={Store}/>
        <MainStack.Screen name="menu" component={Menu}/>
      </MainStack.Navigator>
  );
}

const MyStoreStack = createStackNavigator();

const MyStoreStackScreen = () => {
  return(
    <MyStoreStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498DB',
          height: 120,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          fontSize: 20,
        },
        headerBackTitle: " ",
        headerBackTitleStyle: {
          color: 'white'
        },
      }}>
      <MyStoreStack.Screen name="mystore" component={MyStore}/>
    </MyStoreStack.Navigator>
  );
}

const MyProfileStack = createStackNavigator();

const MyProfileStackScreen = () => {
  return(
    <MyProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498DB',
          height: 120,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          fontSize: 20,
        },
        headerBackTitle: " ",
        headerBackTitleStyle: {
          color: 'white'
        },
      }}>
      <MyProfileStack.Screen name="login" component={Login}/>
      <MyProfileStack.Screen name="survey" component={Survey}/>
      <MyProfileStack.Screen name="signup" component={SignUp}/>
      <MyProfileStack.Screen name="success" component={Success}/>
      <MyProfileStack.Screen name="rating" component={Rating}/>
    </MyProfileStack.Navigator>
  );
}

const RecommendStack = createStackNavigator();

const RecommendStackScreen = () => {
  return(
    <RecommendStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498DB',
          height: 120,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white',
          fontSize: 20,
        },
        headerBackTitle: " ",
        headerBackTitleStyle: {
          color: 'white'
        },
      }}>
      <RecommendStack.Screen name="음식 추천" component={Recommend}/>
      <RecommendStack.Screen name="store" component={Store}/>
      <RecommendStack.Screen name="menu" component={Menu}/>
    </RecommendStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();

const TabBar = () => {
  const { userLocation } = useContext(UserLocationContext);

  return (
    <Tab.Navigator 
      initialRouteName = "main"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'main') {
            iconName = "md-home";
          }
          else if (route.name === 'mystore') {
            iconName = "heart";
          }
          else if (route.name === 'recommend') {
            iconName = "ios-thumbs-up-sharp";
          }
          else if (route.name === 'myorder') {
            iconName = "newspaper-sharp";
          }
          else if (route.name === 'myprofile') {
            iconName = "ios-person-sharp";
          }
          return <Ionicons name={iconName} size={30} color={color}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#3498DB",
        inactiveTintColor: "gray",
        style:{
          borderTopColor: "#3498DB",
          borderTopWidth:5,
          height:100,
        }
      }}
    >
      <Tab.Screen name="main" children={()=><MainStackScreen/>}/>
      <Tab.Screen name="mystore" component={MyStoreStackScreen}/>
      <Tab.Screen 
        name="recommend" 
        component={RecommendStackScreen}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
            if (userLocation === "위치정보를 입력해주세요") {
              Alert.alert(
                "위치 정보를 입력해주세요",
                "화면 상단의 돋보기를 눌러 위치정보를 입력해주세요",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
            } else {
              navigation.navigate('recommend');
            }
          },
        })}/>
      <Tab.Screen name="myorder" component={MyOrder}/>
      <Tab.Screen name="myprofile" component={MyProfileStackScreen}/>
    </Tab.Navigator>
  );
}

const App = () => {  

  return (
    <UserLocationProvider>
      <NavigationContainer >
        <TabBar/>
      </NavigationContainer>
    </UserLocationProvider>
  );
}

export default App;
