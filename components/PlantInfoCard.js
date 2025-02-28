import React from 'react';
import { View, Text, Image } from 'react-native';

const PlantInfoCard =({ plant }) => {
  return (
    <View className="flex-row items-center bg-gray-100 p-4 rounded-lg">
      <Image source={{ uri: plant.image }} className="w-16 h-16 rounded-lg mr-4"/>
      <View>
        <Text className="text-lg font-bold">{plant.name}</Text>
        <Text className="text-gray-500">{plant.type}</Text>
      </View>
    </View>
  );
};

export default PlantInfoCard;