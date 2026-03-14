import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserCards = ({ item }) => {

    return (
        <View className='bg-white border border-gray-200 mt-2 mx-2 px-3 py-3 rounded-xl'>
            <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3'>
                    <View className='w-12 h-12 items-center justify-center rounded-full bg-gray-200' >
                        <Text className='text-lg font-bold text-gray-500 uppercase'>  {item.email.slice(0, 1)} </Text>
                    </View>
                    <View>
                        <View >
                            <Text className='text-base text-gray-500 font-semibold'> {item?.name ? item?.name : "Name is not provided "} </Text>
                        </View>
                        <View className='mt-1' >
                            <Text className='text-sm text-gray-400'> {item?.email ? item?.email : "Email is not provided "} </Text>
                        </View>
                    </View>
                </View>
                <View className='rounded-full bg-gray-200 p-2'>
                    {item?.role ? <Text className='text-sm font-medium'> {item?.role} </Text> : <Text className='text-sm font-semibold'> Role is not available </Text>}
                </View>
            </View>
        </View>
    )
}

export default UserCards

const styles = StyleSheet.create({})