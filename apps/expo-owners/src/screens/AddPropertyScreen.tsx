import { View, Text } from "react-native";
import { CreateProperty } from "../components/CreateProperty";
import { SafeAreaView } from "react-native-safe-area-context";

export const AddPropertyScreen = () => {
  return (
    <SafeAreaView>
      <CreateProperty />
    </SafeAreaView>
  );
};
