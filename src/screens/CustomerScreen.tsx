import { ScrollView, ActivityIndicator, View, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBarPlaceHolder } from "../misc/StatusBarPlaceHolder";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { TabStackParamList } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";
import { GET_CUSTOMERS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import CustomerCard from "../../components/CustomerCard";

export type CustomerScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomerScreen = () => {
  const [input, setInput] = useState<string>("");
  const navigation = useNavigation<CustomerScreenNavigationProps>();
  const { data, loading, error } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <StatusBarPlaceHolder />
      <ScrollView style={styles.container}>
        <Image
          containerStyle={styles.image}
          source={{
            uri: "https://links.papareact.com/3jc",
          }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.input}>
          <Input placeholder="Search by Customers" value={input} onChangeText={setInput} />
        </View>

        {data?.getCustomers
          ?.filter((customer: CustomerList) => customer.value.name.includes(input))
          .map(({ name: ID, value: { name, email } }: CustomerResponse) => (
            <CustomerCard key={ID} email={email} name={name} userId={ID} />
          ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#59c1cc",
  },
  image: {
    width: "100%",
    height: 264,
  },
  input: {
    backgroundColor: "white",
    paddingBottom: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default CustomerScreen;
