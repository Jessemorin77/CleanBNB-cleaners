import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, SafeAreaView, Button } from "react-native";
import { ListingStackParamList } from "../navigation/UserStack";
import { ListingCardList } from "../components/ListingCardList";

type ListingScreenNavigationProp = StackNavigationProp<
  ListingStackParamList,
  "Listing"
>;

type ListingScreenProps = {
  navigation: ListingScreenNavigationProp;
};

function ListingScreen({ navigation }: ListingScreenProps) {
  return (
    <SafeAreaView className="h-full w-full bg-black p-7">
      <Button
        title="Add Listing"
        onPress={() => navigation.navigate("AddListing")}
      />
      <ListingCardList />
    </SafeAreaView>
  );
}

export default ListingScreen;
