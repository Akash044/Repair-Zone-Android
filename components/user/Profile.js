import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { userContext } from '../../App';

const Profile = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const { name, email, img, contentType } = loggedUser
  return (
    <View>
      <View>
        <Image
          // style={styles.logo}
          source={{
            uri: `data:${contentType};base64,${img}`,
          }}
        />
      </View>
      <Text>{name}</Text>
      <Text>{email}</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})