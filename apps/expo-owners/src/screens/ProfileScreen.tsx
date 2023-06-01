import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigation/UserStack";
import { useUser } from "@clerk/clerk-react";

type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Profile"
>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user } = useUser();

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View>
        <Text style={{ textAlign: "center", fontSize: 40, color: "white" }}>
          Profile
        </Text>
        <Text className="text-lg text-white">Name: {user?.fullName}</Text>
        <Text className="text-lg text-white">Rating: {}</Text>
        <Text className="text-lg text-white">Bio: {}</Text>
        <Text className="text-lg text-white">
          Email: {user?.primaryEmailAddress?.emailAddress}
        </Text>
        <Text className="text-lg text-white">
          Phone: {user?.primaryPhoneNumber?.phoneNumber}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            padding: 10,
            borderRadius: 8,
            marginTop: 20,
            alignSelf: "center",
          }}
          onPress={handleEditProfile}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
