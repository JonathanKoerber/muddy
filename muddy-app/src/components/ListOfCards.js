import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Card } from "../components/Card";
import * as SplashScreen  from "expo-splash-screen";
import { requestBase } from "../utils/constants";

SplashScreen.preventAutoHideAsync();
export const ListOfCards = (navigation) => {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCardData() {
    const response = await fetch(requestBase + "/home.json");
    setCardList(await response.json());
  }

  useEffect(() => {
    const loadCards = async () => {
     try { 
    fetchCardData();
     }catch (error){
       console.log("Error loading cards:",error);
     }finally{
        SplashScreen.hideAsync();
        setLoading(false);
     }
    };
    loadCards();
  }, []);

  if (loading) {
    return <View><Text>Loading ... </Text></View>;
  }

  const renderItem = ({ item }) => {
    return <Card item={item} navigation={navigation}/>;
  };

  return (
    <View
      style={{
        marginTop: -200,
        paddingHorizontal: 20,
        marginBottom: 160,
      }}
    >
      <FlatList
        data={cardList.reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.itemId}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ height: 200 }} />}
        snapToInterval={312}
        decelerationRate='fast'
      />
    </View>
  );
};