import React from "react";
import { View, Text } from "react-native";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";

type StatItemProps = {
  icon: React.ReactNode;
  text: string;
};

const StatItem: React.FC<StatItemProps> = ({ icon, text }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
        {icon}
      </View>
      <Text className="mt-2 font-inter-light text-base">{text}</Text>
    </View>
  );
};

const PlantStatistics: React.FC = () => {
  return (
    <View className="flex flex-row items-center justify-between px-4 py-4">
      <StatItem
        icon={<Ionicons name="stats-chart-outline" size={24} color="black" />}
        text="Trung bình"
      />
      <StatItem
        icon={<Ionicons name="location-outline" size={24} color="black" />}
        text="Phòng khách"
      />
      <StatItem
        icon={<FontAwesome name="thermometer-half" size={24} color="black" />}
        text="13 - 35 C"
      />
      <StatItem
        icon={<FontAwesome6 name="ruler" size={24} color="black" />}
        text="50 - 60cm"
      />
    </View>
  );
};

export default PlantStatistics;
