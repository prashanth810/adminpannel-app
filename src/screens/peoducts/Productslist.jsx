import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../redux/slices/ProductSlice';

const Productslist = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { categoryname, categoryId } = route?.params;

    const dispatch = useDispatch();

    const { catpro, catprodloading, catproderror } = useSelector((state) => state.products.categoryprods);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByCategory(categoryId));
        }
    }, [categoryId]);

    const handleaddproducts = () => {
        navigation.navigate("addproducts", { categoryId })
    }


    if (catprodloading) {
        return <ActivityIndicator size={"small"} />
    }

    const renderProducts = ({ item }) => {
        return (
            <View style={styles.productCard}>
                <View style={styles.products}>
                    <View>
                        <Image source={{ uri: item.imageurl }} width={55} height={55} resizeMode='cover' />
                    </View>
                    <View>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={{ fontSize: 12, color: "#b55b02" }}> Stock : {item.stock}</Text>
                        <Text style={{ color: "#02b53b", fontSize: 15, fontWeight: "800" }}> ₹ {item.price}</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>

            {/* HEADER */}
            <View className='flex-row items-center justify-between py-3 px-4'>
                <Text className='text-lg font-bold'>
                    {categoryname} Products
                </Text>

                <TouchableOpacity
                    className='bg-blue-500 px-3 py-2 flex-row gap-2 rounded-lg'
                    onPress={handleaddproducts}
                >
                    {/* <AntDesign name="plus-circle" size={16} color="white" /> */}
                    <Text className='text-white text-sm'>Add</Text>
                </TouchableOpacity>
            </View>

            {/* PRODUCT LIST */}
            <FlatList
                data={catpro}
                keyExtractor={(item) => item._id}
                renderItem={renderProducts}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        No Products Found
                    </Text>
                } />

        </View>
    )
}

export default Productslist

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: "#fff",
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 6,
        borderRadius: 10,
        elevation: 2,
    },
    productName: {
        fontSize: 15,
        fontWeight: "400",
    },
    products: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 10,
    },
});