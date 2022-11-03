import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomerScreen from "../screens/CustomerScreen";
import OrdersScreen from "../screens/OrdersScreen";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Text } from "react-native";

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#59c1cc",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Customers") {
            return <Icon name="users" type="entypo" color={focused ? "#59c1cc" : "gray"} />;
          } else if (route.name === "Orders") {
            return <Icon name="box" type="entypo" color={focused ? "#EB6A7C" : "gray"} />;
          }
        },
      })}>
      <Tab.Screen name="Customers" component={CustomerScreen} />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>Orders</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
