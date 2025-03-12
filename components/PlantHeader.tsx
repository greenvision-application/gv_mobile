import React from "react";
import { View, Text, Image } from "react-native";

type PlantHeaderProps = {
  image: string;
  name: string;
  type: string;
  careLocation: string;
};

const PlantHeader: React.FC<PlantHeaderProps> = ({
  image,
  name,
  type,
  careLocation,
}) => {
  return (
    <View className="bg-neutral px-2 pt-4 flex flex-row items-center gap-x-5">
      <Image source={{ uri: image }} className="w-40 h-40 rounded-2xl" />
      <View>
        <Text className="text-2xl font-inter-bold mb-4">{name}</Text>
        <Text className="text-neutral-400 text-xl mb-4">{type}</Text>
        <Text className="text-primary">
          Chăm sóc <Text className="font-inter-bold">{careLocation}</Text>
        </Text>
      </View>
    </View>
  );
};

export default PlantHeader;
