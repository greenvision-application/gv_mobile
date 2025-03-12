import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomSlider from "@/components/CustomSlider";

const PlantEnvironmentSliders: React.FC = () => {
  return (
    <>
      <View className="flex flex-row items-center justify-between px-4">
        <View className="w-1/12">
          <Ionicons name="sunny" size={30} color="#3CC18E" />
        </View>
        <View className="w-10/12">
          <CustomSlider
            label="Volume Control"
            min={0}
            max={60}
            initialValue={80}
            disabled={false}
          />
        </View>
        <View className="w-1/12">
          <Text>Cao</Text>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between px-4">
        <View className="w-1/12">
          <Ionicons name="water" size={30} color="#3CC18E" />
        </View>
        <View className="w-10/12">
          <CustomSlider
            label="Volume Control"
            min={0}
            max={100}
            initialValue={50}
            disabled={false}
          />
        </View>
        <View className="w-1/12">
          <Text>Vừa</Text>
        </View>
      </View>
    </>
  );
};

export default PlantEnvironmentSliders;
