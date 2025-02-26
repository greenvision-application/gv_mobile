import { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const segments = useSegments();
  const [title, setTitle] = useState("Trang chủ");

  useEffect(() => {
    const titles: Record<string, string> = {
      index: "Trang chủ",
      timeline: "Lịch trình",
      scan: "Scan",
      garden: "Vườn cây",
    };

    setTitle(titles[segments[0]] || "Trang chủ");
  }, [segments]);

  return (
    <View className="h-36 bg-[#3CC18E]">
      <View className="h-16 flex items-center justify-center shadow">
        <Text className="text-3xl font-bold text-neutral-100 font-inter-semibold">
          {title}
        </Text>
      </View>
      <View className="flex flex-row items-center justify-between w-full px-4">
        <View className="flex flex-row items-center  rounded-md p-1 bg-neutral-100 w-4/6">
          <Ionicons name="search-outline" size={24} color="#B7BBC1" />
          <TextInput
            className="w-4/6 text-lg text-neutral-500 font-inter-semibold mx-2 py-2 truncate "
            placeholder="Tìm kiếm"
            numberOfLines={1}
            placeholderTextColor="#9CA3AF"
          />
          <Ionicons name="scan-outline" size={24} color="#B7BBC1" />
        </View>
        <View className="flex flex-row justify-between p-5 items-center w-2/6 ">
          <Ionicons name="notifications-outline" size={30} color="white" />
          <Ionicons name="settings-sharp" size={30} color="white" />
        </View>
      </View>
    </View>
  );
};

export default Header;
