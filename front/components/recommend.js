import React, { useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const Recommend = () => {
    return(
        <View style={styles.recommend}>
            <View style={styles.topIcon}>
                <FontAwesome5 name="thumbs-up" size={50} color="#3498DB" />
            </View>
            <View style={styles.contents}>
                <Text>
                    <Text style={styles.question}>
                        <MaterialIcons  name="restaurant-menu" size={50} color="#3498DB" /> 나한테 딱 맞는 음식{'\n'}
                    </Text>
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" />
                    </TouchableOpacity>{"\t"}
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" /> 
                    </TouchableOpacity>{"\t"}
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" /> 
                    </TouchableOpacity>{"\t"}
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" />
                    </TouchableOpacity>{"\n"}
                    <Text style={styles.name}>
                        카테고리1{"\t"}카테고리2{"\t"}카테고리3{"\t"}카테고리4
                    </Text>
                </Text>
                <Text>
                    <Text style={styles.question}>
                        <Ionicons name="ios-time" size={50} color="#3498DB" />시간대별 음식{'\n'}
                    </Text>
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" />
                    </TouchableOpacity>{"\t"}
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" /> 
                    </TouchableOpacity>{"\t"}
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" />  
                    </TouchableOpacity>{"\t"}
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" />
                    </TouchableOpacity>{"\n"}
                    <Text style={styles.name}>
                        카테고리5{"\t"}카테고리6{"\t"}카테고리7{"\t"}카테고리8
                    </Text>
                </Text>
                <Text>
                    <Text style={styles.question}>
                        <Ionicons name="md-sunny" size={55} color="#3498DB" /> 지금 날씨에 어울리는 음식{'\n'}
                    </Text>
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" /> 
                    </TouchableOpacity>{"\t"}
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" /> 
                    </TouchableOpacity>{"\t"}
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" /> 
                    </TouchableOpacity>{"\t"}
                    <TouchableOpacity>
                        <FontAwesome name="circle" size={72} color="#E0E0E0" />
                    </TouchableOpacity>{"\n"}
                    <Text style={styles.name}>
                        카테고리9{"\t"}카테고리10{"\t"}카테고리11{"\t"}카테고리12
                    </Text>
                </Text>
            </View>
            <View style={styles.space}></View>
        </View>

    );
}

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

})

export default Recommend;