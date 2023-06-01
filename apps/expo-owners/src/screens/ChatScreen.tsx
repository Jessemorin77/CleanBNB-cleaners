import { View, Text, SafeAreaView } from "react-native";

export const ChatScreen = () => {
  return (
    <SafeAreaView className="h-full bg-black">
      <View>
        <Text className="text-center text-4xl text-white">Chats</Text>
      </View>
    </SafeAreaView>
  );
};
