import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import { OrdersScreenNavigationProps } from "../src/screens/OrdersScreen";
import { useNavigation } from "@react-navigation/native";

type Props = {
  item: Order;
};

const OrderCard = ({ item }: Props) => {
  const navigation = useNavigation<OrdersScreenNavigationProps>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Order", { order: item })}>
      <Card containerStyle={styles.card}>
        <View style={styles.container}>
          <View>
            <Icon name="truck-delivery" color="#eb6a7c" type="material-community" />
            <Text style={styles.date}>{new Date(item.createdAt).toDateString()}</Text>
          </View>
          <View>
            <Text style={styles.carrier}>
              {item.carrier} - {item.trackingId}
            </Text>
            <Text style={styles.name}>{item.trackingItems.customer.name}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={{ color: "#eb6a7c", fontSize: 10 }}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon style={{ marginLeft: 12 }} name="box" type="feather" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 25,
    borderRadius: 15,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    color: "gray",
  },
  carrier: {
    fontSize: 10,
    color: "gray",
  },
});
