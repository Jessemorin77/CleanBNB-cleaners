import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { trpc } from "../utils/trpc";

interface BidData {
  id: string;
  userId: string;
  listingId: string;
  listing?: ListingData | null;
  bidAmount?: number;
  bidMessage?: string;
  bidStatus?: string;
  bidDate?: string;
}

interface ListingData {
  id: string;
  title: string;
  status: string;
}

export const BidScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: bids, isLoading, refetch } = trpc.bid.all.useQuery<BidData[]>();
  const acceptBid = trpc.bid.accept.useMutation();
  const declineBid = trpc.bid.decline.useMutation();
  const deleteBid = trpc.bid.delete.useMutation();

  const handleAcceptBid = (bidId: string) => {
    acceptBid.mutate(bidId);
  };

  const handleDeclineBid = (bidId: string) => {
    declineBid.mutate(bidId);
  };

  const handleDeleteBid = (bidId: string) => {
    deleteBid.mutate(bidId);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: BidData }) => (
    <View className="mb-4 rounded-lg border border-gray-300 p-4">
      <Text className="mb-2 text-lg font-bold text-white">
        {item.listing?.title}
      </Text>
      <Text className="text-white">Status: {item.bidStatus}</Text>
      <Text className="text-white">Bid Amount: {item.bidAmount}</Text>
      <View className="mt-2 flex-row">
        <TouchableOpacity onPress={() => handleAcceptBid(item.id)}>
          <Text className="mr-4 text-green-500">Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeclineBid(item.id)}>
          <Text className="mr-4 text-red-500">Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteBid(item.id)}>
          <Text className="text-blue-500">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View>
        <Text className="text-center text-4xl text-white">Bids</Text>
        <FlatList
          data={bids}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </View>
    </SafeAreaView>
  );
};
