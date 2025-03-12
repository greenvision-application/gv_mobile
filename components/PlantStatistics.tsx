import React from "react";
import { View, Text } from "react-native";
import {
  Ionicons,
  FontAwesome,
  FontAwesome6,
  Feather,
} from "@expo/vector-icons";
import variables from "@/constants/variables";

type StatItemProps = {
  icon: React.ReactNode;
  text: string;
};
type DifficultyLevel =
  keyof typeof variables.ENUM_TRANSLATIONS.DIFFICULTY_LEVEL;
type PlantSite = keyof typeof variables.ENUM_TRANSLATIONS.PLANT_SITE;

const StatItem: React.FC<StatItemProps> = ({ icon, text }) => {
  return (
    <View className="flex flex-col items-center justify-center">
      <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
        {icon}
      </View>
      <Text className="mt-2 font-inter-light text-base text-center">
        {text}
      </Text>
    </View>
  );
};

interface PlantData {
  difficulty_level: DifficultyLevel;
  habitatLocation: PlantSite;
  minTemperature: number;
  maxTemperature: number;
  minMatureSize: number;
  maxMatureSize: number;
  lightRequirement: string;
  humidityRange: string;
}

interface PlantStatisticsProps {
  plantInformation: PlantData;
}

const PlantStatistics: React.FC<PlantStatisticsProps> = ({
  plantInformation,
}) => {
  return (
    <View className="flex flex-row items-center justify-between px-4 py-4">
      <StatItem
        icon={<Feather name="bar-chart" size={24} color="black" />}
        text={
          variables.ENUM_TRANSLATIONS.DIFFICULTY_LEVEL[
            plantInformation.difficulty_level
          ]
        }
      />
      <StatItem
        icon={<Ionicons name="location-outline" size={24} color="black" />}
        text={
          variables.ENUM_TRANSLATIONS.PLANT_SITE[
            plantInformation.habitatLocation
          ]
        }
      />
      <StatItem
        icon={<FontAwesome name="thermometer-half" size={24} color="black" />}
        text={`${plantInformation.minTemperature} - ${plantInformation.maxTemperature}°C`}
      />
      <StatItem
        icon={<FontAwesome6 name="ruler" size={24} color="black" />}
        text={`${plantInformation.minMatureSize} - ${plantInformation.maxMatureSize}cm`}
      />
    </View>
  );
};

export default PlantStatistics;
