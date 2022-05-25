import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { RadioButton, Text, Button } from 'react-native-paper';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './components/HomePage/Home';
import LoginPage from './components/LoginPage/LoginPage';
import OTPPage from './components/OTPpage/OTPPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <SafeAreaProvider>
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home}
            options={{
              headerRight: () => (
                <Button
                  // onPress={() =>handleNavBarBtn()}
                  mode="outlined"
                >Login</Button>
              ),
            }}

          />
          <Stack.Screen name="OTPPage" component={OTPPage} />
          <Stack.Screen name="login" component={LoginPage} />

        </Stack.Navigator>
      </NavigationContainer> */}
      {/* <loginModal /> */}
      {/* <Home /> */}
      <LoginPage />
      {/* <RegistrationPage /> */}
      {/* <OTPPage /> */}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
