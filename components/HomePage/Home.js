import { StyleSheet, View, ScrollView } from 'react-native'
import { RadioButton, Text, Button, Avatar, Card, Title, Paragraph,TouchableRipple} from 'react-native-paper';
import React, { useState } from 'react'
import { dummyData } from '../assets/dummyData';
import EachCard from './EachCard';

const Home = () => {
  const [value, setValue] = useState('first');
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState({})
  console.log(dummyData)
  const [dummyItems, setDummyItems] = useState(dummyData)

  const handleSelectionOption = (option) => {
    setValue(option);
    setShow(false)
    setSelected(true)

    const selectedCat = dummyItems.filter((item) => item.category == option);
    console.log(selectedCat)
    setSelectedItem(selectedCat[0])

  }
  return (<>
    <Button mode="outlined" onPress={() => setShow(true)}>{
      !selected ? "Select option" : value
    }
    </Button>
    {
      show &&
      <ScrollView style={{ elevation: 2, borderRadius: 10, padding: 10 }}>
        <RadioButton.Group onValueChange={newValue => handleSelectionOption(newValue)} value={value} >
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="AC" />
            <Text>AC</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="second" />
            <Text>second</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="third" />
            <Text>third</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="fourth" />
            <Text>fourth</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="fifth" />
            <Text>fifth</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="first" />
            <Text>First</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="second" />
            <Text>second</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="third" />
            <Text>third</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="fourth" />
            <Text>fourth</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="fifth" />
            <Text>fifth</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="first" />
            <Text>First</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="second" />
            <Text>second</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="third" />
            <Text>third</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="fourth" />
            <Text>fourth</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="fifth" />
            <Text>fifth</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="fourth" />
            <Text>fourth</Text>

          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <RadioButton value="fifth" />
            <Text>fifth</Text>

          </View>

        </RadioButton.Group>
      </ScrollView>
    }
    <ScrollView>

      {selected && selectedItem.items.map((value, index) =>

        <EachCard key={index}  data={value} />
        // <View key={index} style={{ width: "47%", height: "40%", padding: 5, borderWidth: 1, margin: 5, borderRadius: 8 }}>
        //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        //     <Text>{value.name}</Text>
        //     <Text>{value.price}</Text>
        //   </View>
        // </View>
      )}
    </ScrollView>
  </>

  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  }
})