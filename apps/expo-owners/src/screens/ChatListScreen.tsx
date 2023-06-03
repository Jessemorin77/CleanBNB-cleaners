import React from "react";
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ChatStackParamList } from "../navigation/UserStack";
import { trpc } from "../utils/trpc";

interface ChatData {
  id: string;
  name: string;
}

type Chat = ChatData;

type ChatScreenNavigationProp = StackNavigationProp<
  ChatStackParamList,
  "Chat"
>;

type ChatListScreenProps = {
  navigation: ChatScreenNavigationProp;
};

const ChatListScreen: React.FC<ChatListScreenProps> = ({ navigation }) => {
  const { data: userProfileData, isLoading } = trpc.chat.getAll.useQuery();

  const chats: Chat[] = userProfileData?.map((userProfile) => ({
    id: userProfile.id,
    name: userProfile.name || "",
  })) || [];

  const handleChatPress = (chat: Chat) => {
    navigation.navigate("Chat", { chatId: chat.id });
  };

  if (isLoading) {
    return (
      <View>
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity onPress={() => handleChatPress(item)}>
      <View>
        <Text className="text-white text-xl text-center p-10">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;
;