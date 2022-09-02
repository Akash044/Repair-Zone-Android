import { StyleSheet, View } from 'react-native'
import React from 'react'
import RegForm from './RegForm'


const RegistrationPage = ({ navigation }) => {
  return (
    <View>
      <RegForm navigation={navigation} />
    </View>
  )
}

export default RegistrationPage

const styles = StyleSheet.create({})