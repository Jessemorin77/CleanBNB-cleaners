import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MarketplaceStackParamList } from "../navigation/UserStack";

type ListingDetailsScreenRouteProp = RouteProp<MarketplaceStackParamList, 'ListingDetails'>;

type ListingDetailsScreenNavigationProp = StackNavigationProp<
  MarketplaceStackParamList,
  'ListingDetails'
>;

interface Props {
  route: ListingDetailsScreenRouteProp;
  navigation: ListingDetailsScreenNavigationProp;
}

function ListingDetailsScreen({ route, navigation }: Props) {
  const { listingId } = route.params;

  const handlePlaceBid = () => {
    navigation.navigate('Bid', { listingId: listingId });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View>
        <Text className='text-white text-3xl text-center p-16'>Listing Details</Text>
        <Text className='text-white'>Title: {listingId}</Text>
        <View className='p-10'>
          <TouchableOpacity 
            style={{ backgroundColor: 'blue', borderRadius: 8, padding: 16 }}
            onPress={handlePlaceBid}
          >
            <Text className='text-white text-center'>Place Bid</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ListingDetailsScreen;

