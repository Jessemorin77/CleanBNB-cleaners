import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { MarketplaceStackParamList } from "../navigation/UserStack";
import { useNavigation } from "@react-navigation/native";
import { trpc } from "../utils/trpc";

interface PropertyData {
  id: string;
  Address: string;
  City: string;
  State: string;
  Zip: number;
  Beds: number;
  Baths: number;
  Sqft: number;
  Type: string;
  Status: string;
  Image: string;
  Desc: string;
}

interface ListingData {
  id: string;
  title: string;
  description: string;
  budget: number;
  jobType: string;
  contractorType: string;
  propertyId: string;
  property?: PropertyData | null; // Make property optional
}

type Listing = ListingData;
//
interface MarketplaceScreenProps {
  navigation: StackNavigationProp<MarketplaceStackParamList, "Marketplace">;
}

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({
  navigation,
}) => {
  const { data: listingData } = trpc.list.all.useQuery();
  const { data: propertyData } = trpc.property.all.useQuery();

  // Combine the data from the two queries
  const listings = listingData?.map((listing) => {
    const property = propertyData?.find(
      (property) => property.id === listing.propertyId,
    );
    return {
      ...listing,
      property,
    };
  });

  const handleListingPress = (listing: Listing) => {
    navigation.navigate("ListingDetails", { listingId: listing.id });
  };

  const renderMyItem: React.FC<{ listing: Listing }> = ({ listing }) => {
    if (!listing.property || !listing.property.Image) {
      return null; // Skip rendering if image URI is empty or undefined
    }

    console.log("Image URI:", listing.property.Image);

    return (
      <View className="mb-4 w-1/2 rounded-lg border border-gray-500 p-4">
        <TouchableOpacity onPress={() => handleListingPress(listing)}>
          <Image
            source={{ uri: listing.property.Image }}
            className="mb-4 h-40 w-full rounded-lg"
            resizeMode="cover"
          />
          <Text className="mb-2 text-lg font-bold text-white">
            {listing.title}
          </Text>
          <Text className="mb-2 text-white ">{listing.description}</Text>
          <Text className="mb-2 text-white">Budget: ${listing.budget}</Text>
          <Text className="mb-2 text-white">Job Type: {listing.jobType}</Text>
          <Text className="mb-2 text-white">
            Contractor Type: {listing.contractorType}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="h-full bg-black p-5">
      <Text className="mb-5 text-center text-3xl text-white">Marketplace</Text>
      <FlatList
        data={listings}
        renderItem={({ item }) => renderMyItem({ listing: item })}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </SafeAreaView>
  );
};

export default MarketplaceScreen;
