import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useRef } from "react";
import { Ionicons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actionsheet";

const Timeline = () => {
  // development stage
  const [developStage, setDevelopStage] = useState("");
  const developStageActionSheet = useRef<ActionSheet>(null);
  // place plant
  const [placePlant, setPlacePlant] = useState("");
  const placePlantActionSheet = useRef<ActionSheet>(null);
  // soil type
  const [soilType, setSoilType] = useState("");
  const soilTypeActionSheet = useRef<ActionSheet>(null);

  const [plant, setPlant] = useState({
    image:
      "https://hulatrees.com/wp-content/uploads/2022/03/cay-luoi-ho-la-ngan-vien-vang-04.jpg",
    name: "Cây Lưỡi Hổ",
    type: "Cây cảnh",
  });

  const [schedule, setSchedule] = useState({
    water: 3,
    sun: 4,
    soil: 1,
  });
  const plantData = {
    image:
      "https://hulatrees.com/wp-content/uploads/2022/03/cay-luoi-ho-la-ngan-vien-vang-04.jpg",
    name: "Cây Lưỡi Hổ",
    type: "Cây cảnh",
    careLocation: "Chăm sóc trong nhà",
    attributes: [
      { title: "Loại cây", value: "Cây cảnh trong nhà" },
      { title: "Giai đoạn phát triển", value: "Trưởng thành" },
      { title: "Địa điểm trồng", value: "Trong chậu" },
      { title: "Loại đất", value: "Đất tơi xốp" },
    ],
    healthStatus: {
      status: "Phát triển bình thường",
      lastCheck: "23/10/2023",
    },
    careActivities: [
      { title: "Tưới nước", frequency: "3 lần/tuần", icon: "tint" },
      { title: "Tắm nắng", frequency: "4-5 lần/tuần", icon: "wb-sunny" },
      { title: "Xới đất", frequency: "1 lần/tháng", icon: "spa" },
    ],
    actions: ["Bắt sâu", "Thay chậu", "Xịt ẩm", "Tỉa lá", "Khác"],
  };

  const handleSave = () => {
    console.log("Lưu thông tin chăm sóc");
  };

  return (
    <>
      {/* header */}
      <View className="bg-[#3CC18E] p-2 py-4 flex flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => console.log("Back button pressed")}
          className=""
        >
          <Ionicons name="chevron-back-sharp" size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-neutral-100 text-2xl font-inter-bold">
          Chăm sóc
        </Text>
        <TouchableOpacity
          onPress={() => console.log("Setting button pressed")}
          className=""
        >
          <Ionicons name="settings-sharp" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="bg-white px-2">
        {/* Thông tin cây */}
        <View className="bg-gray-100 p-2 px-4 flex flex-row items-center justify-between">
          <View className="">
            <Image
              source={{ uri: plantData.image }}
              className="w-28 h-28 rounded-md"
            />
          </View>
          <View className=" pr-4 flex flex-col justify-between h-24">
            <Text className="text-2xl font-bold">{plantData.name}</Text>
            <Text className="text-gray-500">
              {plantData.type} - {plantData.careLocation}
            </Text>
            <Text className="text-[#3CC18E]">
              Chăm sóc <Text className="font-bold"> trong nhà </Text>
            </Text>
          </View>
        </View>

        {/* Thuộc tính cây */}
        <View className="p-4 flex flex-col gap-4">
          {/* Tên cây */}
          <View className="flex flex-col gap-4">
            <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <FontAwesome name="tree" size={24} color="#3CC18E" />
              <TextInput
                placeholder="Tên cây"
                className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
                placeholderTextColor="#9CA3AF"
                value=""
              />
            </View>
          </View>
          {/* Loại cây */}
          <View className="flex flex-col gap-4">
            <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
              <Ionicons name="person-sharp" size={25} color="#3CC18E" />
              <TextInput
                placeholder="Loại cây"
                className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
                placeholderTextColor="#9CA3AF"
                value=""
                onChangeText={(text) =>
                  console.log("Phone number changed: ", text)
                }
              />
            </View>
          </View>
          {/* Ô chọn giai đoạn phát triển cây */}
          <Pressable
            className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300"
            onPress={() => developStageActionSheet.current?.show()}
          >
            <Ionicons name="transgender-sharp" size={25} color="#3CC18E" />
            <Text className="px-2 flex-1 ml-2 text-[#9CA3AF] font-inter-medium text-md">
              {developStage || "Chọn giai đoạn phát triển của cây"}
            </Text>
          </Pressable>
          {/* Ô chọn địa điểm trồng cây */}
          <Pressable
            className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300"
            onPress={() => placePlantActionSheet.current?.show()}
          >
            <FontAwesome6 name="transgender-sharp" size={25} color="#3CC18E" />
            <Text className="px-2 flex-1 ml-2 text-[#9CA3AF] font-inter-medium text-md">
              {placePlant || "Chọn địa điểm trông cây"}
            </Text>
          </Pressable>
        </View>

        {/* Sức khỏe */}
        <View className="mt-4 p-4 bg-gray-100 rounded-xl">
          <Text className="text-lg font-semibold">Sức khỏe</Text>
          <Text className="text-green-600">
            {plantData.healthStatus.status}
          </Text>
          <Text className="text-gray-400 text-xs">
            Lần soạn cuối: {plantData.healthStatus.lastCheck}
          </Text>
        </View>

        {/* Các hoạt động chăm sóc */}
        {plantData.careActivities.map((item, index) => (
          <View key={index} className="mt-4 p-4 bg-gray-100 rounded-xl">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="settings-sharp" size={24} color="black" />
              <Text className="text-lg font-semibold">{item.title}</Text>
            </View>
            <Text className="text-gray-500">Tần suất: {item.frequency}</Text>
            <Text className="text-gray-400 text-xs">
              Lần chăm sóc cuối: 23/10/2023
            </Text>
          </View>
        ))}

        {/* Nút thao tác */}
        <View className="mt-4 space-y-3">
          {plantData.actions.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-gray-100 p-4 rounded-xl"
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* ActionSheet cho chọn giai đoạn phát triển của cây */}
        <ActionSheet
          ref={developStageActionSheet}
          title="Chọn thời gian phát triển của cây"
          options={["Mới gieo trồng", "Mới nảy mầm", "Phát triển thành cây non", "Cây non phát triển thành cây trưởng thành", "Hủy"]}
          cancelButtonIndex={4} // Index của nút Hủy
          onPress={(index: number) => {
            if (index === 0) setDevelopStage("Mới gieo trồng");
            if (index === 1) setDevelopStage("Mới nảy mầm");
            if (index === 2) setDevelopStage("phát triển thành cây non");
            if (index === 3) setDevelopStage("Cây non phát triển thành cây trưởng thành");
          }}
        />
        {/* ActionSheet cho chọn địa điểm trồng cây */}
        <ActionSheet
          ref={placePlantActionSheet}
          title="Chọn chọn địa điểm trồng cây"
          options={["Trong nhà", "Ngoài trời", "Ban công", "Hủy"]}
          cancelButtonIndex={3} // Index của nút Hủy
          onPress={(index: number) => {
            if (index === 0) setDevelopStage("Trong nhà");
            if (index === 1) setDevelopStage("Ngoài trời");
            if (index === 2) setDevelopStage("Ban công");
          }}
        />

        {/* Nút Lưu */}
        <TouchableOpacity
          onPress={handleSave}
          className="bg-gray-400 p-4 rounded-xl items-center mt-6"
        >
          <Text className="text-white font-semibold">Lưu</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Timeline;
