import React from "react";
import { useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { storeUserData } from "../services/dataService";
import { trpc } from "../utils/trpc";

const SignOut = () => {
  const { signOut } = useAuth();
  return (
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};

export const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-[#111827] bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <ScrollView className="h-full">
        <View className=" w-full p-4">
          <Text className="mx-auto pb-2 text-4xl font-bold text-white">
            Clean<Text className="text-[#cc66ff]">BNB</Text>-Cleaners
          </Text>
          <TouchableOpacity>
            <View className="m-4 overflow-hidden rounded-lg bg-white shadow">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
                }}
                className="h-40 w-full"
              />
              <Text className="p-1 text-lg font-bold ">Setup Your Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="m-4 overflow-hidden rounded-lg bg-white shadow">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
                }}
                className="h-40 w-full"
              />
              <Text className="p-1 text-lg font-bold">Find Jobs Near You</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="m-4 overflow-hidden rounded-lg bg-white shadow">
              <Image
                source={{
                  uri: "https://media.istockphoto.com/id/1320438605/photo/gavel-with-miniature-model-house-on-shelf.jpg?b=1&s=170667a&w=0&k=20&c=MTWJj9spHcvHkb5EMteYfMCYcYGyEv_1JOIfWXJjol0=",
                }}
                className="h-40 w-full"
              />
              <Text className="p-1 text-lg font-bold">Chat With clients</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="m-4 overflow-hidden rounded-lg bg-white shadow">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGFwcG9pbnRtZW50c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                }}
                className="h-40 w-full"
              />
              <Text className="p-1 text-lg font-bold">View Your Balence</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="m-4 overflow-hidden rounded-lg bg-white shadow">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1608093310225-bb8260a85072?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHRleHRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
                }}
                className="h-40 w-full"
              />
              <Text className="p-1 text-lg font-bold">Chat With Cleaners</Text>
            </View>
          </TouchableOpacity>
          <SignOut />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
