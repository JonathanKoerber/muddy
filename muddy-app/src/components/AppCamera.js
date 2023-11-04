import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export const AppCamera = () =>{
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [text, setText] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

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
        }
    };

    // const worker = createWorker('eng');
    const processImage = async () => {
    // sent image https request to server return text

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
