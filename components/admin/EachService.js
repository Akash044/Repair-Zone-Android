import React, { useContext, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {
    Modal,
    Portal,
    Button,
    Provider,
    TextInput,
    Card, Title, Paragraph
} from 'react-native-paper';
import { userContext } from '../../App';

const EachService = (props) => {
    const { _id, title, category, cause, symptoms, price, contentType, img } = props.item;
    const [loggedUser, setLoggedUser] = useContext(userContext);
    const [visible, setVisible] = useState(false);
    const [updatedServiceInfo, setUpdatedServiceInfo] = useState({
        title: title,
        category: category,
        cause: cause,
        symptoms: symptoms,
        price: price,
    })

    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20, zIndex: 99 };

    const handleInputField = (value) => {
        setUpdatedServiceInfo({
            ...updatedServiceInfo, ...value
        })
    }


    const handleDeleteServiceBtn = serviceID => {
        fetch(`http://localhost:8085/deleteService/${serviceID}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                data && alert('Service deleted successfully');
                setLoggedUser({ ...loggedUser, deleted: serviceID });
            })
            .catch(err => { alert({ err }, 'Error updating room info.Try again later') })
    };

    const handleUpdateServiceModalBtn = () => {
        setVisible(true);
    }

    const handleUpdateServiceBtn = serviceID => {
        fetch(`http://localhost:8085/updateServiceInfo/${serviceID}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ serviceID: serviceID, ...updatedServiceInfo })
        })
            .then(res => res.json())
            .then(data => {
                setVisible(false);
                data && alert('Service info updated successfully');
            }).catch(err => {
                alert('Error updating service info. Try again later')
            })
    };


    return (
        <>
            <Card style={styles.item}>
                <Card.Cover source={{ uri: `data:${contentType};base64,${img}`, }} />
                <Card.Title title={`Title: ${title} `} />
                {/* <Card.Title title={`Title: ${_id} `} /> */}
                <Card.Content>
                    <Title>Cause:</Title>
                    <Paragraph>{cause}</Paragraph>
                </Card.Content>
                <View style={styles.btn}>

                    <Card.Actions>
                        <Button icon="update"
                            mode="contained"
                            color="green"
                            onPress={() => handleUpdateServiceModalBtn()}>
                            Update
                        </Button>
                    </Card.Actions>
                    <Card.Actions>
                        <Button icon="delete"
                            mode="contained"
                            color="red"
                            onPress={() => handleDeleteServiceBtn(_id)}>
                            Delete
                        </Button>
                    </Card.Actions>
                </View>
                <Provider style={styles.btn2}>
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                            <TextInput
                                label="Service title"
                                value={updatedServiceInfo.title}
                                onChangeText={text => handleInputField({ title: text })}
                            // keyboardType='numeric'
                            />
                            <TextInput
                                label="Cause:"
                                value={updatedServiceInfo.cause}
                                onChangeText={text => handleInputField({ cause: text })}
                            // keyboardType='numeric'
                            />
                            <TextInput
                                label="symptoms:"
                                value={updatedServiceInfo.symptoms}
                                onChangeText={text => handleInputField({ symptoms: text })}
                                multiline={true}
                            />
                            <TextInput
                                label="Price"
                                value={updatedServiceInfo.price}
                                onChangeText={text => handleInputField({ price: text })}
                                keyboardType='numeric'
                            />
                            <View>
                                <Button icon="update"
                                    mode="contained"
                                    color="green"
                                    style={{ marginTop: 10 }}
                                    onPress={() => handleUpdateServiceBtn(props.item._id)}>
                                    Update
                                </Button>
                                <Button icon="cancel"
                                    mode="contained"
                                    color="red"
                                    style={{ marginTop: 10 }}
                                    onPress={() => hideModal()}>
                                    Cancel
                                </Button>
                            </View>
                        </Modal>
                    </Portal>
                </Provider>

            </Card>

        </>
    )
}
const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        zIndex: -100
    },
    title: {
        fontSize: 18,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: -100
    },
    btn2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        zIndex: 100
    }
});
export default EachService
