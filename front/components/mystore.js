import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

const MyStore = () => {
  return (
    <View style={styles.container}>
      <View style={styles.coming}>
        <Text style={styles.up}>C{'\t'}O{'\t'}M{'\t'}I{'\t'}N{'\t'}G</Text>
        <Text style={styles.down}>S{'\t'}O{'\t'}O{'\t'}N</Text>
      </View>
      <View style={styles.icon}>
        <MaterialIcons name="engineering" size={150} color="#3498DB" />
        <Text style={styles.title}>서비스 개발 중입니다</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
		justifyContent: 'space-between',
  },
  title:{
    fontSize:30,
    fontWeight:'bold',
    color:"#3498DB",
    padding:10
  },
  sub:{
    fontSize:18,
    fontWeight:'bold',
    color:"#3498DB",
  },
  up: {
    fontSize:44,
    fontWeight:'bold',
    color:"#3498DB",
  },
  down: {
    fontSize:44,
    fontWeight:'bold',
    color:"#3498DB",
  },
  coming:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10%',
    flexBasis: '30%'
  },
  icon:{
    alignItems:'center',
    flexBasis:'60%'

  }
});

export default MyStore;