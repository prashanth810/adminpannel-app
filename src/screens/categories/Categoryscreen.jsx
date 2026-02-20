import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const Categoryscreen = () => {
  const navigation = useNavigation();

  const handleaddcat = () => {
    navigation.navigate("addcategory");
  };


  return (
    <View className='flex-1 bg-gray-50'>
      <View className='py-4 px-3 flex-row items-center justify-between'>
        <Text className='text-xl font-bold'> Categories </Text>

        <TouchableOpacity className='bg-blue-500 px-3 py-2 flex-row gap-2 rounded-lg' onPress={handleaddcat}>
          <Text>
            <AntDesign name="plus-circle" size={16} color={"white"} />
          </Text>
          <Text className='text-white text-sm'>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Categoryscreen

const styles = StyleSheet.create({})