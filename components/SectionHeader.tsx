import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface SectionHeaderProps {
  title: string;
  showAll: boolean;
  onToggleShowAll: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showAll,
  onToggleShowAll,
}) => {
  return (
    <View className="flex flex-row justify-between items-center py-4">
      <Text className="text-2xl font-inter-bold text-neutral-500">{title}</Text>
      <TouchableOpacity onPress={onToggleShowAll}>
        <Text className="text-primary text-base font-inter-medium">
          {showAll ? "Thu gọn" : "Tất cả"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SectionHeader;
