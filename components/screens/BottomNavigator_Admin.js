import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AddServices from '../admin/AddServices';
import ManageServices from '../admin/ManageServices';
import ManageOrders from '../admin/ManageOrders';
import { BottomNavigation } from 'react-native-paper';

const BottomNavigator_Admin = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'addServices', title: 'Add Service', icon: 'home', color:"#795548" },
        { key: 'manageServices', title: 'Manage Services', icon: 'delete', color:"#607D8B" },
        { key: 'manageOrders', title: 'Manage Orders', icon: 'plus-minus',color:"#3F51B5" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        addServices: AddServices,
        manageServices: ManageServices,
        manageOrders: ManageOrders,
    });
    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

export default BottomNavigator_Admin

const styles = StyleSheet.create({})