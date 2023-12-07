import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { WORKSHEETS } from "../utils/constants";
import { Worksheet } from "./Worksheet";
import {useSelector} from "react-redux";


export const ListOfWorksheets = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const listOfWorksheets = useSelector((state) => state.worksheets)| [];
    //const listOfWorksheets = WORKSHEETS;

    useEffect(() => {
        if (listOfWorksheets) {
            setLoading(false);
        }
    }, [listOfWorksheets]);

    if (loading) {
        return <View><Text>Loading ... </Text></View>;
    }

    const goToWorksheet = (item) => {
        console.log("item", item)
        navigation.navigate("Worksheet", { item, navigation });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => goToWorksheet(item)}>
            <View style={{
                width: "100%",
                height: 288,
                borderRadius: 20,
                marginBottom: 32,
            }}>
                <Text>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={{
                marginTop: -200,
                paddingHorizontal: 20,
                marginBottom: 160,
            }}
        >
            <FlatList
                data={listOfWorksheets}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<View style={{ height: 200 }} />}
                snapToInterval={312}
                decelerationRate="fast"
            />
        </View>
    );
};
