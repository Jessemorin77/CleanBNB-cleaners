import { StackNavigationProp } from "@react-navigation/stack";
import { PropertyStackParamList } from "../navigation/UserStack";
import {
  SafeAreaView,
  View,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../utils/trpc";
import React from "react";
import { PropertyList } from "../components/PropertyList";

type PropertyScreenNavigationProp = StackNavigationProp<
  PropertyStackParamList,
  "Property"
>;

type PropertyScreenProps = {
  navigation: PropertyScreenNavigationProp;
};

function PropertyScreen({ navigation }: PropertyScreenProps) {
  return (
    <SafeAreaView className="h-full w-full bg-black p-7">
      <Button
        title="Add Property"
        onPress={() => navigation.navigate("AddProperty")}
      />
      <PropertyList />
    </SafeAreaView>
  );
}

export default PropertyScreen;
