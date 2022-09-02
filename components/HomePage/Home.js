import { StyleSheet, View, ScrollView, FlatList, RefreshControl, Pressable } from 'react-native';
import { RadioButton, Text, Button, Searchbar, Provider, Portal, Modal, ActivityIndicator, Colors } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import EachCard from './EachCard';
import NetInfo from "@react-native-community/netinfo";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  })
}

// const options = ["AC", "MOTOR", "FRIDGE", "RICE COOKER", "INDUCTION COOKER", "IRON"]

const Home = () => {
  const [value, setValue] = useState('first');
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [searchResult, setSearchResult] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const [allServices, setAllServices] = useState([]);
  const [visible, setVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [netStatus, setNetStatus] = useState(true);
  const [category, setCategory] = useState([]);



  const onChangeSearch = query => {
    setSearchQuery(query);
    const searchText = query.toLowerCase();
    const matchedItems = selectedItems.filter(item => {
      const itemName = item.symptoms.toLowerCase();
      return itemName.indexOf(searchText) > -1;
    });
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
        let arr = []
        services.forEach(service => {
          arr.push(service.category);
        })
        const onlyUnique = (value, index, self) => {
          return self.indexOf(value) === index;
        }
        const unique = arr.filter(onlyUnique);
        setCategory(unique)
      })
      .catch(err => { })

    wait(4000).then(() => {
      setRefreshing(false);
    }
      , [refreshing]).catch(err => { console.log(err) })
  }



  useEffect(() => {
    NetInfo.addEventListener(networkState => {
      setNetStatus(networkState.isConnected)
    });

    setVisible(true);
    fetch('http://localhost:8085/allServices')
      .then(res => res.json())
      .then(services => {
        setAllServices(services);
        setVisible(false);
        let arr = []
        services.forEach(service => {
          arr.push(service.category);
        })
        const onlyUnique = (value, index, self) => {
          return self.indexOf(value) === index;
        }
        const unique = arr.filter(onlyUnique);
        setCategory(unique)

      })
      .catch(err => { console.log(err) })

  }, []);

  const handleSelectionOption = option => {
    const selectedCat = allServices.filter(item => item.category == option);
    setSelectedItems(selectedCat);
    setSearchResult(selectedCat);

    setValue(option);
    setShow(false);
    setSelected(true);
  };

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
                    category.map(option => {
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
              {
                !netStatus ?
                  <Text style={{ justifyContent: 'center', alignItems: 'center', color: "red" }}>
                    Network failed. Please connect your device to network
                  </Text>
                  :
                  <>
                    <Text>Loading....Please wait.</Text>
                    <ActivityIndicator style={{ paddingTop: 10 }} animating={true} color={Colors.red800} />
                  </>
              }
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
  containerStyle: {
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    zIndex: 99
  },
});
