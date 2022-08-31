import { StyleSheet, View, ScrollView, FlatList, RefreshControl, Pressable } from 'react-native';
import { RadioButton, Text, Button, Avatar, Searchbar, Provider, Portal, Modal, ActivityIndicator, Colors } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { dummyData } from '../assets/dummyData';
import EachCard from './EachCard';
// import CustomBottomNavBar from '../screens/CustomBottomNavBar';
import NetInfo from "@react-native-community/netinfo";
// import EachService from '../admin/EachService';
// import { FlatList } from 'react-native-gesture-handler';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  })
}

const options = ["AC", "MOTOR", "FRIDGE", "RICE COOKER", "INDUCTION COOKER", "IRON"]

const Home = () => {
  const [value, setValue] = useState('first');
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [searchResult, setSearchResult] = useState({});
  // console.log(dummyData)
  const [dummyItems, setDummyItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');


  // const [loggedUser, setLoggedUser] = useContext(userContext);
  const [allServices, setAllServices] = useState([]);
  const [visible, setVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [netStatus, setNetStatus] = useState(true);



  const onChangeSearch = query => {
    setSearchQuery(query);
    // console.log(query);
    const searchText = query.toLowerCase();
    const matchedItems = selectedItems.filter(item => {
      const itemName = item.symptoms.toLowerCase();
      return itemName.indexOf(searchText) > -1;
    });
    // console.log(matchedItems);
    setSearchResult(matchedItems);
  };



  const onRefresh = () => {
    NetInfo.addEventListener(networkState => {
      setNetStatus(networkState.isConnected)
    });
    setRefreshing(true)
    setVisible(true);
    fetch('http://localhost:8085/allServices')
      .then(res => res.json())
      .then(services => {
        setAllServices(services);
        setVisible(false);
      })
      .catch(err => {

      })
    wait(4000).then(() => {
      setRefreshing(false);
    }
      , [refreshing]).catch(err => { console.log(err) })
  }



  useEffect(() => {
    // setDummyItems(dummyData);


    NetInfo.addEventListener(networkState => {
      setNetStatus(networkState.isConnected)
    });

    setVisible(true);
    fetch('http://localhost:8085/allServices')
      .then(res => res.json())
      .then(services => {
        // console.log(services)
        setAllServices(services);
        setVisible(false);

      })
      .catch(err => { console.log(err) })

  }, []);

  const handleSelectionOption = option => {
    // console.log(option)
    const selectedCat = allServices.filter(item => item.category == option);
    // console.log("selectedCat--->", selectedCat)
    setSelectedItems(selectedCat);
    setSearchResult(selectedCat);

    setValue(option);
    setShow(false);
    setSelected(true);
  };

  // console.log(selectedItems)

  const renderItem = ({ item }) => <EachCard item={item} />;
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button mode="outlined" onPress={() => setShow(true)}>
          {!selected ? 'Select option' : value}
        </Button>
        {
          selectedItems.length &&
          (
            <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
            />
          )
        }
      </View>
      <Provider>
        <Portal>
          <Modal visible={show} contentContainerStyle={styles.containerStyle}>
            {
              <ScrollView style={{ marginBottom: 8, elevation: 2 }}>
                <RadioButton.Group
                  onValueChange={newValue => handleSelectionOption(newValue)}
                  value={value}>
                  {
                    options.map(option => {
                      // console.log(option)
                      return (
                        <Pressable key={option} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                          <RadioButton value={option} />
                          <Text>{option}</Text>
                        </Pressable>
                      )
                    })
                  }
                </RadioButton.Group>
              </ScrollView>
            }
            <Button onPress={() => setShow(false)}>OK</Button>
          </Modal>
        </Portal>
      </Provider>


      <View style={{ zIndex: -10, marginBottom: 150 }}>

        {allServices.length ?
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={selected ? searchResult : allServices}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
          :
          <Text style={{ fontSize: 30 }}>Empty service</Text>
        }
        <Provider>
          <Portal>
            <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
              {!netStatus ? <Text style={{ justifyContent: 'center', alignItems: 'center', color: "red" }}>Network failed. Please connect your device to network</Text> : <><Text>Loading....Please wait.</Text><ActivityIndicator style={{ paddingTop: 10 }} animating={true} color={Colors.red800} /></>}
            </Modal>
          </Portal>
        </Provider>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  containerStyle: { marginHorizontal: 30, borderRadius: 10, backgroundColor: 'white', padding: 20, zIndex: 99 },
});
