import React from "react";

import { View, SafeAreaView, Text } from "react-native";

import SignInWithOAuth from "../components/SignInWithOAuth";

export const SignInSignUpScreen = () => {
  return (
    <SafeAreaView className="bg-[#2e026d] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <View className="h-full w-full p-4">
        <Text className="flex-auto text-center text-xl text-white">
          Welcome to CleanBNB
        </Text>
        <SignInWithOAuth />
      </View>
    </SafeAreaView>
  );
};
