import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Form from './Form';
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import { ScrollView } from 'react-native-gesture-handler';
// import SignIn from '../SignIn/SignIn';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
// } from '@react-native-google-signin/google-signin';
// import { userContext } from '../../App';

const LoginPage = () => {
  const [isDone, setIsDone] = useState(true);
  const [isSignIn, setIsSignIn] = useState(true);
  const handleLoginOrReg = () => {
    setIsSignIn(!isSignIn)

  }
  // const [loggedUser, setLoggedUser] = useContext(userContext);

  //   useEffect(() => {
  //     GoogleSignin.configure({
  //       scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  //       webClientId:
  //         '1055803709063-ahanmesrud8rahuv77275eplck978lso.apps.googleusercontent.com',
  //       offlineAccess: true,
  //       forceCodeForRefreshToken: true,
  //     });
  //   }, []);

  //   const handleGoogleSingIn = async () => {
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const userInfo = await GoogleSignin.signIn();
  //       isAdminHandle(userInfo);
  //     } catch (error) {
  //     }
  //   };

  //   const isAdminHandle = userInfo => {
  //     setIsDone(false);
  //     fetch(
  //       `https://intense-ridge-49211.herokuapp.com/isAdmin?email=${userInfo.user.email}`,
  //     )
  //       .then(res => res.json())
  //       .then(data => {
  //         if (data) {
  //           setLoggedUser({
  //             email: userInfo.user.email,
  //             id: userInfo.user.id,
  //             name: userInfo.user.name,
  //             photoUrl: userInfo.user.photo,
  //             isAdmin: true,
  //             isUser: false,
  //           });
  //         } else {
  //           fetch(
  //             `https://intense-ridge-49211.herokuapp.com/isUser?email=${userInfo.user.email}`,
  //           )
  //             .then(res => res.json())
  //             .then(data => {
  //               if (data) {
  //                 setLoggedUser({
  //                   email: userInfo.user.email,
  //                   id: userInfo.user.id,
  //                   name: userInfo.user.name,
  //                   photoUrl: userInfo.user.photo,
  //                   isAdmin: false,
  //                   isUser: true,
  //                 });
  //               } else {
  //                 alert('You are not an user, please book room');
  //                 setLoggedUser({
  //                   email: userInfo.user.email,
  //                   id: userInfo.user.id,
  //                   name: userInfo.user.name,
  //                   photoUrl: userInfo.user.photo,
  //                   isAdmin: false,
  //                   isUser: false,
  //                 });
  //               }
  //             })
  //             .catch(err => {console.log(err)})
  //         }
  //         setIsDone(true);
  //       })
  //       .catch(err => {console.log(err)})
  //   };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={{ marginTop: 10 }}>
        {isSignIn ?  <Form /> : <RegistrationPage />}
        <TouchableRipple
          onPress={() => handleLoginOrReg('Pressed')}
          rippleColor="rgba(181, 126, 220, .32)"
          style={{justifyContent: 'center',alignItems: 'center',padding: 20}}
        >
          <Text>{isSignIn ? "You don't have any account? Click Here." : "Have an account? Click Here."}</Text>
        </TouchableRipple>
      </ScrollView>
      {/* <View style={styles.GoogleBtn}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.small}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleSingIn}
          />
          {!isDone && <ActivityIndicator size="large" color="red" />}
        </View>     */}
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  GoogleBtn: {
    flex: 1,
    marginTop: 50
  },
  SignInView: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default LoginPage;
