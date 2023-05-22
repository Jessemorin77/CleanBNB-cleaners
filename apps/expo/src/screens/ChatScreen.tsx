import { View, Text, SafeAreaView } from "react-native"


export const ChatScreen = () => {
    return(
        <SafeAreaView className="h-full bg-black">
            <View>
            <Text className="text-white text-3xl text-center">
                ChatScreen
            </Text>
            <Text className="text-white text-xl p-5">Users:</Text>
        </View>
        </SafeAreaView>
        
    )
}