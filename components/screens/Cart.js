import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { DataTable } from 'react-native-paper';
import CustomBottomNavBar from './CustomBottomNavBar'
import { userContext } from '../../App';

const Cart = (props) => {
  const [cartItems, setCartItems] = useContext(userContext);
  const [showItems, setShowItems] = useState([])
  const [distinctItems, setDistinctItems] = useState([])
  const [counts, setCounts] = useState({})
  console.log("all cart items--> ", cartItems)
  // let counts = {}
  useEffect(() => {
    // setCounts({})
    const distinctItem = cartItems.items.filter((item, index, self) => self.indexOf(item) === index)
    setDistinctItems(distinctItem)

    cartItems.items.forEach((i) => counts[i.name] = (counts[i.name] || 0) + 1);

    // distinctItems.map((item, index, self) => {
    //   const newItem = {...item,count:counts[item.name]}
    //   // console.log("from update--> ",)
    //   setShowItems([...showItems,newItem])
    //   console.log("showItems list-->",showItems)

    // })
    // console.table(distinctItem)
  }, [cartItems.items.length])
  console.log("after update-->", distinctItems, counts)
  return (<>
    <View>
      <DataTable >
        <DataTable.Header>
          <DataTable.Title>SI.</DataTable.Title>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title numeric>Count</DataTable.Title>
          <DataTable.Title numeric>Price</DataTable.Title>
        </DataTable.Header>
        {
          distinctItems.map((item, index, self) =>

            <DataTable.Row key={index}>
              <DataTable.Cell>{index + 1}</DataTable.Cell>
              <DataTable.Cell numeric>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>{counts[item.name]}</DataTable.Cell>
              <DataTable.Cell numeric>{counts[item.name]*item.price}</DataTable.Cell>
            </DataTable.Row>

          )
        }
      </DataTable>

    </View>
    {/* <CustomBottomNavBar /> */}
  </>
  )
}

export default Cart

const styles = StyleSheet.create({})