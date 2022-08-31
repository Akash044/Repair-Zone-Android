import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { TextInput, Button, RadioButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useContext, useState } from 'react'
import { userContext } from '../../App';

const Checkout = ({ route, navigation }) => {
  const [bkashInfo, setBkashInfo] = useState({});
  const [checked, setChecked] = useState('first');
  const [checkOutInfo, setCheckOutInfo] = useState({})
  const [cartItems, setCartItems] = useContext(userContext);
  const [visible, setVisible] = useState(false);

  // const { cart } = route.params

  // console.log(cartItems.items)

  const inputHandler = (data) => {

    // console.log(cartItems.items)

    setCheckOutInfo({ ...checkOutInfo, ...data })

  }
  const bkashInputHandler = (data) => {
    setBkashInfo({ ...bkashInfo, ...data })


  }

  const placeOrder = () => {

    if (checked === 'second') {
      console.log('second')
      setVisible(true);
      const newValue1 = { ...checkOutInfo, ...bkashInfo, paymentMethod: "bkash", status: "pending" }
      // setCheckOutInfo(newValue)
      fetch('http://localhost:8085/placeOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newValue1, items: cartItems.items }),
      })
        .then(res => res.json())
        .then(data => {
          console.log("from checkout---> ", data)
          // setLoggedUser({...data.info,...loggedUser,isLogged:true});
          // setError(data.message);
          setVisible(false);
          data && alert('Order placed successfully')

        })
        .catch(err => {
        })
    } else {
      console.log("first")
      setVisible(true);
      const newValue = { ...checkOutInfo, paymentMethod: "cash", status: "pending" }
      // setCheckOutInfo(newValue)

      fetch('http://localhost:8085/placeOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newValue, items: cartItems.items }),
      })

        .then(res => res.json())
        .then(data => {
          console.log("from checkout---> ", data)
          // setLoggedUser({...data.info,...loggedUser,isLogged:true});
          // setError(data.message);
          setVisible(false);
          data && alert('Order placed successfully')

        })
        .catch(err => {
        })
    }

    console.log(",", checkOutInfo, checked)

    setTimeout(() => {
      // fetch('http://localhost:8085/placeOrder', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...checkOutInfo, items: cartItems.items }),
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log("from checkout---> ", data)
      //     // setLoggedUser({...data.info,...loggedUser,isLogged:true});
      //     // setError(data.message);
      //     // setVisible(false);
      //     data && alert('Order placed successfully')

      //   })
      //   .catch(err => {
      //   })
    }, 1000)

  }
  return (
    <>
      <ScrollView style={{ flex: 3 }}>
        <Text>Checkout</Text>
        <TextInput
          label="Name"
          // value={text}
          onChangeText={text => inputHandler({ name: text })}
        />
        <TextInput
          label="Email"
          // value={text}
          onChangeText={text => inputHandler({ email: text })}
        />
        <TextInput
          label="Mobile"
          // value={text}
          onChangeText={text => inputHandler({ mobile: text })}
        />
        <TextInput
          label="Address"
          // value={text}
          onChangeText={text => inputHandler({ address: text })}
        />
      </ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
      <View>
        {
          checked === 'second' &&
          <>
            <TextInput
              label="Mobile"
              // value={text}
              onChangeText={text => bkashInputHandler({ bkashNumber: text })}
            />
            <TextInput
              label="Transaction ID"
              // value={text}
              onChangeText={text => bkashInputHandler({ trxID: text })}
            />
          </>
        }
      </View>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 8 }} >
        {!visible && <Button mode="contained" onPress={placeOrder}>
          <MaterialCommunityIcons name="text-box-check-outline" color="white" size={14} />
          Place order
        </Button>}
        {
          visible && <ActivityIndicator />
        }
      </View>
    </>
  )
}

export default Checkout

const styles = StyleSheet.create({})