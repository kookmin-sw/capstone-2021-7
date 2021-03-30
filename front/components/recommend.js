import React, { useState } from 'react';
import { render } from 'react-dom';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


function Recommend(){
    return(
        <View style={styles.recommend}>
            <View style={styles.topIcon}>
                <FontAwesome5 name="thumbs-up" size={65} color="#3498DB" />
            </View>
            <View style={styles.contents}>
                <Text>
                    <Text style={styles.question}>
                        <MaterialIcons  name="restaurant-menu" size={50} color="#3498DB" /> 나한테 딱 맞는 음식{'\n'}
                    </Text>
                    <FontAwesome name="circle" size={100} color="#E0E0E0" />{"\t"}{"\t"}      
                    <FontAwesome name="circle" size={100} color="#E0E0E0" />{"\t"}{"\t"}  
                    <FontAwesome name="circle" size={100} color="#E0E0E0" />{"\n"}
                    <Text style={styles.name}>
                        카테고리1{"\t"}{"\t"}{"\t"} 카테고리2{"\t"}{"\t"}{"\t"}카테고리3
                    </Text>
                </Text>
                <Text>
                    <Text style={styles.question}>
                        <FontAwesome5 name="smile" size={50} color="#3498DB" /> 내가 좋아할 음식{'\n'}
                    </Text>
                    <FontAwesome name="circle" size={100} color="#E0E0E0" />{"\t"}{"\t"}
                    <FontAwesome name="circle" size={100} color="#E0E0E0" /> {"\t"}{"\t"}
                    <FontAwesome name="circle" size={100} color="#E0E0E0" />{"\n"}
                    <Text style={styles.name}>
                        카테고리4{"\t"}{"\t"}{"\t"} 카테고리5{"\t"}{"\t"}{"\t"}카테고리6
                    </Text>
                </Text>
                <Text>
                    <Text style={styles.question}>
                        <Ionicons name="md-sunny" size={55} color="#3498DB" /> 지금 날씨에 어울리는 음식{'\n'}
                    </Text>
                    <FontAwesome name="circle" size={100} color="#E0E0E0" /> {"\t"}{"\t"}
                    <FontAwesome name="circle" size={100} color="#E0E0E0" /> {"\t"}{"\t"}
                    <FontAwesome name="circle" size={100} color="#E0E0E0" /> {"\n"}
                    <Text style={styles.name}>
                        카테고리7{"\t"}{"\t"}{"\t"} 카테고리8{"\t"}{"\t"}{"\t"}카테고리9
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
        paddingTop:80,
        flex:1,
    },
    topIcon:{
        flex:1,
        alignItems: 'center',
        borderBottomColor: '#3498DB',
        borderBottomWidth: 5,
        backgroundColor:'white'
    },
    contents:{
        flex:8,
        borderBottomColor:'#3498DB',
        borderBottomWidth:5,
        paddingBottom:100,
        alignItems:'center'
        
    },
    space:{
        flex:1
    },
    question:{
        fontSize:30,
        fontWeight:"bold",
        color:'#3498DB',
        lineHeight:80,
    },
    name:{
        fontSize:18,
        fontWeight:"bold"
    }

})

export default Recommend;