import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Orderscreen from '../screens/orders/Orderscreen';
import Orderdetails from '../screens/orders/Orderdetails';


const Stack = createNativeStackNavigator();

const Ordernavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='order' component={Orderscreen}
                options={{ title: "Orders" }} />

            <Stack.Screen name='orderdetails' component={Orderdetails}
                options={{ title: "Order Details" }} />
        </Stack.Navigator>
    )
}

export default Ordernavigator

const styles = StyleSheet.create({})