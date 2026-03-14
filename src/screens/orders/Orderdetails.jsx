import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchsingleorderdata } from '../../redux/slices/OrderSlice'
import Orderdetailskeliton from '../../components/Orderdetailskeliton'

const STATUS_OPTIONS = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

const Orderdetails = () => {
    const route = useRoute();
    const orderId = route?.params?.orderId;

    const dispatch = useDispatch();
    const { singleorderdata, singleorderloading, singleordererror } = useSelector((state) => state.order.singlrorder);

    useEffect(() => {
        dispatch(fetchsingleorderdata(orderId));
    }, [dispatch]);

    if (singleorderloading) {
        return (
            <Orderdetailskeliton />
        );
    }

    if (!singleorderdata || singleordererror) {
        return (
            <SafeAreaView className='flex-1 justify-center items-center bg-gray-50'>
                <Text className='text-sm text-gray-400'>Order not found.</Text>
            </SafeAreaView>
        );
    }

    const order = singleorderdata;
    const address = order.address || {};
    const totalAmount = order.totalAmount || 0;

    const formattedDate = order.createdAt
        ? new Date(order.createdAt).toLocaleString('en-IN', {
            day: 'numeric', month: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true,
        })
        : '—';

    const fullAddress = [
        address.flatNo,
        address.buildingName,
        address.street,
        address.landmark,
        address.locality,
        address.pincode,
        address.type,
    ].filter(Boolean).join(', ');

    const handleStatusChange = (status) => {
        // dispatch(updateorderstatus({ orderId: order._id, status }));
        Alert.alert(status);
    };

    return (
        <SafeAreaView className='flex-1 bg-gray-50'>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Title */}
                <View className='px-4 pt-4 pb-2'>
                    <Text className='text-xl font-bold text-gray-900'>
                        Order #{order._id?.slice(0, 8)}
                    </Text>
                    <Text className='text-xs text-gray-400 mt-1'>{formattedDate}</Text>
                </View>

                {/* Summary Card */}
                <View className='bg-white mx-4 mb-4 rounded-xl border border-gray-100 p-4'>

                    <Text className='text-xs text-gray-400'>Total</Text>
                    <Text className='text-2xl font-bold text-gray-900 mt-0.5'>
                        ₹{totalAmount.toLocaleString()}
                    </Text>

                    <View className='h-px bg-gray-50 my-3' />

                    <View className='flex-row justify-between items-center'>
                        <Text className='text-xs text-gray-400'>Status</Text>
                        <Text className='text-sm font-medium text-gray-700'>{order.status}</Text>
                    </View>

                    <View className='h-px bg-gray-50 my-3' />

                    <View className='flex-row justify-between items-center'>
                        <Text className='text-xs text-gray-400'>Payment</Text>
                        <Text className='text-sm font-medium text-gray-700'>{order.paymentMethod}</Text>
                    </View>

                    <View className='h-px bg-gray-50 my-3' />

                    <View className='flex-row justify-between items-center'>
                        <Text className='text-xs text-gray-400'> Email </Text>
                        <Text className='text-sm font-medium text-gray-700'>{order.userId?.email}</Text>
                    </View>

                    <View className='h-px bg-gray-50 my-3' />

                    <View className='flex-row justify-between items-center'>
                        <Text className='text-xs text-gray-400'> Mobile </Text>
                        <Text className='text-sm font-medium text-gray-700'>{order.address?.mobile}</Text>
                    </View>

                    <View className='h-px bg-gray-50 my-3' />

                    <Text className='text-xs text-gray-400 mb-1'>Address</Text>
                    <Text className='text-sm text-gray-600 leading-5'>{fullAddress}</Text>

                </View>

                {/* Items */}
                <Text className='text-base font-bold text-gray-900 px-4 mb-2'>Items</Text>

                <View className='bg-white mx-4 rounded-xl border border-gray-100 p-4'>
                    {order.items?.map((product, index) => (
                        <View key={product._id}>
                            <View className='flex-row items-center gap-3'>
                                <Image
                                    source={{ uri: product.productId?.imageurl }}
                                    className='w-12 h-12 rounded-lg bg-gray-100'
                                    resizeMode='cover'
                                />
                                <View className='flex-1'>
                                    <Text className='text-sm font-semibold text-gray-800' numberOfLines={1}>
                                        {product.name}
                                    </Text>
                                    <Text className='text-xs text-gray-400 mt-1'>
                                        Qty: {product.quantity}  •  ₹{product.price?.toLocaleString()}
                                    </Text>
                                </View>
                                <Text className='text-sm font-bold text-gray-900'>
                                    ₹{(product.price * product.quantity).toLocaleString()}
                                </Text>
                            </View>
                            {index < order.items.length - 1 && (
                                <View className='h-px bg-gray-100 my-3' />
                            )}
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* Status Buttons fixed at bottom */}
            <View className='absolute bottom-0 left-0 right-0 flex-row bg-white border-t border-gray-200 px-3 py-2 gap-2'>
                {STATUS_OPTIONS.map((status) => (
                    <TouchableOpacity
                        key={status}
                        activeOpacity={0.7}
                        className={`flex-1 py-2 rounded-lg border items-center ${order.status === status ? 'bg-gray-900 border-gray-900' : 'bg-gray-100 border-gray-200'}`}
                        onPress={() => handleStatusChange(status)}
                    >
                        <Text className={`text-xs font-semibold ${order.status === status ? 'text-white' : 'text-gray-500'}`}>
                            {status}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

        </SafeAreaView>
    );
};

export default Orderdetails;

const styles = StyleSheet.create({});