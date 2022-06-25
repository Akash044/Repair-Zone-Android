import { StyleSheet, View, ScrollView } from 'react-native';
import { RadioButton, Text, Button, Avatar, Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { dummyData } from '../assets/dummyData';
import EachCard from './EachCard';
import CustomBottomNavBar from '../screens/CustomBottomNavBar';

const Home = () => {
  const [value, setValue] = useState('first');
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [searchResult, setSearchResult] = useState({});
  // console.log(dummyData)
  const [dummyItems, setDummyItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query);
    console.log(query);
    const searchText = query.toLowerCase();
    const matchedItems = selectedItems.filter(item => {
      const itemName = item.name.toLowerCase();
      return itemName.indexOf(searchText) > -1;
    });
    console.log(matchedItems);
    setSearchResult(matchedItems);
  };

  useEffect(() => {
    setDummyItems(dummyData);
  }, []);

  const handleSelectionOption = option => {
    const selectedCat = dummyItems.filter(item => item.category == option);
    setSelectedItems(selectedCat[0].items);
    setSearchResult(selectedCat[0].items);

    setValue(option);
    setShow(false);
    setSelected(true);
  };
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button mode="outlined" onPress={() => setShow(true)}>
          {!selected ? 'Select option' : value}
        </Button>
        {selectedItems.length && (
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        )}
      </View>
      {show && (
        <ScrollView style={{ elevation: 2, borderRadius: 10, padding: 10 }}>
          <RadioButton.Group
            onValueChange={newValue => handleSelectionOption(newValue)}
            value={value}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="AC" />
              <Text>AC</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="second" />
              <Text>second</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="third" />
              <Text>third</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="fourth" />
              <Text>fourth</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="fifth" />
              <Text>fifth</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="first" />
              <Text>First</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="second" />
              <Text>second</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="third" />
              <Text>third</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="fourth" />
              <Text>fourth</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="fifth" />
              <Text>fifth</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="first" />
              <Text>First</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="second" />
              <Text>second</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="third" />
              <Text>third</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="fourth" />
              <Text>fourth</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="fifth" />
              <Text>fifth</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="fourth" />
              <Text>fourth</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton value="fifth" />
              <Text>fifth</Text>
            </View>
          </RadioButton.Group>
        </ScrollView>
      )}
      <ScrollView >
        {selected &&
          searchResult.map(
            (value, index) => <EachCard key={index} data={value} />,
            // <View key={index} style={{ width: "47%", height: "40%", padding: 5, borderWidth: 1, margin: 5, borderRadius: 8 }}>
            //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            //     <Text>{value.name}</Text>
            //     <Text>{value.price}</Text>
            //   </View>
            // </View>
          )}
      </ScrollView>
      {/* <CustomBottomNavBar /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
