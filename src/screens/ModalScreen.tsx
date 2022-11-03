import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { RootStackParamList } from "../navigator/RootNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useCustomerOrders from "../../hooks/useCustomerOrders";
import DeliveryCard from "../../components/DeliveryCard";

type ModalScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, "MyModal">;

const ModalScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProps>();

  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();

  const { loading, error, orders } = useCustomerOrders(userId);

  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack} style={styles.btnClose}>
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View style={{ marginTop: 10 }}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.deliveries}>deliveries</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.flatList}
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  btnClose: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
  },
  header: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#59c1cc",
  },
  name: {
    textAlign: "center",
    fontSize: 20,
    color: "#59c1cc",
  },
  deliveries: {
    textAlign: "center",
    fontStyle: "italic",
  },
  flatList: {
    paddingBottom: 200,
  },
});
