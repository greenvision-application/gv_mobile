import React from "react";
import { View, Text } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import variables from "@/constants/variables";
import Slider from "@react-native-community/slider";

interface PlantEnvironmentSlidersProps {
  lightValue: string;
  humidityValue: string;
}
const PlantEnvironmentSliders: React.FC<PlantEnvironmentSlidersProps> = ({
  lightValue,
  humidityValue,
}) => {
  const getLightValue = variables.getValue(lightValue);
  const getHumidityValue = variables.getValue(humidityValue);
  return (
    <>
      <View className="p-3">
        <View className="space-y-2">
          <View className="flex-row items-center">
            <Feather name="sun" size={27} color="#3CC18E" />
            <View className="flex-1 mx-2">
              <Slider
                minimumValue={0}
                maximumValue={100}
                value={getLightValue}
                minimumTrackTintColor="#3CC18E"
                maximumTrackTintColor="#E3E6EA"
                thumbTintColor="#3CC18E"
                style={{ height: 100 }}
                disabled={true}
              />
            </View>
            <Text className="text-gray-600 font-medium min-w-16">
              {variables.getLightText(lightValue)}
            </Text>
          </View>
        </View>
        <View className="space-y-2">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="water" size={27} color="#3CC18E" />
            <View className="flex-1 mx-2">
              <Slider
                minimumValue={0}
                maximumValue={100}
                value={getHumidityValue}
                minimumTrackTintColor="#3CC18E"
                maximumTrackTintColor="#E3E6EA"
                thumbTintColor="#3CC18E"
                style={{ height: 100 }}
                disabled={true}
              />
            </View>
            <Text className="text-gray-600 font-medium min-w-16">
              {variables.getHumidityText(humidityValue)}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default PlantEnvironmentSliders;
