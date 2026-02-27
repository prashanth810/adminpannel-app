import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Categoryscreen from '../screens/categories/Categoryscreen';
import AddCategoryscreen from '../screens/categories/AddCategoryscreen';
import Productslist from '../screens/peoducts/Productslist';
import { useRoute } from '@react-navigation/native';
import Addproducts from '../screens/peoducts/Addproducts';


const Stack = createNativeStackNavigator();

const Categorynavigator = () => {
    const route = useRoute();
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

            <Stack.Screen name='products' component={Productslist}
                options={{ title: "Products" }}
            // options={({ route }) => ({ title: `Products in ${route.params.categoryName}` })} 
            />

            <Stack.Screen name='addproducts' component={Addproducts}
                options={{ title: "Add product" }} />
        </Stack.Navigator>
    )
}

export default Categorynavigator;

const styles = StyleSheet.create({})