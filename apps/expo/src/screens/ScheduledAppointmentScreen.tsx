import { View, Text, SafeAreaView } from "react-native";

export const ScheduledAppointmentScreen = () => {
  return (
    <SafeAreaView className="h-full bg-black">
      <View>
        <Text className="text-center text-3xl text-white">
          Scheduled Appointments
        </Text>
      </View>
    </SafeAreaView>
  );
};
