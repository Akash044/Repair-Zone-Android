import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DataTable, TouchableRipple, Button } from 'react-native-paper';
import CustomBottomNavBar from './CustomBottomNavBar'
import { userContext } from '../../App';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = (props) => {
  const [cartItems, setCartItems] = useContext(userContext);
  const [showItems, setShowItems] = useState([])
  const [distinctItems, setDistinctItems] = useState([])
  const [counts, setCounts] = useState({})
  const navigation = useNavigation()
  console.log("all cart items--> ", cartItems.items)

  useEffect(() => {

    let uniqueObjArray = [
      ...new Map(cartItems.items.map((item) => [item["name"], item])).values(),
    ];
    // console.log(uniqueObjArray)
    setDistinctItems(uniqueObjArray)
    cartItems.items.forEach((i) => counts[i.name] = (counts[i.name] || 0) + 1);

  }, [cartItems.items.length])
  // console.log("after update-->", distinctItems, counts)
  const handleRemoveItems = (name) => {

    const afterRemove = distinctItems.filter(item => item.name != name)
    // console.log("after remove-->", afterRemove)
    setDistinctItems(afterRemove)
    setCounts({})
    setCartItems({ ...cartItems, items: afterRemove })

    // cartItems.items.forEach((i) => counts[i.name] = (counts[i.name] || 0) + 1);

  }
  const handlePlusBtn = (id) => {
    console.log(id)
    const newItem = distinctItems.filter(item => item.id === id);
    setCounts({})
    setCartItems({ ...cartItems, items: [newItem[0], ...cartItems.items] })
    cartItems.items.forEach((i) => counts[i.name] = (counts[i.name] || 0) + 1);
  }

  const handleMinusBtn = (id) => {
    console.log(id)
    const restItems = distinctItems.filter(item => item.id !== id);
    setCounts({})
    setCartItems({ ...cartItems, items: restItems })
    cartItems.items.forEach((i) => counts[i.name] = (counts[i.name] || 0) + 1);
  }

  return (
    <>
      <View style={{ flex: 3 }}>
        <DataTable >
          <DataTable.Header>
            <DataTable.Title>SI.</DataTable.Title>
            <DataTable.Title>Title</DataTable.Title>
            <DataTable.Title numeric>Count</DataTable.Title>
            <DataTable.Title numeric>Price</DataTable.Title>
            <DataTable.Title numeric>Action</DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {
              distinctItems.map((item, index, self) =>

                <DataTable.Row key={index} style={{ marginVertical: 16 }}>
                  <DataTable.Cell>{index + 1}</DataTable.Cell>
                  <DataTable.Cell style={{ marginRight: 8 }}>{item.name}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableRipple
                        onPress={() => handlePlusBtn(item.id)}
                        rippleColor="rgba(0, 0, 0, .32)"
                        style={{ padding: 4 }}
                      >
                        <MaterialCommunityIcons name="plus" color="#000" size={12} />
                      </TouchableRipple>

                      <Text style={{ paddingHorizontal: 4 }}>{counts[item.name]}</Text>
                      <TouchableRipple
                        onPress={() => handleMinusBtn(item.id)}
                        rippleColor="rgba(0, 0, 0, .32)"
                        style={{ padding: 4 }}
                      >
                        <MaterialCommunityIcons name="minus" color="#000" size={12} />
                      </TouchableRipple>
                    </View>
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{counts[item.name] * item.price}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <TouchableRipple
                      onPress={() => handleRemoveItems(item.name)}
                      rippleColor="rgba(0, 0, 0, .32)"
                      style={{ padding: 4 }}
                    >
                      <MaterialCommunityIcons name="close-circle" color="red" size={14} />
                    </TouchableRipple>

                  </DataTable.Cell>
                </DataTable.Row>

              )
            }
          </ScrollView>
        </DataTable>


      </View>
      {/* <CustomBottomNavBar /> */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <Button mode="contained" onPress={() => { navigation.navigate("checkout") }}>
          <MaterialCommunityIcons name="text-box-check-outline" color="white" size={14} />
          Checkout
        </Button>
      </View>
    </>
  )
}

export default Cart

const styles = StyleSheet.create({})