import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Orderscreen from '../screens/orders/Orderscreen';


const Stack = createNativeStackNavigator();

const Ordernavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='order' component={Orderscreen} />
        </Stack.Navigator>
    )
}

export default Ordernavigator

const styles = StyleSheet.create({})