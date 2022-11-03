import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Divider, Icon } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  return (
    <Card containerStyle={fullWidth ? styles.fullCard : styles.card}>
      <View style={fullWidth && { height: "100%" }}>
        <Icon name="box" type="entypo" size={50} color="white" />
        <View style={{ alignItems: "center", padding: 25, marginTop: -10 }}>
          <View style={{ marginHorizontal: "auto" }}>
            <Text style={styles.carrier}>
              {order.carrier} - {order.trackingId}
            </Text>
            <Text style={styles.date}>
              Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Divider color="white" style={{ marginTop: 15 }} />
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.cardInfoTitle}>Address</Text>
            <Text style={styles.address}>
              {order.Address}, {order.City}
            </Text>
            <Text style={styles.shippingCost}>Shipping Cost: ${order.shippingCost}</Text>
          </View>
        </View>

        <Divider color="white" style={{ marginTop: 15 }} />
        <View style={{ padding: 15 }}>
          {order.trackingItems.items.map((item) => (
            <View key={item.item_id} style={styles.itemsContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>x {item.quantity}</Text>
            </View>
          ))}
        </View>

        <MapView
          style={[{ width: "100%" }, { flexGrow: 1 }, !fullWidth && { height: 200 }]}
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          <Marker
            coordinate={{
              latitude: order.Lat,
              longitude: order.Lng,
            }}
            title="Delivery Location"
            description={order.Address}
            identifier="destination"
          />
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#59c1cc",
    borderRadius: 15,
    marginVertical: 10,
    padding: 0,
    paddingTop: 16,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
  },
  fullCard: {
    backgroundColor: "#eb6a7c",
    margin: 0,
    padding: 0,
    paddingTop: 16,
  },
  carrier: {
    fontSize: 13,
    textAlign: "center",
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  date: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  cardInfo: {
    marginHorizontal: "auto",
  },
  cardInfoTitle: {
    marginTop: 25,
    fontSize: 17,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  address: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
    fontStyle: "italic",
  },
  shippingCost: {
    fontSize: 13,
    textAlign: "center",
    color: "white",
    fontStyle: "italic",
  },
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontSize: 13,
    color: "white",
    fontStyle: "italic",
  },
  itemQuantity: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  map: {
    width: "100%",
    height: 200,
  },
});
