import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const Menu = () => {
  return (
    <View style={styles.container}>
      <Text>안녕 나는 Menu Page</Text>
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

export default Menu;