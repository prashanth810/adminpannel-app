import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchallusers } from '../../redux/slices/UserSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoaderSkelition from '../../components/LoaderSkelition';
import UserCards from '../../components/UserCards';

const Userscreen = () => {

    const dispatch = useDispatch();
    const { allusers, userloading, usererror } = useSelector((state) => state.allusers.userdata);

    useEffect(() => {
        dispatch(fetchallusers());
    }, [dispatch]);


    return (
        <SafeAreaView>
            <View className='bg-indigo-600 py-4 border-b border-indigo-700'>
                <Text className='text-2xl text-center text-[#fff] font-bold'> Users </Text>
                <Text className='text-sm text-indigo-100 text-center mt-1'> Manage Application Users </Text>
            </View>

            {userloading ? (
                <LoaderSkelition />
            ) : (
                <View className='mt-3'>
                    <FlatList
                        data={allusers}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <UserCards item={item} />} />
                </View>
            )}
        </SafeAreaView>
    )
}

export default Userscreen

const styles = StyleSheet.create({})