import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { CustomerScreenNavigationProps } from "../src/screens/CustomerScreen";
import { useNavigation } from "@react-navigation/native";
import { Card, Icon } from "@rneui/themed";

type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);

  const navigation = useNavigation<CustomerScreenNavigationProps>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("MyModal", { name, userId })}>
      <Card containerStyle={styles.card}>
        <View>
          <View style={styles.info}>
            <View>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.userId}>ID: {userId}</Text>
            </View>
            <View style={styles.rightInfo}>
              <Text style={{ color: "#59c1cc" }}>
                {loading ? "loading..." : `${orders.length} x`}
              </Text>
              <Icon style={styles.icon} name="box" type="entypo" color="#59c1c1" size={50}></Icon>
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#59c1cc",
  },
  card: {
    padding: 25,
    borderRadius: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  userId: {
    color: "#59c1cc",
    fontSize: 10,
  },
  rightInfo: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  icon: {
    marginBottom: 25,
    marginLeft: "auto",
  },
});

export default CustomerCard;
