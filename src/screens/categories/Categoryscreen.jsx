import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallcategories } from '../../redux/slices/CategorySlice';
import { FontAwesome } from '@expo/vector-icons';


const Categoryscreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { category, categoryloading, categoryerror } = useSelector((state) => state.categories.categorydata);

  useEffect(() => {
    dispatch(fetchallcategories());
  }, [dispatch]);


  const handleaddcat = () => {
    navigation.navigate("addcategory");
  };

  const handleproducts = () => {
    navigation.navigate("products", {
      categoryId: "1",
      categoryname: "Piza"
    })
  }

  const handlerefresh = () => {
    dispatch(fetchallcategories());
  }

  if (categoryloading) {
    return (
      <View style={styles.loading}>
        <Text>
          Loading
        </Text>
        <ActivityIndicator size={25} />
      </View>
    )
  }


  const rendercategories = ({ item }) => {
    return (
      <TouchableOpacity style={styles.catmain}
        onPress={() =>
          navigation.navigate("products", {
            categoryId: item._id,
            categoryname: item.name,
          })
        }>
        <View style={styles.left}>
          <View style={styles.cat}>
            <Image source={{ uri: item.imageurl }} style={styles.catimage} />
          </View>
          <View>
            <Text style={styles.catname}>{item.name}</Text>
            <Text style={styles.prods}> 5 products </Text>
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity>
            <AntDesign name="edit" size={18} color="green" />
          </TouchableOpacity>

          <TouchableOpacity>
            <AntDesign name="delete" size={18} color="red" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className='flex-1 bg-gray-50'>
      <View className='py-4 px-3 flex-row items-center justify-between'>
        <TouchableOpacity onPress={handleproducts}>
          <Text className='text-xl font-bold' > Categories </Text>
        </TouchableOpacity>

        <View style={styles.refreh}>
          <TouchableOpacity style={{ borderWidth: 1, paddingVertical: 4, paddingHorizontal: 6, borderRadius: 5, borderColor: "green" }}
            onPress={handlerefresh}>
            <FontAwesome name="refresh" size={18} color="green" />
          </TouchableOpacity>

          <TouchableOpacity className='bg-blue-500 px-3 py-2 flex-row gap-2 rounded-lg' onPress={handleaddcat}>
            <Text>
              <AntDesign name="plus-circle" size={16} color={"white"} />
            </Text>
            <Text className='text-white text-sm'>
              Add
            </Text>
          </TouchableOpacity>

        </View>
      </View>

      <FlatList
        data={category}
        keyExtractor={(item) => item._id}
        renderItem={rendercategories}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text>No Categories Found</Text>}
      />

    </View>
  )
}

export default Categoryscreen

const styles = StyleSheet.create({
  catmain: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 3, // android shadow
    shadowColor: "#000", // ios shadow
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  right: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  cat: {
    backgroundColor: "#f2f2f2",
    width: 52,
    height: 52,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8
  },

  catimage: {
    width: 40,
    height: 40,
    borderRadius: 30,
    resizeMode: "cover"
  },

  catname: {
    fontSize: 15,
    fontWeight: "700",
  },
  prods: {
    fontSize: 12,
    color: "#8a8888"
  },
  refreh: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5
  },
  loading: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    alignItems: 'center',
    justifyContent: "center",
  },

})