import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { RadioButton, Text, Button, Avatar, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import { userContext } from '../../App';

const EachCard = (props) => {
    // console.log()
    const [cartItems, setCartItems] = useContext(userContext);
    const {name, cause ,price} = props.data
    const handleAddToCart = (data) => {
          setCartItems({...cartItems,items: [data,...cartItems.items]})
    }
    return (
        <Card style={{ margin: 5 }}>
            <Card.Cover source={{ uri: `https://picsum.photos/700` }} />

            <Card.Content>
                <Title>{name}</Title>
                <Paragraph style={{ color: 'black' }}>{cause}</Paragraph>
            </Card.Content>
            <Card.Title title={`Repair cost: ${price}`} />
            <Card.Actions>
                <Button onPress={() => handleAddToCart(props.data)}>Add to Cart</Button>
                <Button>Order now</Button>
            </Card.Actions>
        </Card>
    )
}

export default EachCard

const styles = StyleSheet.create({})