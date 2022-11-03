import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { CompositeNavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import useOrders from "../../hooks/useOrders";
import { StatusBarPlaceHolder } from "../misc/StatusBarPlaceHolder";
import { Button, Image } from "@rneui/themed";
import OrderCard from "../../components/OrderCard";

export type OrdersScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProps>();

  const { loading, error, orders } = useOrders();

  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <StatusBarPlaceHolder />
      <ScrollView style={{ backgroundColor: "#eb6a7c" }}>
        <Image
          source={{ uri: "https://links.papareact.com/m51" }}
          containerStyle={{ width: "100%", height: 264 }}
          PlaceholderContent={<ActivityIndicator />}
        />

        <View>
          <Button
            color="pink"
            style={{ paddingHorizontal: 22, paddingVertical: 25 }}
            titleStyle={{ color: "gray", fontWeight: "400" }}
            onPress={() => setAscending(!ascending)}>
            {ascending ? "Showing: Oldest First" : "Showing: Most Recent First"}
          </Button>

          {orders
            ?.sort((a, b) => {
              if (ascending) {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
              } else {
                return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
              }
            })
            .map((order) => (
              <OrderCard key={order.trackingId} item={order} />
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default OrdersScreen;
