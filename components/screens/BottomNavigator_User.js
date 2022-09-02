import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ShowAllOrders from '../user/ShowAllOrders';
import Profile from '../user/Profile';
import { BottomNavigation } from 'react-native-paper';

const BottomNavigator_User = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'orders', title: 'Orders', icon: 'order-alphabetical-ascending', color: "#795548" },
        { key: 'profile', title: 'Profile', icon: 'account', color: "#607D8B" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        orders: ShowAllOrders,
        profile: Profile,
    });
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

export default BottomNavigator_User

const styles = StyleSheet.create({})