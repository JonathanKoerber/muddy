import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from "react-redux";
import { imageToWorksheet, createPost} from "../services/djangoApi";

export const AppCamera = () =>{
    const user = useSelector(state => state.user);

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [text, setText] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);
    const post = () => {
        console.log(user.user.id);
        createPost(user.user.id, "Creating post test with user id");
    }
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log('Media library permission not granted');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled){
            setImageUri(result.assets[0].uri);
            console.log(result.assets[0].uri)
            console.log("set image URI", imageUri)
        }
    };

    // const worker = createWorker('eng');
    const processImage = async () => {
        const imageFile = {
            uri: imageUri,//Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
            type: 'image/png',
            name: 'image.png'
        };

        const imageFormData = new FormData();
        imageFormData.append('image', {
            uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
            type: 'image/png',
            name: 'image.png'
        });
        imageFormData.append('author',user.user.id);
        try {
            // Wait for the result of the asynchronous operation
            const worksheet = await imageToWorksheet(user.user.id, imageFormData);

            // Use the result as needed
            console.log(worksheet);
        } catch (error) {
            // Handle errors if needed
            console.error("Error in processImage:", error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {hasCameraPermission === null ? (
                <Text>Requesting camera permission...</Text>
            ) : hasCameraPermission === false ? (
                <Text>No access to camera</Text>
            ) : (
                <>
                    <TouchableOpacity onPress={pickImage}>
                        <Text>Choose Image</Text>
                    </TouchableOpacity>
                    {imageUri && (
                        <TouchableOpacity onPress={processImage}>
                            <Text>Process Image</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}
        </View>
    );
}
