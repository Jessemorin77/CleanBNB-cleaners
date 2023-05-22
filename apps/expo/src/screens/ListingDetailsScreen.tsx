import React from 'react';
import { View, Text, Touchable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

function ListingDetailsScreen() {
  const route = useRoute();
  const { listingId } = route.params;

  // Fetch data or perform operations based on the listingId

  return (
    <SafeAreaView className='bg-black h-full'>
        <View>
            <Text className='text-white text-center text-3xl p-4'>Listing Details</Text>
            <Text className='text-white'>Listing ID: {listingId}</Text>
            <View className='p-10'>
                <TouchableOpacity className='bg-blue-500 rounded p-5'>
                    <Text className='text-white'>Place Bid</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
}

export default ListingDetailsScreen;