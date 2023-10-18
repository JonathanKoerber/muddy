import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export const Login = () => {
    const headerHight = useHeaderHeight();
    return  (
        <SafeAreaView style= {{ flex: 1, paddingTop: headerHight }}>
        <View> 
            <Text> Login </Text>
        </View>
        </SafeAreaView>
    );
};