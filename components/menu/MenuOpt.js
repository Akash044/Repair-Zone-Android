import React, {useState} from 'react'
import { View } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';

const MenuOpt = () => {
  const [visible, setVisible] = useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
   < Provider >
    <View
      style={{
        paddingTop: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>
      
        <Menu.Item onPress={() => { }} title="Item 1" />
        <Menu.Item onPress={() => { }} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => { }} title="Item 3" />
    </View>
  </Provider >
  )

};

export default MenuOpt;