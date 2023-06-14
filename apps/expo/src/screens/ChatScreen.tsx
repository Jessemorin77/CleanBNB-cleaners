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

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
      await trpc.chat.createMessage.mutate({
        chatId,
        content: message,
      });

      // Clear the input field after sending the message
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Message }) => (
    <View style={{ padding: 2 }}>
      <Text>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "gray" }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={{ padding: 2 }}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          style={{ padding: 2, borderWidth: 1, borderColor: "gray", borderRadius: 5 }}
        />
        <View className="pb-48">
        <TouchableOpacity onPress={handleSendMessage} style={{ backgroundColor: "blue", padding: 2, borderRadius: 5, marginTop: 2 }}>
          <View className="">

          <Text style={{ color: "white" }} className="">Send</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;