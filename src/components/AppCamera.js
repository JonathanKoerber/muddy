import {Camera, CameraType} from "expo-camera";
import {useEffect, useState} from 'react';
import { Button, StyleSheet, View, TouchableOpacity, Text }  from "react-native";

export const AppCamera = () => {

    const [ type, setType ] = useState(CameraType.back);
    const [ permission, setPermission ] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setPermission(status === "granted");
        })();
    }, []);


    if (permission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (permission === false) {
        //ask for permission
        return <Text>No access to camera</Text>;
    }
    const toggleType = () => {
        setType(
            type === CameraType.back
            ? CameraType.front
            : CameraType.back
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type}>
                <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={toggleType}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Flip</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};


