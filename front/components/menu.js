import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import CheckBox from './checkbox';

import { UserLocationContext } from '../context/userlocationcontext';
import { IsLoginContext } from '../context/logincontext';
import { OrderContext } from '../context/ordercontext';

import { getMenu, orderMenu } from '../api/store-api';
import { getOrder} from '../api/user-api';

const Menu = ({ route }) => {
	console.log(route)
  const navigation = useNavigation();

  const [menuList, setMenuList] = useState([]);
  const [clickedMenuList, setClickedMenuList] = useState([]);

  const { userLocation } = useContext(UserLocationContext);
  const { isLogin } = useContext(IsLoginContext);
  const { setOrderList } = useContext(OrderContext);


  const callGetMenu = async () => {
    await getMenu(route.params.storeId)
      .then((result) => {
        setMenuList(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }

  const callGetOrder = async () => {
    await getOrder()
      .then((result) => {
        setOrderList(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const callOrderMenu = async () => {
	if (isLogin===false){
		Alert.alert(
			"로그인이 필요한 서비스입니다.",
			"로그인 해주세요",
			[
				{ text: "OK", onPress: () => navigation.navigate('myprofile') }
			]
			);
	} else {
		await orderMenu({
			menuList : clickedMenuList,
			location : userLocation
		  })
		  .then((result) => {
        callGetOrder();
        Alert.alert(
          "주문이 완료되었습니다.",
          "주문내역에서 확인해주세요",
          [{ text: "OK", onPress: () => navigation.navigate('myorder')}]
        );
		  })
		  .catch((err) => {
			  console.log(err);
		  })
	}
  }


	useEffect(() => {
		callGetMenu();
	},[]);

	return (
		<View style={styles.menu}>
			<View style={styles.store}>
				<View style={styles.top}>
					<Image source={{ uri: route.params.storeImg }} style={styles.storeimg} />
					<View style={styles.storename}>
							<Text style={styles.catename}>{route.params.storeName}</Text>
					</View>
					<TouchableOpacity>
						<Ionicons name="heart-outline" size={40} color="pink" />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView style={styles.menulist}>
				{menuList.map((elem, key) => {
					return(
					<View style={styles.tq} key={key}>
						<Image source={{ uri: elem.img }} style={styles.storeimg} />
						<View style={styles.tqname}>
							<Text style={styles.food}>{elem.name}</Text>
							<Text style={styles.price}>{elem.price}</Text>
						</View>
						<CheckBox clickedMenuList={clickedMenuList} setClickedMenuList={setClickedMenuList} menuId={elem.id}></CheckBox>
					</View>
					)})}
			</ScrollView>
			<TouchableOpacity onPress={callOrderMenu} style={styles.button}>
				<Text style={styles.order}>주문하기</Text>
			</TouchableOpacity>
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
			width:'90%',
			justifyContent:'center'
	},
	top:{
		maxWidth:350,
		flexDirection:'row',
		alignItems:'center',
	//   marginLeft:50,
	},
	storename:{
		justifyContent:'center',
		marginLeft:20,
		marginRight:20,
		width:200
	},
	storeimg:{
		width:'20%',
		height:'90%'
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
	}
});

export default Menu;