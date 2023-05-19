import { View, Text, TouchableOpacity, Image } from "react-native";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@acme/api";
import { trpc } from "../utils/trpc";
import { FlashList } from "@shopify/flash-list";
import React from "react";

type Property = inferProcedureOutput<AppRouter["property"]["all"]>[number];

const PostCards: React.FC<{
    property: Property;
  }> = ({ property }) => {
    return (
      <View className="rounded-lg border-4 border-black p-1">
        <Text className="text-xl font-semibold text-[#cc66ff]">{property.Address}</Text>
        <Text className="text-white">{property.City}</Text>
        <Text className="text-white">{property.State}</Text>
        <Text className="text-white">{property.Zip}</Text>
        <Text className="text-white">{property.Beds}</Text>
        <Text className="text-white">{property.Baths}</Text>
        <Text className="text-white">{property.Sqft}</Text>
        <Text className="text-white">{property.Type}</Text>
        <Text className="text-white">{property.Status}</Text>
        <Text className="text-white">{property.Image}</Text>
        <Text className="text-white">{property.Desc}</Text>
        <Image
      source={{ uri: property.Image }}
      style={{ width: 200, height: 200 }} // Set the width and height as per your requirement
    />
      </View>
    );
  };

  export const PropertyList: React.FC = () => {
    const propQuery = trpc.property.all.useQuery();
    const [showPost, setShowPost] = React.useState<string | null>(null);

    const data: Property[] = propQuery.data ?? [];
    return(
      
       <FlashList 
          data={data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({item}: {item: Property}) => (
            <TouchableOpacity onPress={() => setShowPost(item.id)}>
              <PostCards property={item} />
            </TouchableOpacity>
          )}
        />
      
     
    )
  }
