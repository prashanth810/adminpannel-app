import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'

const ITEMS = Array.from({ length: 11 });

const SkeletonItem = () => (
    <View className='bg-white border border-gray-200 mt-2 mx-2 px-3 py-3 rounded-lg'>
        <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center gap-3'>
                <View className='w-12 h-12 rounded-full bg-gray-200' />
                <View>
                    <View className='w-40 h-3 rounded bg-gray-200' />
                    <View className='w-28 h-3 rounded bg-gray-200 mt-2' />
                </View>
            </View>
            <View className='w-8 h-8 rounded-full bg-gray-200' />
        </View>
    </View>
);

const LoaderSkeleton = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 85 }}>
            {ITEMS.map((_, i) => (
                <SkeletonItem key={i} />
            ))}
        </ScrollView>
    )
}

export default LoaderSkeleton

const styles = StyleSheet.create({})