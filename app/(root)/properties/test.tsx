import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const PlantDetailFromGemini = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const windowHeight = Dimensions.get("window").height;

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isExpanded = (section: string) => expandedSections.includes(section);

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{
              uri: "https://veuxsagyoicqxlpigzso.supabase.co/storage/v1/object/public/greenvision_store//1740585594718-rosa.jpg",
            }}
            className="size-full"
            resizeMode="cover"
          />
          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              <View className="flex flex-row items-center gap-3">
                <TouchableOpacity>
                  <AntDesign name="heart" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="share" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 mt-7 flex gap-2">
          <Text className="text-2xl font-semibold">Cây Đuôi Công Táo</Text>
          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
              <Text className="text-xs font-bold text-primary-300">
                Họ Dong - Chi Đuôi Công
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center mt-5">
            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
              <Feather name="sun" size={20} color="#22c55e" />
            </View>
            <Text className="text-gray-500 text-sm ml-2">20-75cm</Text>

            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <MaterialCommunityIcons
                name="thermometer"
                size={20}
                color="#22c55e"
              />
            </View>
            <Text className="text-gray-500 text-sm ml-2">18-24°C</Text>

            <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
              <Feather name="map-pin" size={20} color="#22c55e" />
            </View>
            <Text className="text-gray-500 text-sm ml-2">Trung bình</Text>
          </View>

          <View className="w-full border-t border-primary-200 pt-7 mt-5">
            {["Tổng quan", "Đặc điểm", "Tác dụng", "Ý nghĩa"].map(
              (section, index) => (
                <View key={index} className="mb-4">
                  <TouchableOpacity
                    className="flex-row justify-between items-center p-4 bg-primary-100 rounded-lg"
                    onPress={() => toggleSection(section)}
                  >
                    <Text className="text-lg font-semibold">{section}</Text>
                    {isExpanded(section) ? (
                      <AntDesign name="up" size={20} color="#9ca3af" />
                    ) : (
                      <AntDesign name="down" size={20} color="#9ca3af" />
                    )}
                  </TouchableOpacity>
                  {isExpanded(section) && (
                    <Text className="mt-3 text-base text-gray-500 px-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Suspendisse nec urna fringilla.
                    </Text>
                  )}
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Text className="text-gray-500 text-xs font-medium">Độ khó</Text>
            <Text className="text-primary-300 text-start text-2xl font-bold">
              Trung bình
            </Text>
          </View>
          <TouchableOpacity className="flex-1 flex flex-row items-center justify-center bg-green-500 py-3 rounded-full shadow-md shadow-zinc-400">
            <Text className="text-white text-lg text-center font-bold">
              Thêm vào vườn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlantDetailFromGemini;
