import React from 'react';

import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';


const ShowActivityIndicator = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498DB"/>
        <Text style={styles.smallSub}>추천 리스트를 불러오는 중입니다...</Text>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
      paddingTop:150,
      alignItems:"center",
      justifyContent: "center"
    },
    smallSub: {
        alignSelf:'center',
        fontSize:15,
        fontWeight:'bold',
        color:'#3498DB'
      },
  });

export default ShowActivityIndicator;