import {
  View,
  Text,
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
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
type Listing = inferProcedureOutput<AppRouter["list"]["all"]>[number] &
  ListingData;

const renderMyItem: React.FC<{ listing: Listing }> = ({ listing }) => {
  if (!listing.property || !listing.property.Image) {
    return null; // Skip rendering if image URI is empty or undefined
  }

  console.log("Image URI:", listing.property.Image);

  return (
    <View style={styles.listingContainer}>
      
      <Image
        source={{ uri: listing.property.Image }}
        style={styles.listingImage}
        resizeMode="cover"
      />
      <Text style={styles.listingImageUri}>{listing.property.Image}</Text>
      <Text style={styles.listingTitle}>{listing.title}</Text>
      <Text style={styles.listingDescription}>{listing.description}</Text>
      <Text style={styles.listingBudget}>Budget: ${listing.budget}</Text>
      <Text style={styles.listingJobType}>Job Type: {listing.jobType}</Text>
      <Text style={styles.listingContractorType}>
        Contractor Type: {listing.contractorType}
      </Text>
    </View>
  );
};

const MarketplaceScreen = () => {
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "gray", padding: 7 }}>
      <FlatList
        data={listings}
        renderItem={({ item }) => renderMyItem({ listing: item })}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingVertical: 8 }}
        columnWrapperStyle={styles.listingColumnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    width: "48%",
  },
  listingImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  listingTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  listingDescription: {
    marginBottom: 5,
  },
  listingBudget: {
    marginBottom: 5,
  },
  listingJobType: {
    marginBottom: 5,
  },
  listingContractorType: {
    marginBottom: 5,
  },
  listingColumnWrapper: {
    justifyContent: "space-between",
  },
  listingImageUri: {
    marginBottom: 5,
    color: "gray",
  },
});

export default MarketplaceScreen;
