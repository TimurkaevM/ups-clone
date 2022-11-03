import { StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";
import { OrdersScreenNavigationProps } from "./OrdersScreen";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StatusBarPlaceHolder } from "../misc/StatusBarPlaceHolder";
import { RootStackParamList } from "../navigator/RootNavigator";
import DeliveryCard from "../../components/DeliveryCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

const OrderScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProps>();

  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTintColor: "#eb6a7c",
      headerTitleStyle: { color: "black" },
      headerBackTitle: "Deliveries",
    });
  }, [order]);

  return (
    <View style={{ marginTop: -12 }}>
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
