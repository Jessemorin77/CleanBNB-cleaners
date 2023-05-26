import React from 'react';
import { View, Text, Touchable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { trpc } from '../utils/trpc';

function ListingDetailsScreen() {
  
  const route = useRoute();
  const { listingId } = route.params;

  // Fetch data or perform operations based on the listingId
  const { data: listing } = trpc.list.get.useQuery({
    listingId: listingId as string,
  });

  if (!listing) {
    return null; // Handle the case when the listing data is not available yet
  }

  const bidMutation = trpc.bid.create.useMutation();

  const handlePlaceBid = async () => {
    // Perform the mutation using the mutate function
    try {
      await bidMutation.mutate({
        listingId: listingId as string,
      });
      alert("Bid Successful");
    } catch (error) {
      console.error(error);
      alert("Bid failed");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View>
        <Text className='text-white text-3xl text-center p-16'>Listing Details</Text>
        <Text className='text-white'>Title: {listing.title}</Text>
        <Text className='text-white'>Description: {listing.description}</Text>
        <Text className='text-white'>Budget: {listing.budget}</Text>
        <Text className='text-white'>Job Type: {listing.jobType}</Text>
        <Text className='text-white'>Contractor Type: {listing.contractorType}</Text>
        <Text className='text-white'>Property Image: {listing.property?.Image}</Text>
        <Text className='text-white'>Property Address: {listing.property?.Address}</Text>
        <View className='p-10'>
          <TouchableOpacity 
            style={{ backgroundColor: 'blue', borderRadius: 8, padding: 16 }}
            onPress={() => handlePlaceBid()}
          >
            <Text className='text-white text-center'>Place Bid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ListingDetailsScreen;
