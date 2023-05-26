import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MarketplaceStackParamList } from "../navigation/UserStack";
import { trpc } from '../utils/trpc';

type BidScreenRouteProp = RouteProp<MarketplaceStackParamList, 'Bid'>;

type BidScreenNavigationProp = StackNavigationProp<
  MarketplaceStackParamList,
  'Bid'
>;

interface Props {
  route: BidScreenRouteProp;
  navigation: BidScreenNavigationProp;
}

function BidScreen({ route, navigation }: Props) {
  const { listingId } = route.params;

  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');

  const bidMutation = trpc.bid.create.useMutation();

  const handlePlaceBid = async () => {
    try {
      await bidMutation.mutate({
        listingId: listingId,
        bidAmount: parseFloat(bidAmount),
        bidMessage: bidMessage,
        bidStatus: 'Pending',  // You might want to define bidStatus according to your needs
        bidDate: new Date().toISOString(),  // Current date-time in ISO format
      });
      alert("Bid Placed Successfully");
    } catch (error) {
      console.error(error);
      alert("Bid failed");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View>
        <Text className='text-white text-3xl text-center p-16'>Place a Bid</Text>
        <TextInput
          className='border-b border-white text-white mb-4'
          placeholder='Bid Amount'
          placeholderTextColor='white'
          keyboardType='numeric'
          value={bidAmount}
          onChangeText={setBidAmount}
        />
        <TextInput
          className='border-b border-white text-white mb-4'
          placeholder='Bid Message'
          placeholderTextColor='white'
          multiline
          value={bidMessage}
          onChangeText={setBidMessage}
        />
        <TouchableOpacity 
          style={{ backgroundColor: 'blue', borderRadius: 8, padding: 16 }}
          onPress={handlePlaceBid}
        >
          <Text className='text-white text-center'>Place Bid</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default BidScreen;

