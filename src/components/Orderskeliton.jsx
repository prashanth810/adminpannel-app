import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'

const ITEMS = Array.from({ length: 7 });

const SkeletonItem = () => (
    <View className='bg-white border border-gray-200 mt-2 mx-2 px-4 py-5 rounded-lg'>
        <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center gap-3'>
                <View className='flex-col gap-6'>
                    <View className='flex-col gap-2'>
                        <View className='w-28 h-3 rounded bg-gray-200' />
                        <View className='w-40 h-3 rounded bg-gray-200' />
                    </View>

                    <View className='flex-col gap-2'>
                        <View className='w-20 h-3 rounded bg-gray-200' />
                        <View className='w-40 h-3 rounded bg-gray-200' />
                    </View>
                </View>
            </View>

            <View className='flex-col justify-end items-end gap-6'>
                <View className='w-16 h-7 bg-gray-200 rounded-full' />


                <View className='flex-col justify-end items-end  gap-2'>
                    <View className='w-12 h-3 rounded bg-gray-200' />
                    <View className='w-24 h-3 rounded bg-gray-200' />
                </View>
            </View>
        </View>
    </View>
);

const Orderskeliton = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 85 }}>
            {ITEMS.map((_, i) => (
                <SkeletonItem key={i} />
            ))}
        </ScrollView>
    )
}

export default Orderskeliton

const styles = StyleSheet.create({})