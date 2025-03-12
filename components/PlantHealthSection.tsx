import React from "react";
import { View, Text, TextInput } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

type PlantHealthSectionProps = {
  healthDescription: string;
  setHealthDescription: (text: string) => void;
};

const PlantHealthSection: React.FC<PlantHealthSectionProps> = ({
  healthDescription,
  setHealthDescription,
}) => {
  return (
    <View className="h-auto mt-4 p-4 bg-gray-100 border border-neutral-300 rounded-2xl flex flex-col gap-5">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <MaterialIcons name="health-and-safety" size={25} color="#3CC18E" />
          <Text className="text-lg font-inter-semibold">Sức khỏe</Text>
        </View>
        <Ionicons name="scan-outline" size={25} color="#3CC18E" />
      </View>
      <TextInput
        className="mt-2 p-3 rounded-xl border border-neutral-300 text-lg"
        placeholder="Mô tả tình trạng cây (tối đa 150 ký tự)..."
        placeholderTextColor="#9CA3AF"
        maxLength={150}
        multiline
        value={healthDescription}
        onChangeText={setHealthDescription}
      />
    </View>
  );
};

export default PlantHealthSection;
