import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categoryscreen from '../screens/categories/Categoryscreen';
import AddCategoryscreen from '../screens/categories/AddCategoryscreen';


const Stack = createNativeStackNavigator();

const Categorynavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: "#f03030"
            },
            headerTintColor: "white",
            headerTitleStyle: { fontWeight: "bold" }
        }}>
            <Stack.Screen name='categories' component={Categoryscreen} options={{ title: "Categories" }} />

            <Stack.Screen name='addcategory' component={AddCategoryscreen}
                options={{ title: "Add Category" }} />
        </Stack.Navigator>
    )
}

export default Categorynavigator;

const styles = StyleSheet.create({})