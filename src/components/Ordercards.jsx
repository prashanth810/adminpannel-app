import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const getStatusStyle = (status) => {
    const key = status?.toLowerCase() || "";
    if (key.includes("delivered") || key.includes("completed")) return { bg: 'bg-green-100', text: 'text-green-700' };
    if (key.includes("cancel")) return { bg: 'bg-red-100', text: 'text-red-600' };
    if (key.includes("pending") || key.includes("processing")) return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
    if (key.includes("shipped") || key.includes("out")) return { bg: 'bg-blue-100', text: 'text-blue-700' };
    return { bg: 'bg-gray-100', text: 'text-gray-500' };
};

const Ordercards = ({ item }) => {

    const navigation = useNavigation();
    const statusStyle = getStatusStyle(item.status);
    const totalAmount = item.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);

    const hanelcheckdetails = (id) => {
        navigation.navigate("orderdetails", {
            orderId: id,
        })
    };

    return (
        <TouchableOpacity className='bg-white border border-gray-200 mt-2 mx-2 rounded-lg overflow-hidden' onPress={() => hanelcheckdetails(item?._id)}>

            {/* Header */}
            <View className='flex-row items-center justify-between px-3 py-3 border-b border-gray-100'>
                <Text className='text-xs font-semibold text-gray-700'>
                    Order #{item._id.slice(0, 10)}
                </Text>
                <View className={`px-2 py-1 rounded-full ${statusStyle.bg}`}>
                    <Text className={`text-xs font-semibold ${statusStyle.text}`}>
                        {item.status}
                    </Text>
                </View>
            </View>

            {/* Items list */}
            <View className='px-4 py-3 gap-3'>
                {item.items.map((product) => (
                    <View key={product._id} className='flex-row items-center gap-3'>
                        <Image
                            source={{ uri: product.productId?.imageurl }}
                            className='w-12 h-12 rounded-lg bg-gray-100'
                            resizeMode='cover'
                        />
                        <View className='flex-1'>
                            <Text className='text-sm font-semibold text-gray-800'>
                                {product.name}
                            </Text>
                            <Text className='text-xs text-gray-500 mt-0.5'>
                                Qty: {product.quantity}  •  ₹{product.price.toLocaleString()}
                            </Text>
                        </View>
                        <Text className='text-sm font-bold text-gray-800'>
                            ₹{(product.price * product.quantity).toLocaleString()}
                        </Text>
                    </View>
                ))}
            </View>

            {/* Footer */}
            <View className='flex-row items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-100'>
                <Text className='text-xs text-gray-500'>
                    {item.address?.locality}  •  {item.items.length} item{item.items.length === 1 ? '' : 's'}
                </Text>
                <Text className='text-sm font-bold text-gray-900'>
                    ₹{totalAmount.toLocaleString()}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

export default Ordercards

const styles = StyleSheet.create({})