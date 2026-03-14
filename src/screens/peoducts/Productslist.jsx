import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../../redux/slices/ProductSlice';

const Productslist = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { categoryname, categoryId } = route?.params;

    const dispatch = useDispatch();

    const { catpro, catprodloading, catproderror, page, hasMore } = useSelector((state) => state.products.categoryprods);

    // Initial fetch — page 1
    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProductsByCategory({ categoryId, page: 1, limit: 10 }));
        }
    }, [categoryId]);

    // Load more on scroll end
    const loadMoreProducts = () => {
        if (!catprodloading && hasMore) {
            dispatch(fetchProductsByCategory({ categoryId, page: page + 1, limit: 10 }));
        }
    };

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
                        <Text style={styles.productName}>{item.name.slice(0, 26)}</Text>
                        <Text style={{ fontSize: 12, color: "#b55b02" }}> Stock : {item.stock}</Text>
                        <Text style={{ color: "#02b53b", fontSize: 15, fontWeight: "800" }}> ₹ {item.price}</Text>
                    </View>
                </View>

                <View style={styles.right}>
                    <TouchableOpacity>
                        <AntDesign name="edit" size={18} color="green" />
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <AntDesign name="delete" size={18} color="red" />
                    </TouchableOpacity>
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
                onEndReached={loadMoreProducts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    catprodloading && page > 1
                        ? <ActivityIndicator size="small" style={{ marginVertical: 10 }} />
                        : null
                }
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        No Products Found
                    </Text>
                }
            />

        </View>
    )
}

export default Productslist

const styles = StyleSheet.create({
    productCard: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
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
    right: {
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
    },
});