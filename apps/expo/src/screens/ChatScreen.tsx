import React, { useState } from "react";
import { View, Text, SafeAreaView, FlatList, TextInput, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { ChatStackParamList } from "../navigation/UserStack";
import { trpc } from "../utils/trpc";

type ChatScreenNavigationProp = StackNavigationProp<ChatStackParamList, "Chat">;
type ChatScreenRouteProp = RouteProp<ChatStackParamList, "Chat">;

type ChatScreenProps = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation, route }) => {
  const [message, setMessage] = useState("");
  const { chatId } = route.params;

  const { data: messages, isLoading } = trpc.chat.getMessagesByChatId.useQuery(chatId);

  const handleSendMessage = () => {
    // Perform the logic to send the message to the backend
    // You can use the `trpc` object to make the API call
    // Example: trpc.chat.sendMessage.mutate({ chatId, content: message });

    // Clear the input field after sending the message
    setMessage("");
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Message }) => (
    <View className="p-2">
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1">
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View className="p-2">
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          className="p-2 border border-gray-300 rounded"
        />
        <TouchableOpacity onPress={handleSendMessage} className="bg-blue-500 p-2 rounded mt-2">
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
