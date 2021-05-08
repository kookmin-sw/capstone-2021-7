import React, { useState } from 'react';

import { View, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

const CheckBox = ({clickedMenuList, setClickedMenuList, menuId }) => {
  const [isClicked, setIsClicked] = useState(false);
  
  return (
    <View style={{justifyContent: 'center'}}>
      {isClicked === false 
        ? <TouchableOpacity onPress={() => {
            setClickedMenuList(clickedMenuList => [...clickedMenuList, menuId])
            setIsClicked(true)
          }}>
            <Feather name="square" size={24} color="black" /> 
          </TouchableOpacity>
        :  <TouchableOpacity onPress={() => {
            setClickedMenuList(clickedMenuList.filter(item => item !== menuId))
            setIsClicked(false)
            }}>
            <Feather name="check-square" size={24} color="black" />
          </TouchableOpacity>
      }
    </View>
  );
}

export default CheckBox;