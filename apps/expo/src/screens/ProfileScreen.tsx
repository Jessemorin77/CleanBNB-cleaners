import { View, Text, SafeAreaView, Image } from "react-native";
import { ExpoImagePicker } from "../components/ExpoImagePicker";
import { useState } from "react";
import { useUser } from "@clerk/clerk-expo"; // Import useUser hook

export const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState("");
  const { user } = useUser(); // Get the user data

  const handleImageSelected = (uri: string) => {
    // Handle the selected image URI here
    setProfileImage(uri);
  };
  
  return(
    <SafeAreaView className="bg-black">
      <View className="bg-black h-full">
        <Text className="text-center text-xl text-white">
          Profile 
        </Text>
        <View>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={{ width: 200, height: 200 }}  />
          ) : (
            <Image
              source={require("../../assets/icon.png")} // Provide a placeholder image source
              style={{ width: 200, height: 200 }}
              className="self-center"
            />
          )}
          <View className="self-center">
            <ExpoImagePicker onImageSelected={handleImageSelected} />
          </View>
        </View>
        <Text className="text-white text-lg">Name: {user?.fullName}</Text>
        <Text className="text-white text-lg">Rating:</Text>
        <Text className="text-white text-lg">Skills:</Text>
        <Text className="text-white text-lg">Bio:</Text>
        <Text className="text-white text-lg">Email: {user?.primaryEmailAddress?.emailAddress}</Text>
        <Text className="text-white text-lg">Phone: {user?.primaryPhoneNumber?.phoneNumber}</Text>
        <Text className="text-white text-lg">City:</Text>
        <Text className="text-white text-lg">State:</Text>

      </View>
    </SafeAreaView>
  )
}
