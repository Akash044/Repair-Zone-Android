import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, RefreshControl,StyleSheet } from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Provider,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import { userContext } from '../../App';
import EachService from './EachService';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  })
}


const ManageOrders = () => {
  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [allServices, setAllServices] = useState([]);
  const [visible, setVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [netStatus, setNetStatus] = useState(true);
  const { deleted } = loggedUser;

  const containerStyle = { marginHorizontal: 30, borderRadius: 10, backgroundColor: 'white', padding: 20, zIndex: 99 };

  const onRefresh = () => {
    NetInfo.addEventListener(networkState => {
      setNetStatus(networkState.isConnected)
    });
    setRefreshing(true)
    setVisible(true);
    fetch('https://intense-ridge-49211.herokuapp.com/allRooms')
      .then(res => res.json())
      .then(rooms => {
        setAllServices(rooms);
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
    NetInfo.addEventListener(networkState => {
      setNetStatus(networkState.isConnected)
    });

    setVisible(true);
    fetch('https://intense-ridge-49211.herokuapp.com/allRooms')
      .then(res => res.json())
      .then(services => {
        setAllServices(services);
        setVisible(false);

      })
      .catch(err => { console.log(err) })
  }, []);


  useEffect(() => {
    setVisible(true);
    const restServices = allServices.filter(service=> service._id != deleted);
    setAllServices(restServices);
    setVisible(false);
  }, [deleted])


  const renderItem = ({ item }) => <EachService item={item} />;
  return (<>

    {/* <View>
      {allServices.length ? <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={allServices}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      /> : <Text style={{ fontSize: 30 }}>Empty room</Text>
      }

    </View>
    <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
          {!netStatus ? <Text style={{ marginTop: 250, color: "red" }}>Network failed. Please connect your device to network</Text> : <><Text>Loading....Please wait.</Text><ActivityIndicator style={{ paddingTop: 10 }} animating={true} color={Colors.red800} /></>}
        </Modal>
      </Portal>
    </Provider> */}
  </>
  );
};

export default ManageOrders

const styles = StyleSheet.create({})