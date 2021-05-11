import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, View,ScrollView, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { UserLocationContext } from '../context/userlocationcontext';

import { getRecommendCategory } from '../api/category-api';

const Recommend = () => {
  const navigation = useNavigation();

  const [awsCategory, setAwsCategory] = useState([]);
  const [weatherCategory, setWeatherCategory] = useState([]);
  const [timeSlotCategory, setTimeSlotCategory] = useState([]);

  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const callGetRecommendCategory = async () => {
    await getRecommendCategory({
      "location" : userLocation
    })
      .then((result) => {
        setAwsCategory(result.data.awsCategoryList);
        setWeatherCategory(result.data.weatherCategoryList)
        setTimeSlotCategory(result.data.timeSlotCategoryList)
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    callGetRecommendCategory(); 
  },[userLocation]);

  return(
    <ScrollView style={styles.recommend}>
      <View style={styles.topIcon}>
          <FontAwesome5 name="thumbs-up" size={50} color="#3498DB" />
      </View>
      <View style={styles.contents}>
          <View>
              <Text style={styles.question}>
                  <MaterialIcons  name="restaurant-menu" size={50} color="#3498DB" /> 나한테 딱 맞는 음식{'\n'}
              </Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
              }}>
                {awsCategory.map((elem, key) => {
                  return(
                    <TouchableOpacity 
                      key={key} 
                      onPress={()=> {
                        navigation.navigate({
                          name : 'store',
                          params:{
                            from : true,
                            recommendType:"AWS",
                            categoryFlag: false,
                            categoryId:elem.id,
                            categoryName:elem.name
                          }
                          })}}>
                      <View style={{ justifyContent: "center", alignItems: "center" }} >
                        <FontAwesome name="circle" size={72} color="#E0E0E0" />
                        {/* <Image source={{ uri: item.src }} style={styles.tinyImage} /> */}
                        <View style={{ width: 60 }}>
                          <Text style={{ textAlign: "center" }}>{elem.name} </Text>
                        </View>
                      </View>
                  </TouchableOpacity>
                )})}
              </View>
          </View>
          <Text>
            <Text style={styles.question}>
                <Ionicons name="ios-time" size={50} color="#3498DB" />시간대별 음식{'\n'}
            </Text>
            <View style={{
              flexDirection: "row",
              justifyContent: "center",
            }}>
              {timeSlotCategory.map((elem, key) => {
                return(
                  <TouchableOpacity 
                    key={key}
                    onPress={()=> {
                      navigation.navigate({
                        name : 'store',
                        params:{
                          from : true,
                          recommendType:"TIME",
                          categoryFlag: false,
                          categoryId:elem.id,
                          categoryName:elem.name
                        }
                        })}} >
                    <View style={{ justifyContent: "center", alignItems: "center" }} >
                      <FontAwesome name="circle" size={72} color="#E0E0E0" />
                      {/* <Image source={{ uri: item.src }} style={styles.tinyImage} /> */}
                      <View style={{ width: 60 }}>
                        <Text style={{ textAlign: "center" }}>{elem.name} </Text>
                      </View>
                    </View>
                </TouchableOpacity>
              )})}
            </View>
          </Text>
          <Text>
            <Text style={styles.question}>
                <Ionicons name="md-sunny" size={55} color="#3498DB" /> 지금 날씨에 어울리는 음식{'\n'}
            </Text>
            <View style={{
              flexDirection: "row",
              justifyContent: "center",
            }}>
              {weatherCategory.map((elem, key) => {
                return(
                  <TouchableOpacity 
                    key={key}
                    onPress={()=> {
                      navigation.navigate({
                        name : 'store',
                        params:{
                          from : true,
                          recommendType:"WEATHER",
                          categoryFlag: false,
                          categoryId:elem.id,
                          categoryName:elem.name
                        }
                        })}} >
                    <View style={{ justifyContent: "center", alignItems: "center" }} >
                      <FontAwesome name="circle" size={72} color="#E0E0E0" />
                      {/* <Image source={{ uri: item.src }} style={styles.tinyImage} /> */}
                      <View style={{ width: 60 }}>
                        <Text style={{ textAlign: "center" }}>{elem.name} </Text>
                      </View>
                    </View>
                </TouchableOpacity>
              )})}
            </View>
          </Text>
      </View>
      <View style={styles.space}></View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
    recommend:{
        backgroundColor:'white',
        width:'100%',
        paddingTop:70,
        flex:1,
    },
    topIcon:{
        flex:1,
        paddingBottom:20,
        alignItems: 'center',
        borderBottomColor: '#3498DB',
        borderBottomWidth: 5,
        backgroundColor:'white'
    },
    contents:{
        flex:8,
        // borderBottomColor:'#3498DB',
        // borderBottomWidth:5,
        paddingBottom:100,
        alignItems:'center'
        
    },
    space:{
        flex:1
    },
    question:{
        fontSize:25,
        fontWeight:"bold",
        color:'#3498DB',
        lineHeight:80,
    },
    name:{
        fontSize:15,
        fontWeight:"bold"
    }
});

export default Recommend;