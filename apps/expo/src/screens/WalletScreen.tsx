import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"


export const WalletScreen = () => {
    return(
        <SafeAreaView className="h-full bg-black">
            <View>
            <Text className="text-white text-3xl text-center">
                Wallet
            </Text>
            <Text className="text-white text-2xl text-center p-5 flex-auto">Ballence:</Text>
            <Text className="text-white text-2xl p-5 flex-auto">Transactions:</Text>
            <View className="p-10">
                <TouchableOpacity className="bg-blue-500 rounded p-5">
                    <Text className="text-white">Withdrawl</Text>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
        
    )
}