import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import { trpc } from "../utils/trpc";

export const EditProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [experience, setExperience] = useState("");
  const [workType, setWorkType] = useState("");
  const { mutate } = trpc.profile.update.useMutation();

  const handleUpdateProfile = () => {
    mutate({ id: "profileId", name, email, image, experience, workType });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ padding: 16 }}>
        <Text style={{ color: "white", fontSize: 24, marginBottom: 16 }}>Profile</Text>
        <TextInput
          style={{ backgroundColor: "white", padding: 8, marginBottom: 16 }}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={{ backgroundColor: "white", padding: 8, marginBottom: 16 }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{ backgroundColor: "white", padding: 8, marginBottom: 16 }}
          placeholder="Image URL"
          value={image}
          onChangeText={setImage}
        />
        <TextInput
          style={{ backgroundColor: "white", padding: 8, marginBottom: 16 }}
          placeholder="Experience"
          value={experience}
          onChangeText={setExperience}
        />
        <TextInput
          style={{ backgroundColor: "white", padding: 8, marginBottom: 16 }}
          placeholder="Work Type"
          value={workType}
          onChangeText={setWorkType}
        />
        <TouchableOpacity
          style={{ backgroundColor: "blue", padding: 12, borderRadius: 8 }}
          onPress={handleUpdateProfile}
        >
          <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
