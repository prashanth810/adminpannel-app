import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { fetchallorders } from '../../redux/slices/OrderSlice'
import Orderskeliton from '../../components/Orderskeliton'
import Ordercards from '../../components/Ordercards'


const Orderscreen = () => {

    const dispatch = useDispatch();
    const { ordersdata, orderloading, ordererror } = useSelector((state) => state.order.allordersdata)

    useEffect(() => {
        dispatch(fetchallorders());
    }, [dispatch]);


    return (
        <SafeAreaView>
            <View className='px-2'>
                <Text className='text-xl font-bold text-center py-3'> Orders  </Text>
                {ordersdata && (
                    <Text className='text-[#5e5e5e] text-lg font-semibold'> Showing {ordersdata?.length} order{ordersdata?.length === 1 ? "" : "s"} </Text>
                )}
            </View>

            {orderloading ? (
                <Orderskeliton />
            ) : (
                ordersdata.length === 0 ? (
                    <Text> No orders found !!! </Text>
                ) : (
                    <View>
                        <FlatList
                            data={ordersdata}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => <Ordercards item={item} />}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 148 }}
                        />
                    </View>
                )
            )}
        </SafeAreaView>
    )
}

export default Orderscreen

const styles = StyleSheet.create({})