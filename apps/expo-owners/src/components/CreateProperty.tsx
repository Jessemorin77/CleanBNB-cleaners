import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import React from "react";
import { View, TextInput, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface PropertyData {
  Address: string;
  City: string;
  State: string;
  Zip: number;
  Beds: number;
  Baths: number;
  Sqft: number;
  Type: string;
  Status: string;
  Image: string;
  Desc: string;
}

export const CreateProperty: React.FC = () => {
  const utils = trpc.useContext();
  const { mutate } = trpc.property.create.useMutation({
    async onSuccess() {
      await utils.property.all.invalidate();
    },
  });

  const [propertyData, setPropertyData] = React.useState<PropertyData>({
    Address: "",
    City: "",
    State: "",
    Zip: 0,
    Beds: 0,
    Baths: 0,
    Sqft: 0,
    Type: "",
    Status: "",
    Image: "",
    Desc: "",
  });

  const handleInputChange = (
    key: keyof PropertyData,
    value: string | number,
  ): void => {
    setPropertyData((prevData) => ({ ...prevData, [key]: value }));
  };

  return (
    <View className="flex flex-col border-t-2 border-gray-500 p-4">
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("Address", value)}
        placeholder="Address"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("City", value)}
        placeholder="City"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("State", value)}
        placeholder="State"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("Zip", Number(value) || 0)}
        placeholder="Zip"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("Beds", Number(value) || 0)}
        placeholder="Beds"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("Baths", Number(value) || 0)}
        placeholder="Baths"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("Sqft", Number(value) || 0)}
        placeholder="Sqft"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("Type", value)}
        placeholder="Type"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("Status", value)}
        placeholder="Status"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("Image", value)}
        placeholder="Image"
      />
      <TextInput
        className="mb-2 rounded border-2 border-gray-500 p-2 text-white"
        onChangeText={(value) => handleInputChange("Desc", value)}
        placeholder="Desc"
      />
      <TouchableOpacity
        className="rounded bg-blue-500 p-2"
        onPress={() => {
          mutate(propertyData);
        }}
      >
        <Text className="font-semibold text-white">Add Property</Text>
      </TouchableOpacity>
    </View>
  );
};
