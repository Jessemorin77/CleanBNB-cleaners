import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import React from "react";
import { View, TextInput, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from 'expo-image-picker';
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
  accessKeyId: 'AKIA3TRZQE5PF7HOIJEI',
  secretAccessKey: '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',
  region: 'us-east-1',
});

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
//dnqRz61_

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

  const handleInputChange = (key: keyof PropertyData, value: string | number): void => {
    setPropertyData((prevData) => ({ ...prevData, [key]: value }));
  };

  const pickImage = async (): Promise<void> => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        throw new Error('Permission to access camera roll is required!');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uploadedImageUrl = await uploadImage(result.uri);
        handleInputChange("Image", uploadedImageUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadImage = async (uri: string): Promise<string> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const params = {
        Bucket: 'cleanbnb-images',
        Key: `property_${Date.now()}.jpg`,
        Body: blob,
        ContentType: 'image/jpeg',
      };

      await s3.upload(params).promise();
      const signedUrl = await s3.getSignedUrlPromise('getObject', { Bucket: 'cleanbnb-images', Key: params.Key });
      return signedUrl;
    } catch (error) {
      console.error(error);
      throw new Error('Image upload failed');
    }
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
        onChangeText={(value) => handleInputChange("Desc", value)}
        placeholder="Desc"
      />
      <TouchableOpacity
        className="rounded bg-blue-500 p-2"
        onPress={pickImage}
      >
        <Text>Upload Image</Text>
      </TouchableOpacity>
      {propertyData.Image !== "" && (
        <Image
          source={{ uri: propertyData.Image }}
          style={{ width: 200, height: 200 }}
        />
      )}
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



