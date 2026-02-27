import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Productslist = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { categoryname, categoryId } = route?.params;

    const handleaddproducts = () => {
        navigation.navigate("addproducts", { categoryId })
    }
    return (
        <View className='flex-row items-center justify-between py-3 px-4'>
            <Text> {categoryname} Product {categoryId} </Text>
            <TouchableOpacity className='bg-blue-500 px-3 py-2 flex-row gap-2 rounded-lg' onPress={handleaddproducts}>
                <Text>
                    <AntDesign name="plus-circle" size={16} color={"white"} />
                </Text>
                <Text className='text-white text-sm'>
                    Add
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Productslist

const styles = StyleSheet.create({})