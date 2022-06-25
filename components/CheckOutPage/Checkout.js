import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button, RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react'

const Checkout = () => {
  const [text, setText] = React.useState("");
  const [checked, setChecked] = React.useState('first');
  return (
    <>
      <View style={{ flex: 3 }}>
        <Text>Checkout</Text>
        <TextInput
          label="Name"
          value={text}
          onChangeText={text => setText(text)}
        />
        <TextInput
          label="Email"
          value={text}
          onChangeText={text => setText(text)}
        />
        <TextInput
          label="Mobile"
          value={text}
          onChangeText={text => setText(text)}
        />
        <TextInput
          label="Address"
          value={text}
          onChangeText={text => setText(text)}
        />
      </View>
      <View>
        <>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Text>Cash on service</Text>
        </>
        <>
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('second')}
          />
          <Text>Bkash</Text>
        </>


      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Button mode="contained" onPress={() => { }}>
          <MaterialCommunityIcons name="text-box-check-outline" color="white" size={14} />
          Place order
        </Button>
      </View>
    </>
  )
}

export default Checkout

const styles = StyleSheet.create({})