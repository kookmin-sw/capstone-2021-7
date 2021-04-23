import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Main = () => {
  return (
    <View style={styles.container}>
      <Text>안녕 나는 MAIN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;