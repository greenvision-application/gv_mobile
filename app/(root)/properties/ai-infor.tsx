import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
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
  const [selectedImage, setSelectedImage] = useState(
    "https://veuxsagyoicqxlpigzso.supabase.co/storage/v1/object/public/greenvision_store//1740585594718-rosa.jpg"
  );

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isExpanded = (section: string) => expandedSections.includes(section);
  const windowHeight = Dimensions.get("window").height;
  return (
    <View className="flex-1 bg-neutral font-inter">
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View
        className="relative w-full bg-primary shadow-lg"
        style={{ height: windowHeight / 8 }}
      >
        <View
          className="absolute left-4 right-4"
          style={{
            top: Platform.OS === "ios" ? 60 : 20,
          }}
        >
          <View className="flex flex-row items-center w-full justify-center">
            <TouchableOpacity className="absolute left-0 flex flex-row bg-neutral/30 backdrop-blur-lg rounded-full size-12 items-center justify-center shadow-sm">
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-neutral text-2xl font-inter-semibold tracking-wide">
              Thông tin
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 p-4 gap-2"
      >
        {/* Image Section */}
        <View className="shadow-md">
          <Image
            source={{
              uri: selectedImage,
            }}
            className="w-full h-72 rounded-xl"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 flex-row"
            contentContainerStyle={{ gap: 16 }}
          >
            {Array(4)
              .fill(
                "https://i.pinimg.com/736x/2e/cf/06/2ecf067a2069128f44d75d25a32e219e.jpg"
              )
              .map((img, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedImage(img)}
                >
                  <Image
                    source={{ uri: img }}
                    className="w-24 h-24 rounded-xl"
                  />
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        {/* Plant Name Section */}
        <View className="flex-row justify-between items-center pt-2">
          <View>
            <Text className="text-3xl font-inter-extrabold text-gray-800">
              Cây Đuôi Công Táo
            </Text>
            <Text className="text-neutral-500 font-inter-medium text-xl mt-1">
              Họ Dong - Chi Đuôi Công
            </Text>
          </View>
          <TouchableOpacity className="bg-red-50 rounded-full">
            <AntDesign name="heart" size={24} color="red" />
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
                  value={50}
                  minimumTrackTintColor="#3CC18E"
                  maximumTrackTintColor="#E3E6EA"
                  thumbTintColor="#3CC18E"
                  style={{ height: 100 }}
                />
              </View>
              <Text className="text-gray-600 font-medium min-w-16">
                Ít nắng
              </Text>
            </View>
          </View>

          <View className="space-y-2">
            <View className="flex-row items-center">
              <Ionicons name="water" size={35} color="#3CC18E" />
              <View className="flex-1 mx-4">
                <Slider
                  minimumValue={0}
                  maximumValue={100}
                  value={70}
                  minimumTrackTintColor="#3CC18E"
                  maximumTrackTintColor="#E3E6EA"
                  thumbTintColor="#3CC18E"
                  style={{ height: 100 }}
                />
              </View>
              <Text className="text-gray-600 font-medium min-w-16">Vừa</Text>
            </View>
          </View>
        </View>
        {/* Icon Section */}
        <View className="flex-row justify-between py-5">
          {[
            { icon: "sun", text: "20-75cm", Component: Feather },
            {
              icon: "thermometer",
              text: "18-24°C",
              Component: MaterialCommunityIcons,
            },
            { icon: "bar-chart", text: "Trung bình", Component: Feather },
            { icon: "map-pin", text: "Mọi nơi", Component: Feather },
          ].map((item, index) => (
            <View key={index} className="items-center p-3 rounded-2xl">
              <View className="bg-neutral-200 p-4 rounded-full mb-2">
                <item.Component name={item.icon} size={30} color="#263238" />
              </View>
              <Text className="text-sm font-inter-semibold text-neutral-500">
                {item.text}
              </Text>
            </View>
          ))}
        </View>

        {/* Accordion Section */}
        <View className="">
          {["Tổng quan", "Đặc điểm", "Tác dụng", "Ý nghĩa"].map(
            (section, index) => (
              <View
                key={index}
                className="mb-3 border-t border-neutral-300 rounded-xl"
              >
                <TouchableOpacity
                  className="flex-row justify-between items-center px-4 py-3 rounded-sm"
                  onPress={() => toggleSection(section)}
                >
                  <Text className="text-lg font-inter-semibold text-neutral-500">
                    {section}
                  </Text>
                  <View className="rounded-full">
                    {isExpanded(section) ? (
                      <Ionicons name="chevron-up" size={27} color="#263238" />
                    ) : (
                      <Ionicons name="chevron-down" size={27} color="#3CC18E" />
                    )}
                  </View>
                </TouchableOpacity>
                {isExpanded(section) && (
                  <Text className="mt-3 font-inter-light text-neutral-500 leading-7 px-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse nec urna fringilla.
                  </Text>
                )}
              </View>
            )
          )}
        </View>
      </ScrollView>

      {/* Add to Garden Button */}
      <View className="absolute bottom-0 w-full bg-neutral border-t border-neutral-300 p-5">
        <TouchableOpacity className="flex-row items-center justify-center bg-primary py-3.5 rounded-2xl shadow-lg">
          <Text className="text-white text-lg font-bold">Thêm vào vườn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PlantDetailFromGemini;
