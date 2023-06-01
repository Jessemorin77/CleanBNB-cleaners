import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

export const WalletScreen = () => {
  return (
    <SafeAreaView className="h-full bg-black">
      <View>
        <Text className="text-center text-3xl text-white">Wallet</Text>
        <Text className="flex-auto p-5 text-center text-2xl text-white">
          Ballence:
        </Text>
        <Text className="flex-auto p-5 text-2xl text-white">Transactions:</Text>
        <View className="p-10">
          <TouchableOpacity className="rounded bg-blue-500 p-5">
            <Text className="text-white">Withdrawl</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
