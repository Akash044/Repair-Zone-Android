import { StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { RadioButton, Text, Button, Avatar, Card, Title, Paragraph, TouchableRipple } from 'react-native-paper';
import { userContext } from '../../App';
import { Icon } from 'react-native-elements'

const EachCard = (props) => {
    // console.log()
    const [cartItems, setCartItems] = useContext(userContext);
    const { name, cause, price } = props.data
    const handleAddToCart = (data) => {
        const newData = { ...data, expert: expert }
        setCartItems({ ...cartItems, items: [newData, ...cartItems.items] })
    }
    const [expert, setExpert] = useState('')
    const handleSelectExpert = (data) => {
        setExpert(data)
    }
    return (
        <Card style={{ margin: 5 }}>
            <Card.Cover source={{ uri: `https://picsum.photos/800` }} />

            <Card.Content>
                <Title>{name}</Title>
                <Paragraph style={{ color: 'black' }}>{cause}</Paragraph>
            </Card.Content>
            <Card.Title title={`Repair cost: ${price}$`} />
            <Card.Title title={`Select Expert:`} />
            <RadioButton.Group
                onValueChange={newValue => handleSelectExpert(newValue)}
                value={expert}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="Name1" />
                    <Text style={{ marginRight: 8 }}>Name1</Text>
                    <Icon
                        name='star'
                        type='material'
                        color='gold'
                    />
                    <Icon
                        name='star'
                        type='material'
                        color='gold'
                    />
                    <Icon
                        name='star'
                        type='material'
                        color='gold'
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="Name2" />
                    <Text style={{ marginRight: 8 }}>Name2</Text>
                    <Icon
                        name='star'
                        type='material'
                        color='gold'
                    />
                    <Icon
                        name='star'
                        type='material'
                        color='gold'
                    />
                    <Icon
                        name='star'
                        type='material'
                        color='gold'
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <RadioButton value="Name3" />
                    <Text style={{ marginRight: 8 }}>Name3</Text>
                    <Icon
                        name='star'
                        type='material'
                        color='gold'
                    />
                    <Icon
                        name='star'
                        type='material'
                        color='gold'
                    />
                    <Icon
                        name='star'
                        type='material'
                        color='gold'
                    />
                </View>
            </RadioButton.Group >
            <Card.Actions>
                <Button onPress={() => handleAddToCart(props.data)}>Add to Cart</Button>
                <Button>Order now</Button>
            </Card.Actions>
        </Card>
    )
}

export default EachCard

const styles = StyleSheet.create({})