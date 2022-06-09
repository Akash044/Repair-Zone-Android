import { StyleSheet, View } from 'react-native'
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import React,{useState} from 'react'
import LoginPage from '../LoginPage/LoginPage';

const LoginModal = ({isShow}) => {
    const [visible, setVisible] = useState(isShow);

  const hideModal = () => setVisible(false);
    
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                    <LoginPage />
                </Modal>
            </Portal>
        </Provider>
    )
}

export default LoginModal

const styles = StyleSheet.create({})