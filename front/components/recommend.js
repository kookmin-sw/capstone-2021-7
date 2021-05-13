import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, View,ScrollView, Text, ImageBackground, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import ShowActivityIndicator from './activityindicator';

import { UserLocationContext } from '../context/userlocationcontext';

import { getRecommendCategory } from '../api/category-api';


const Recommend = () => {
  const navigation = useNavigation();

  const [animating, setAnimating] = useState(true);
  const [selfCategory, setSelfCategory] = useState([]);
  const [awsCategory, setAwsCategory] = useState([]);
  const [weatherCategory, setWeatherCategory] = useState([]);
  const [timeSlotCategory, setTimeSlotCategory] = useState([]);

  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  const callGetRecommendCategory = async () => {
    await getRecommendCategory({
      "location" : userLocation
    })
      .then((result) => {
        console.log(result.data);
        setSelfCategory(result.data.selfCategoryList);
        setAwsCategory(result.data.awsCategoryList);
        setWeatherCategory(result.data.weatherCategoryList);
        setTimeSlotCategory(result.data.timeSlotCategoryList);
        setAnimating(false);
      })
      .catch((err) => console.log(err));
  }

  

  useEffect(() => {
    callGetRecommendCategory(); 
  },[]);

  return(
    <ScrollView style={styles.recommend}>
      <View style={styles.topIcon}>
          <FontAwesome5 name="thumbs-up" size={50} color="#3498DB" />
          <Text></Text>
          <Text>나에게 딱 맞는 음식 추천은 "짝수시 정각"마다 갱신됩니다. </Text>
          <Text>ex) 10시, 12시, 2시, 4시</Text>
          <Text>피드백 역시 두시간에 한번씩 가능합니다.</Text>
      </View>
      { animating === true
        ? 
        <ShowActivityIndicator/> 
        : 
        <View style={styles.contents}>
          <View>
              <Text style={styles.question}>
                  <MaterialIcons  name="restaurant-menu" size={50} color="#3498DB" /> 나한테 딱 맞는 음식{'\n'}
              </Text>
              
              <Text style={styles.smallSub}>AWS</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingBottom:20
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

              <Text style={styles.smallSub}>자체개발 알고리즘</Text>
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
              }}>
                {selfCategory.map((elem, key) => {
                  return(
                    <TouchableOpacity 
                      key={key} 
                      onPress={()=> {
                        navigation.navigate({
                          name : 'store',
                          params:{
                            from : true,
                            recommendType:"SELF",
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
          
          
            <Text style={styles.question}>
                <Ionicons name="md-sunny" size={50} color="#3498DB" /> 지금 날씨에 어울리는 음식{'\n'}
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
            <TouchableOpacity onPress={()=>{
              setAnimating(true);
              callGetRecommendCategory();
              }} 
              style={styles.button}>
              <Text style={styles.order}>다시추천받기</Text>
            </TouchableOpacity>
                        
      </View>
      }
    </ScrollView>

  );
};

const styles = StyleSheet.create({
    recommend:{
        backgroundColor:'white',
        width:'100%',
        paddingTop:30,
        flex:1,
    },
    topIcon:{
        flex:1,
        paddingBottom:30,
        alignItems: 'center',
        borderBottomColor: '#3498DB',
        borderBottomWidth: 5,
        backgroundColor:'white'
    },
    contents:{
        flex:1,
        // borderBottomColor:'#3498DB',
        // borderBottomWidth:5,
        paddingBottom:30,
        alignItems:'center'
        
    },
    space:{
        flex:1
    },
    question:{
        fontSize:25,
        fontWeight:"bold",
        color:'#3498DB',
        paddingTop:10,
    },
    name:{
        fontSize:15,
        fontWeight:"bold"
    },
    button: {
			backgroundColor: "#3498DB",
			borderRadius:5,
			width:400,
			height:55,
      justifyContent:'center',
      marginTop:20
    },
    order:{
			textAlign:'center',
			color:'white',
			fontSize:20,
			fontWeight:'bold',
    },
    smallSub: {
      alignSelf:'center',
      fontSize:15,
      fontWeight:'bold',
      color:'#3498DB'
    },
    container: {
      flex: 1,
      justifyContent: "center"
    },
});

export default Recommend;