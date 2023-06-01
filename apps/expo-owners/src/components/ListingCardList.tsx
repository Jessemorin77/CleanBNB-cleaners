import { View, Text, TouchableOpacity } from "react-native";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { trpc } from "../utils/trpc";
import { FlashList } from "@shopify/flash-list";
import React from "react";

type Listing = inferProcedureOutput<AppRouter["list"]["all"]>[number];

const PostCards: React.FC<{ listing: Listing }> = ({ listing }) => {
  return (
    <View className="p-3 rounded-lg border-4 border-white">
      <Text className="font-semubold text-xl text-[#cc66ff]">
        {listing.title}
      </Text>
      <Text className="text-white">{listing.description}</Text>
      <Text className="text-white">{listing.budget}</Text>
      <Text className="text-white">{listing.jobType}</Text>
      <Text className="text-white">{listing.contractorType}</Text>
    </View>
  );
};

export const ListingCardList: React.FC = () => {
  const propQuery = trpc.list.all.useQuery();
  const [showListing, setShowListing] = React.useState<string | null>(null);

  const data: Listing[] = propQuery.data ?? [];
  return (
    <FlashList
      data={data}
      estimatedItemSize={20}
      ItemSeparatorComponent={() => <View className="h-2" />}
      renderItem={({ item }: { item: Listing }) => (
        <TouchableOpacity onPress={() => setShowListing(item.id)}>
          <PostCards listing={item} />
        </TouchableOpacity>
      )}
    />
  );
};
