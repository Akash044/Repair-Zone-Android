import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import { Text, TouchableRipple, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { userContext } from '../../App';

const CustomBottomNavBar = () => {
    const navigation = useNavigation()
    const [cartItems, setCartItems] = useContext(userContext);

    const [visible, setVisible] = useState(false);


    return (
        <View style={styles.containerMain}>
            {visible &&
                <View style={{ marginBottom: 50 }}>
                    <Menu.Item icon="login" onPress={() => { navigation.navigate("Login") }} title="Login" />
                    <Menu.Item icon="plus" onPress={() => { navigation.navigate("Registration") }} title="Registration" />
                    <Menu.Item icon="content-cut" onPress={() => { }} title="Cut" disabled />
                    <Menu.Item icon="content-copy" onPress={() => { }} title="Copy" disabled />
                    <Menu.Item icon="content-paste" onPress={() => { }} title="Paste" />
                </View>
            }
            <View style={styles.bottomView}>
                <TouchableRipple style={styles.textContainer} onPress={() => { navigation.navigate("Home") }}>
                    <>
                        <Text >Home</Text>
                        <MaterialCommunityIcons name="home" color="#000" size={26} />
                    </>
                </TouchableRipple>
                <TouchableRipple style={styles.textContainer} onPress={() => { navigation.navigate("Cart") }}>
                    <>
                        <Text >Cart: {cartItems.items.length}</Text>
                        <MaterialCommunityIcons name="cart" color="#000" size={26} />
                    </>
                </TouchableRipple>
                <TouchableRipple style={styles.textContainer} onPress={() => { setVisible(!visible) }}>
                    <>
                        <Text >Menu</Text>
                        <MaterialCommunityIcons name="menu" color="#000" size={26} />
                    </>
                </TouchableRipple>
            </View>
        </View>
    )
}

export default CustomBottomNavBar

const styles = StyleSheet.create({
    containerMain: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        width: '100%',
        height: 54,
        backgroundColor: '#EE5407',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute', //Here is the trick
        bottom: 0, //Here is the trick
        flexDirection: 'row',
    },
    textContainer: {
        paddingHorizontal: 16,
        fontWeight: 'bold',
        justifyContent: "center", alignItems: "center"
    }
})