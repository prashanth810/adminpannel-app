import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Userscreen from '../screens/users/Userscreen';


const Stack = createNativeStackNavigator();

const Usernavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='user' component={Userscreen} />
        </Stack.Navigator>
    )
}

export default Usernavigator

const styles = StyleSheet.create({})