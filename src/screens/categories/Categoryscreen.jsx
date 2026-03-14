import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deletecategory, fetchallcategories } from '../../redux/slices/CategorySlice';
import { FontAwesome } from '@expo/vector-icons';
import DeleteConfirmModal from '../../models/DeleteConfirmModal';


const Categoryscreen = () => {
  const navigation = useNavigation();
  // state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const { category, categoryloading, categoryerror, page, hasMore } = useSelector((state) => state.categories.categorydata);

  // Initial fetch — page 1
  useEffect(() => {
    dispatch(fetchallcategories({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Refresh — reset to page 1
  const handlerefresh = () => {
    dispatch(fetchallcategories({ page: 1, limit: 10 }));
  };

  // Load more on scroll end
  const loadMoreCategories = () => {
    if (!categoryloading && hasMore) {
      dispatch(fetchallcategories({ page: page + 1, limit: 10 }));
    }
  };


  const handleaddcat = () => {
    navigation.navigate("addcategory");
  };

  // open modal — pass the id
  const handleconfirmdelete = (id) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  // on confirm → dispatch delete
  const handleDelete = async () => {
    try {
      setLoader(true);
      await dispatch(deletecategory(selectedId)).unwrap(); // ← unwrap throws on rejected
      Alert.alert("Success", "Category deleted!");
      dispatch(fetchallcategories()); // ← refresh list
    } catch (error) {
      Alert.alert("Error", "Failed to delete category!");
    } finally {
      setModalVisible(false);
      setLoader(false)
    }
  };

  if (categoryloading && page === 1) {
    return (
      <View style={styles.loading}>
        <Text>Loading</Text>
        <ActivityIndicator size={25} />
      </View>
    );
  }


  const rendercategories = ({ item }) => {
    return (
      <View style={styles.catmain}>
        <TouchableOpacity
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
              <Text style={styles.catname}>{item.name.slice(0, 26)}</Text>
              <Text style={styles.prods}> 5 products </Text>
            </View>
          </View>
        </TouchableOpacity>


        <View style={styles.right}>
          <TouchableOpacity>
            <AntDesign name="edit" size={18} color="green" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleconfirmdelete(item._id)}>
            <AntDesign name="delete" size={18} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className='flex-1 bg-gray-50'>
      <View className='py-4 px-3 flex-row items-center justify-between'>
        <TouchableOpacity >
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
        data={[...category].reverse()}
        keyExtractor={(item) => item._id}
        renderItem={rendercategories}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={loadMoreCategories}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          categoryloading && page > 1
            ? <ActivityIndicator size="small" style={{ marginVertical: 10 }} />
            : null
        }
        ListEmptyComponent={<Text>No Categories Found</Text>}
      />

      {/* // in your JSX */}
      <DeleteConfirmModal
        visible={modalVisible}
        onConfirm={handleDelete}
        onCancel={() => setModalVisible(false)}
        loader={loader}
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
    width: 48,
    height: 48,
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