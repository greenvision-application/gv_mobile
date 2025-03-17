import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import variables from "@/constants/variables";

type PlantSite = keyof typeof variables.ENUM_TRANSLATIONS.PLANT_SITE;
type SoilType = keyof typeof variables.ENUM_TRANSLATIONS.SOIL_TYPE;
type DifficultyLevel =
  keyof typeof variables.ENUM_TRANSLATIONS.DIFFICULTY_LEVEL;
type Level = keyof typeof variables.ENUM_TRANSLATIONS.LEVEL;

interface PlantDetailsContentProps {
  plantData: {
    id?: string;
    created_at?: Date;
    plant_name: string;
    scientific_name?: string;
    image_url: string[];
    overview: string[];
    characteristic: string[];
    function: string[];
    meaning: string[];
    difficulty_level: DifficultyLevel;
    soil_type: SoilType;
    category_id?: string;
    habitatLocation: PlantSite;
    minTemperature: number;
    maxTemperature: number;
    minMatureSize: number;
    maxMatureSize: number;
    humidityRange: Level;
    lightRequirement: Level;
  };
}

const PlantDetailsContent: React.FC<PlantDetailsContentProps> = ({
  plantData,
}) => {
  const [selectedImage, setSelectedImage] = useState(plantData.image_url[0]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isExpanded = (section: string) => expandedSections.includes(section);

  const getLightValue = variables.getValue(plantData.lightRequirement);
  const getHumidityValue = variables.getValue(plantData.humidityRange);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="pb-32 p-4 gap-2"
    >
      {/* Image Section */}
      <View className="shadow-md">
        <Image
          source={{ uri: selectedImage }}
          className="w-full h-72 rounded-xl"
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 flex-row"
          contentContainerStyle={{ gap: 16, justifyContent: "center" }}
        >
          {plantData.image_url.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedImage(img)}>
              <Image source={{ uri: img }} className="w-24 h-24 rounded-xl" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Plant Name Section */}
      <View className="flex-row justify-between items-center pt-2">
        <View>
          <Text className="text-3xl font-inter-extrabold text-neutral-500">
            {plantData.plant_name}
          </Text>
          <Text className="text-neutral-500 font-inter-medium text-xl mt-1">
            {plantData.scientific_name}
          </Text>
        </View>
        <TouchableOpacity className="bg-neutral rounded-full">
          <MaterialCommunityIcons
            name="comment-question"
            size={35}
            color="#3CC18E"
          />
        </TouchableOpacity>
      </View>

      {/* Slider Section */}
      <View className="space-y-6 mt-7">
        <View className="space-y-2">
          <View className="flex-row items-center">
            <Feather name="sun" size={35} color="#3CC18E" />
            <View className="flex-1 mx-4">
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
              {variables.getLightText(plantData.lightRequirement)}
            </Text>
          </View>
        </View>
        <View className="space-y-2">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="water" size={35} color="#3CC18E" />
            <View className="flex-1 mx-4">
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
              {variables.getHumidityText(plantData.humidityRange)}
            </Text>
          </View>
        </View>
      </View>

      {/* Icon Section */}
      <View className="flex-row justify-between py-5">
        {[
          {
            icon: "ruler",
            text: `${plantData.minMatureSize}-${plantData.maxMatureSize}cm`,
            Component: MaterialCommunityIcons,
          },
          {
            icon: "thermometer",
            text: `${plantData.minTemperature}-${plantData.maxTemperature}°C`,
            Component: MaterialCommunityIcons,
          },
          {
            icon: "bar-chart",
            text: variables.ENUM_TRANSLATIONS.DIFFICULTY_LEVEL[
              plantData.difficulty_level
            ],
            Component: Feather,
          },
          {
            icon: "map-pin",
            text: variables.ENUM_TRANSLATIONS.PLANT_SITE[
              plantData.habitatLocation
            ],
            Component: Feather,
          },
        ].map((item, index) => (
          <View key={index} className="items-center p-3 rounded-2xl">
            <View className="bg-neutral-200 p-4 rounded-full mb-2">
              <item.Component
                name={item.icon as any}
                size={30}
                color="#263238"
              />
            </View>
            <Text className="text-sm font-inter-semibold text-neutral-500">
              {item.text}
            </Text>
          </View>
        ))}
      </View>

      {/* Accordion Section */}
      <View className="">
        {[
          { title: "Tổng quan", content: plantData.overview },
          { title: "Đặc điểm", content: plantData.characteristic },
          { title: "Tác dụng", content: plantData.function },
          { title: "Ý nghĩa", content: plantData.meaning },
        ].map((section, index) => (
          <View
            key={index}
            className="mb-3 border-t border-neutral-300 rounded-xl"
          >
            <TouchableOpacity
              className="flex-row justify-between items-center px-4 py-3 rounded-sm"
              onPress={() => toggleSection(section.title)}
            >
              <Text className="text-lg font-inter-semibold text-neutral-500">
                {section.title}
              </Text>
              <View className="rounded-full">
                {isExpanded(section.title) ? (
                  <Ionicons name="chevron-up" size={27} color="#263238" />
                ) : (
                  <Ionicons name="chevron-down" size={27} color="#3CC18E" />
                )}
              </View>
            </TouchableOpacity>
            {isExpanded(section.title) && (
              <Text className="mt-3 font-inter-light text-neutral-500 leading-7 px-4">
                {section.content.join("\n")}
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default PlantDetailsContent;
