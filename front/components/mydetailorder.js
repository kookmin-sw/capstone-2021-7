import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import CheckBox from './checkbox';

import { UserLocationContext } from '../context/userlocationcontext';
import { IsLoginContext } from '../context/logincontext';

import { getMenu, orderMenu } from '../api/store-api';


const MyDetailOrder = ({ route }) => {

	return (
		<View style={styles.menu}>
				<View style={styles.store}>
						<View style={styles.top}>
								<View>
								<Image source={{ uri: route.params.orderList[0].storeImg }} style={styles.categoryimg} />
								</View>
								<View style={styles.storename}>
										<Text style={styles.catename}>{route.params.orderList[0].store}</Text>
								</View>
								<TouchableOpacity>
									<Ionicons name="heart-outline" size={40} color="pink" />
								</TouchableOpacity>
						</View>
				</View>
				<ScrollView style={styles.menulist}>
          {route.params.orderList.map((elem, key) => {
            console.log("elem",elem);
            return(
              <View style={styles.tq} key={key}>
                <View>
                  <Image source={{ uri: elem.storeImg }} style={styles.categoryimg} />
                </View>
                <View style={styles.tqname}>
                    <Text style={styles.food}>{elem.name}</Text>
                    <Text style={styles.price}>{elem.price}</Text>
                </View>
            </View>
            )})}
				</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	store: {
			flex:0.3,
			paddingTop:30,
			borderBottomColor: "#3498DB",
			borderBottomWidth:5,
			width:350,
			justifyContent:'center'
	},
	top:{
		maxWidth:350,
		flexDirection:'row',
		alignItems:'center'
	//   marginLeft:50,
	},
	storename:{
		justifyContent:'center',
		marginLeft:20,
		marginRight:20,
		width:200
	},
	catename:{
			fontSize:22,
			fontWeight:'bold'
	},
	menulist: {
			flex:1,
			width:'100%',
			marginLeft:60,
			paddingTop:'5%',
	},
	checkbox:{
			alignSelf:'center',

	},
	button: {
			backgroundColor: "#3498DB",
			borderRadius:5,
			width:400,
			height:55,
			justifyContent:'center',
	},
	order:{
			textAlign:'center',
			color:'white',
			fontSize:20,
			fontWeight:'bold',
	},
	tq:{
			flexDirection:'row',
			padding:7,
			borderBottomColor:'#dbdbdb',
			borderBottomWidth:1,
			width:'85%'
	},  
	tqname:{
		marginLeft:15,
		width:'70%',
		justifyContent:'center',
	},
	food:{
			fontWeight:'bold',
			fontSize:18,
			marginRight:50
	},
	price:{
			fontSize:15,
			color:"#3498DB",
			lineHeight:20,
  },
  categoryimg:{
    width:70,
    height:70,
    marginBottom:5
  },
});

export default MyDetailOrder;