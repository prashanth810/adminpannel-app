import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react';

const SKELETON_ITEMS = Array.from({ length: 3 });
const STATUS_ARRAY = Array.from({ length: 5 });

const SkeletonProductRow = memo(({ isLast }) => (
    <View>
        <View className='flex-row items-center gap-3 mt-3'>
            <View className='w-14 h-14 rounded-full bg-gray-200' />
            <View className='flex-1 gap-2'>
                <Text className='w-32 h-3 bg-gray-200 rounded' />
                <Text className='w-20 h-3 bg-gray-200 rounded mt-1' />
            </View>
            <Text className='w-24 h-3 bg-gray-200 rounded' />
        </View>
        {!isLast && <View className='h-px bg-gray-100 my-3' />}
    </View>
));

const Orderdetailskeliton = memo(() => {

    return (
        <>
            {/* Title */}
            <View className='px-4 pt-4 pb-2 gap-2'>
                <Text className='w-36 h-4 bg-gray-200 rounded' />
                <Text className='w-28 h-3 bg-gray-200 rounded mt-1' />
            </View>

            {/* Summary Card */}
            <View className='bg-white mx-4 mb-4 rounded-xl border border-gray-200 p-4'>

                <Text className='w-28 h-3 bg-gray-200 rounded' />
                <Text className='w-32 h-6 bg-gray-200 rounded mt-2' />

                <View className='h-px bg-gray-100 my-3' />

                <View className='flex-row justify-between items-center'>
                    <Text className='w-20 h-3 bg-gray-200 rounded' />
                    <Text className='w-16 h-3 bg-gray-200 rounded' />
                </View>

                <View className='h-px bg-gray-100 my-3' />

                <View className='flex-row justify-between items-center'>
                    <Text className='w-16 h-3 bg-gray-200 rounded' />
                    <Text className='w-36 h-3 bg-gray-200 rounded' />
                </View>

                <View className='h-px bg-gray-100 my-3' />

                <View className='flex-row justify-between items-center'>
                    <Text className='w-20 h-3 bg-gray-200 rounded' />
                    <Text className='w-16 h-3 bg-gray-200 rounded' />
                </View>

                <View className='h-px bg-gray-100 my-3' />

                <Text className='w-24 h-3 bg-gray-200 rounded' />
                <Text className='w-full h-14 bg-gray-200 rounded mt-2' />

            </View>

            {/* Items Title */}
            <Text className='w-16 h-4 mx-4 bg-gray-200 rounded mb-2' />

            {/* Items Card */}
            <View className='mx-4 border border-gray-200 rounded-xl px-3 pb-3'>
                {SKELETON_ITEMS.map((_, id) => (
                    <SkeletonProductRow
                        key={id}
                        isLast={id === SKELETON_ITEMS.length - 1}
                    />
                ))}
            </View>

            {/* Status Buttons - horizontal scroll */}
            <View className='absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2'>
                <FlatList
                    data={STATUS_ARRAY}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
                    renderItem={() => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className='py-3 px-10 rounded-lg border border-gray-200 bg-gray-100 items-center'
                        />
                    )}
                />
            </View>

        </>
    );
});

export default Orderdetailskeliton;

const styles = StyleSheet.create({});