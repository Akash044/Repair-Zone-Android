import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useState } from 'react';
import { StyleSheet, View, SafeAreaView, } from 'react-native';
import { RadioButton, Text, Button, TextInput } from 'react-native-paper';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './components/HomePage/Home';
import Cart from './components/screens/Cart'
import LoginPage from './components/LoginPage/LoginPage';
import OTPPage from './components/OTPpage/OTPPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import BottomNavigation_Home from './components/screens/BottomNavigation-Home';
import LoginModal from './components/screens/LoginModal'
import BottomNavigator_Admin from './components/screens/BottomNavigator_Admin';
import BottomNavigator_User from './components/screens/BottomNavigator_User';
import CustomBottomNavBar from './components/screens/CustomBottomNavBar';
import Checkout from './components/CheckOutPage/Checkout';
import ShowAllOrders from './components/user/ShowAllOrders';
import Profile from './components/user/Profile';

const Stack = createNativeStackNavigator();
export const userContext = createContext();

const App = () => {
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ delete: 0, items: [], totalItem: 0 });
  console.log(userInfo.user);

  const signOut = () => {
    setUserInfo({ ...userInfo, isLogged: false, admin: false })
  }

  return (
    <userContext.Provider value={[userInfo, setUserInfo]}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            {userInfo.isLogged ?
              (
                userInfo.admin ?
                  <Stack.Screen name="Admin"

                    options={{
                      headerRight: () => (
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ paddingTop: 5 }}>
                            <Text>{userInfo.name} </Text>
                          </View>
                          <View style={{ paddingRight: 5 }}>
                            <Button mode="outlined" onPress={signOut}>logout</Button>

                          </View>
                        </View>
                      ),
                    }}

                    component={BottomNavigator_Admin} />
                  :
                  <>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Cart" component={Cart} />
                    <Stack.Screen name="checkout" component={Checkout} />
                    <Stack.Screen name="allOrders" component={ShowAllOrders} />
                    <Stack.Screen name="profile" component={Profile} />
                    <Stack.Screen name="Login" component={LoginPage} />
                  </>
              )
              :
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="checkout" component={Checkout} />
                <Stack.Screen name="OTPPage" component={OTPPage} />
                <Stack.Screen name="Registration" component={RegistrationPage} />
                <Stack.Screen name="Login" component={LoginPage} />
              </>
            }
          </Stack.Navigator>
          {
            !userInfo.admin &&
            <CustomBottomNavBar user={userInfo.user} />
          }
        </NavigationContainer>
      </SafeAreaProvider>
    </userContext.Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
// adb -s emulator-5554 reverse tcp:8085 tcp:8085