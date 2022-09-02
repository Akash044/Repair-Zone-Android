import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { BottomNavigation } from 'react-native-paper';
import Home from "../HomePage/Home"
import Cart from './Cart';
import Menu from '../menu/MenuOpt';

const BottomNavigation_Home = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Home', icon: 'home', color: "#795548" },
        { key: 'cart', title: 'Cart', icon: 'cart', color: "#607D8B" },
        { key: 'menu', title: 'Menu', icon: 'menu', color: "#3F51B5" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: Home,
        cart: Cart,
        menu: Menu
    });
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

export default BottomNavigation_Home

const styles = StyleSheet.create({})