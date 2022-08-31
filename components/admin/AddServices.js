import React, { useContext, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import { Modal, Portal, Text, Button, Provider, TextInput, ActivityIndicator, Colors } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Formik } from 'formik';
import * as yup from 'yup';
import { userContext } from '../../App';

const signUpValidationSchema = yup.object().shape({
  title: yup.string().required('Title no. is Required'),
  cause: yup.string().required('Cause is Required'),
  price: yup.string().required('Price is Required'),
  symptoms: yup.string().required('symptoms are Required'),

});


const AddServices = () => {

  const [loggedUser, setLoggedUser] = useContext(userContext);
  const [imageData, setImageData] = useState({});
  const [takenImage, setTakenImage] = useState(false)
  const [visible, setVisible] = useState(false);
  const [newServiceInfo, setNewServiceInfo] = useState({
    category: "AC",
  });

  const containerStyle = {
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 20,
    zIndex: 99
  };
  const handlePickerField = (value) => {
    console.log(value)
    setNewServiceInfo({ ...newServiceInfo, ...value });
  }
  const handleImgInput = () => {
    const options = {
      includeBase64: true,
    };
    try {
      launchImageLibrary(options, response => {
        if (!response.didCancel) {
          setImageData({ ...response.assets[0] });
          setTakenImage(true)
        }
      })
    } catch (err) {
      alert("something went wrong, please try again")
    }
  };

  const handleAddRoom = async (value) => {
    setVisible(true);
    await fetch('http://localhost:8085/addService', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newServiceInfo, ...value, ...imageData }),
    })
      .then(res => res.json())
      .then(data => {
        setVisible(false);
        data && alert('Service added successfully!');
        setLoggedUser({ ...loggedUser, addedNew: value.name })

      })
      .catch(err => { console.log(err) })
  };

  return (<>
    <ScrollView >

      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          title: '',
          cause: '',
          price: '',
          symptoms: ''

        }}
        onSubmit={values => handleAddRoom(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>

            <TextInput
              placeholder="Enter Service Name"
              leftIcon={<Icon name="sign-in" size={24} color="black" />}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            // keyboardType='numeric'
            />
            {errors.name && (
              <Text style={{ fontSize: 14, color: 'red' }}>{errors.name}</Text>
            )}
            <View>
              <Text>Select category</Text>
              <Picker
                selectedValue={newServiceInfo.category}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>
                  handlePickerField({ category: itemValue })
                }>
                <Picker.Item label="AC" value="AC" />
                <Picker.Item label="Refrigerator" value="Refrigerator" />
                <Picker.Item label="Motor" value="Motor" />
              </Picker>
            </View>
            <TextInput
              placeholder="Enter cause"
              leftIcon={<Icon name="user" size={24} color="black" />}


              onChangeText={handleChange('cause')}
              onBlur={handleBlur('cause')}
              value={values.cause}
              multiline={true}
            />
            {errors.cause && (
              <Text style={{ fontSize: 14, color: 'red' }}>{errors.cause}</Text>
            )}
            <TextInput
              placeholder="Enter symptoms"
              leftIcon={<Icon name="user" size={24} color="black" />}


              onChangeText={handleChange('symptoms')}
              onBlur={handleBlur('symptoms')}
              value={values.symptoms}
              multiline={true}
            />
            {errors.symptoms && (
              <Text style={{ fontSize: 14, color: 'red' }}>{errors.symptoms}</Text>
            )}
            <TextInput
              placeholder="Enter price"
              leftIcon={<Icon name="price" size={24} color="black" />}


              onChangeText={handleChange('price')}
              onBlur={handleBlur('price')}
              value={values.price}
            // multiline={true}
            />
            {errors.price && (
              <Text style={{ fontSize: 14, color: 'red' }}>{errors.price}</Text>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              {imageData?.uri && (
                <Image
                  source={{ uri: imageData.uri }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              )}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              <Button
                icon="image"
                mode="outlined"
                onPress={handleImgInput}
              >Upload service image </Button>
            </View>
            {takenImage && <View
              style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, zIndex: -110 }}>
              <Button icon="plus" mode="contained"
                onPress={handleSubmit}
                disabled={!isValid}
              >Add Service </Button>
            </View>}
          </>
        )}
      </Formik>
    </ScrollView>

    <Provider>
      <Portal>
        <Modal visible={visible} contentContainerStyle={containerStyle}>
          <Text>Uploading service information. Please wait</Text>
          <ActivityIndicator style={{ paddingTop: 10 }} animating={true} color={Colors.red800} />
        </Modal>
      </Portal>
    </Provider>
  </>
  );
};

export default AddServices;
