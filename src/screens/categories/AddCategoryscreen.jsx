import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';

const AddCategoryscreen = () => {
    const [formdata, setFormdata] = useState({
        name: '',
        image: null,
    });

    const [errors, setErrors] = useState({});

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

        Alert.alert('Success', 'Category Created Successfully');
        console.log(formdata);
    };

    const isDisabled = !formdata.name.trim() || !formdata.image;

    return (
        <View className="flex-1 bg-gray-50 p-4">
            <Text className="text-xl font-bold mb-1">Add Category</Text>
            <Text className="text-gray-500 mb-5">
                Give it a short, clear name
            </Text>

            {/* Category Name */}
            <Text className="text-gray-700">Category Name</Text>
            <TextInput
                value={formdata.name}
                onChangeText={text => handlechange('name', text)}
                placeholder="E.g Grocery..."
                className={`border rounded p-3 mt-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
            />

            {errors.name && (
                <Text className="text-red-500 text-xs mt-1">
                    {errors.name}
                </Text>
            )}

            {/* Image Picker */}
            <Text className="mt-5 text-gray-700">Category Image</Text>

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
    );
};

export default AddCategoryscreen;