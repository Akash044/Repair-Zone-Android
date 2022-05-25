import { StyleSheet, View } from 'react-native'
import React from 'react'
import { RadioButton, Text, Button, Avatar, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';

const EachCard = ({ name, cause, price }) => {
    console.log(name, cause, price)
    return (
        <Card style={{ margin: 5 }}>
            <Card.Cover source={{ uri: `https://picsum.photos/700` }} />

            <Card.Content>
                <Title>{name}</Title>
                <Paragraph style={{ color: 'black' }}>{cause}</Paragraph>
            </Card.Content>
            <Card.Title title={price} />
            <Card.Actions>
                <Button onPress={() => "fdsF"}>Add to Cart</Button>
                <Button>Order now</Button>
            </Card.Actions>
        </Card>
    )
}

export default EachCard

const styles = StyleSheet.create({})