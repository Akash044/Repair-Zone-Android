import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import RegForm from './RegForm'
import { userContext } from '../../App';

const RegistrationPage = ({ navigation}) => {
  const [userInfo, setUserInfo] = useContext(userContext);
  // console.log(navigation)
  return (
    <View>
      <RegForm  navigation={navigation}/>
    </View>
  )
}

export default RegistrationPage

const styles = StyleSheet.create({})