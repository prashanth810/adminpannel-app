import { ScrollView, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollViewBase, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';

const Addproducts = () => {
    const [formdata, setFormdata] = useState({
        name: "",
        image: "",
        price: "",
        description: "",
    });
    const [errors, setErrors] = useState({});
    const navigation = useNavigation();
    const route = useRoute();
    const { categoryId } = route?.params;

    const handlechange = (key, value) => {
        setFormdata(prev => ({ ...prev, [key]: value }));
    };

    const validate = () => {
        let newErrors = {};

        if (!formdata.name.trim()) {
            newErrors.name = 'Category name is required';
        }

        if (!formdata.image) {
            newErrors.image = 'Category image is required';
        }

        if (!formdata.price) {
            newErrors.price = 'price is required';
        }

        if (!formdata.description) {
            newErrors.description = 'Category description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const pickImage = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert('Permission required', 'Allow gallery access');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            handlechange('image', result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!validate()) return;

        // Alert.alert('Success', 'Category Created Successfully');
        console.log(formdata);
        navigation.goBack();

    };

    const isDisabled = !formdata.name.trim() || !formdata.image;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView className='flex-1 bg-gray-50 p-4'
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View>
                        <Text> Add New Product </Text>
                        <Text> Fill Product details below </Text>

                        <View className='flex-col gap-4'>
                            <View>
                                <TouchableOpacity
                                    onPress={pickImage}
                                    className={`mt-3 h-40 border rounded justify-center items-center overflow-hidden ${errors.image ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    {formdata.image ? (
                                        <View className="w-full h-full">
                                            <Image
                                                source={{ uri: formdata.image }}
                                                className="w-full h-full"
                                                resizeMode="cover"
                                            />

                                            {/* Edit Icon */}
                                            <View className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                                                <Entypo name="edit" size={16} color="#374151" />
                                            </View>
                                        </View>
                                    ) : (
                                        <>
                                            <Text className='text-gray-500'>
                                                <Entypo name="image" size={30} />
                                            </Text>

                                            <Text className="text-gray-400">
                                                Tap to Select Image
                                            </Text>
                                        </>
                                    )}
                                </TouchableOpacity>

                                {errors.image && (
                                    <Text className="text-red-500 text-xs mt-1">
                                        {errors.image}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <Text> Product Name </Text>
                                <TextInput
                                    value={formdata.name}
                                    onChangeText={text => handlechange('name', text)}
                                    placeholder="E.g Apple..."
                                    className={`border rounded p-3 mt-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                            </View>

                            <View>
                                <Text> Price </Text>
                                <TextInput
                                    value={formdata.price}
                                    onChangeText={text => handlechange('price', text)}
                                    keyboardType='numeric'
                                    placeholder="E.g 199..."
                                    className={`border rounded p-3 mt-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                            </View>

                            <View>
                                <Text> Description </Text>
                                <TextInput
                                    value={formdata.description}
                                    onChangeText={text => handlechange('description', text)}
                                    placeholder="Enter description..."
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    className={`border rounded p-3 mt-2 h-24 ${errors.description ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                            </View>
                        </View>

                        <View>
                            {/* Submit Button */}
                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={isDisabled}
                                className={`mt-5 py-3 rounded flex-row items-center justify-center ${isDisabled ? 'bg-gray-300' : 'bg-green-600'
                                    }`} >
                                <Entypo
                                    name="save"
                                    size={18}
                                    color={isDisabled ? '#6B7280' : '#fff'}
                                />
                                <Text
                                    className={`ml-2 font-semibold ${isDisabled ? 'text-gray-500' : 'text-white'
                                        }`}
                                >
                                    Create Category
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    )
}

export default Addproducts

const styles = StyleSheet.create({})