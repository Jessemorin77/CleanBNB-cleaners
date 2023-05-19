import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { trpc } from "../../utils/trpc";
import React from "react";

interface ListItemProps {
  property: {
    id: string;
    Address: string;
  };
  onPress: (propertyId: string) => void;
  isSelected: boolean;
}

const ListItem: React.FC<ListItemProps> = ({ property, onPress, isSelected }) => {
  const handlePress = () => {
    onPress(property.id);
  };

  const backgroundColor = isSelected ? "bg-red-400" : "bg-red-100";

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ backgroundColor }} className="rounded-lg border-4 p-1">
        <Text className="text-white font-semibold text-[#cc66ff]">{property.Address}</Text>
      </View>
    </TouchableOpacity>
  );
};

interface PropertyListProps {
  onSelect: (propertyId: string) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({ onSelect }) => {
  const propQuery = trpc.property.all.useQuery();
  const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | null>(null);

  const handlePress = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    onSelect(propertyId);
  };

  const renderItem = ({ item }: { item: { id: string; Address: string } }) => {
    return (
      <ListItem
        property={item}
        onPress={handlePress}
        isSelected={selectedPropertyId === item.id}
      />
    );
  };

  const keyExtractor = (item: { id: string; Address: string }) => item.id;

  return (
    <>
      <FlatList
        data={propQuery.data ?? []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />
      {selectedPropertyId === null && (
        <Text className="text-red-500">Please select a property</Text>
      )}
    </>
  );
};
