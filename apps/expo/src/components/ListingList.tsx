import { View, Text } from "react-native";
import { trpc } from "../utils/trpc";

interface Listing {
  id: string;
  title: string;
  description: string;
  budget: number;
}

export const ListingList = () => {
  const {
    data: listings,
    isLoading,
    isError,
    error,
  } = trpc.list.all.useQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError || !listings) {
    return <Text>Error: {error?.message}</Text>;
  }
  
  

  return (
    <View>
      {listings.map((listing: Listing) => (
        <View key={listing.id}>
          <Text>{listing.title}</Text>
          <Text>{listing.description}</Text>
          <Text>{listing.budget}</Text>
          {/* You can add more fields here */}
        </View>
      ))}
    </View>
  );
};
