import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ErrorMessage, Header, Loading } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/tanstackQuery";
import variables from "@/constants/variables";
import { getTimeline } from "@/services/plantService";
import { router } from "expo-router";

type PlantSite = keyof typeof variables.ENUM_TRANSLATIONS.PLANT_SITE;
// Định nghĩa type cho dữ liệu
interface UserPlant {
  id: string;
  nickname: string | null;
  plant_site: PlantSite;
  image_url: string[];
  Plant: {
    plant_name: string;
    image_url: string[];
  };
}

interface TransformedLocation {
  key: string;
  location: string;
  images: string;
  plants: {
    id: string;
    name: string;
    image: string;
  }[];
  lastCare: string;
}

// Hàm chuyển đổi dữ liệu API thành định dạng mà UI hiện tại cần
const transformTimelineData = (data: UserPlant[]): TransformedLocation[] => {
  // Nhóm các cây theo vị trí
  const groupedByLocation = data.reduce((acc, plant) => {
    // Lấy thông tin vị trí từ placePlant
    const locationValue = plant.plant_site;
    let locationKey = locationValue;
    let locationName = variables.placePlant[locationValue]?.label || "Khác";
    let locationImage = variables.placePlant[locationValue]?.image || "";

    // Nếu vị trí chưa tồn tại, tạo mới
    if (!acc[locationKey]) {
      acc[locationKey] = {
        key: locationKey,
        location: locationName,
        images: locationImage || plant.Plant.image_url[0],
        plants: [],
        lastCare: "Chưa có dữ liệu",
      };
    }

    // Thêm cây vào danh sách tại vị trí
    acc[locationKey].plants.push({
      id: plant.id,
      name: plant.nickname || plant.Plant.plant_name,
      image: plant.Plant.image_url[0] || "",
    });

    return acc;
  }, {} as Record<string, TransformedLocation>);

  // Chuyển đổi object thành mảng
  return Object.values(groupedByLocation);
};

export default function Timeline() {
  const [expanded, setExpanded] = useState<string | null>(null);

  // Sử dụng React Query để fetch dữ liệu
  const { isLoading, error, data } = useQuery({
    queryKey: [queryKeys.timeline],
    queryFn: () => {
      const result = getTimeline((res) => {
        return res;
      });
      return result;
    },
  });

  // Chuyển đổi dữ liệu từ API
  const transformedData = data ? transformTimelineData(data) : [];

  // Hiển thị trạng thái loading
  if (isLoading) {
    return (
      <>
        <Header title="Lịch trình" />
        <Loading />
      </>
    );
  }

  // Hiển thị lỗi nếu có
  if (error) {
    return (
      <>
        <Header title="Lịch trình" />
        <ErrorMessage
          message={error.message ?? "Đã xảy ra lỗi khi tải dữ liệu"}
        />
      </>
    );
  }

  return (
    <>
      <Header title="Lịch trình" />
      {/* Menu cây được chăm sóc */}
      <View className="flex-1 bg-neutral mb-20">
        {/* Danh sách vị trí cây */}
        <FlatList
          data={transformedData}
          keyExtractor={(item) => item.key}
          ListEmptyComponent={
            <View className="p-10 justify-center items-center">
              <Text className="text-neutral-500">Không có dữ liệu</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View className="border-b border-neutral-300 p-4">
              {/* Tiêu đề vị trí */}
              <TouchableOpacity
                onPress={() =>
                  setExpanded(expanded === item.key ? null : item.key)
                }
                className="flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: item.images }}
                    className="w-24 h-24 border border-neutral-300 rounded-xl"
                  />
                  <View className="flex h-fit gap-3 flex-col ml-5 justify-between">
                    <Text className="text-xl font-inter-bold">
                      {item.location}
                    </Text>
                    <Text className="text-neutral-500">
                      {item.plants.length} cây trồng
                    </Text>
                    <Text className="text-neutral-500">
                      Lần chăm sóc cuối • {item.lastCare}
                    </Text>
                  </View>
                </View>

                {expanded === item.key ? (
                  <Ionicons name="chevron-up" size={28} color="#3CC18E" />
                ) : (
                  <Ionicons name="chevron-down" size={28} color="#3CC18E" />
                )}
              </TouchableOpacity>

              {/* Hiển thị danh sách cây khi mở rộng */}
              {expanded === item.key && (
                <FlatList
                  data={item.plants}
                  numColumns={2}
                  keyExtractor={(plant) => plant.id}
                  renderItem={({ item: plant }) => (
                    <TouchableOpacity
                      className="flex flex-row w-1/2 gap-2 border-neutral-300 pr-2 pt-4"
                      onPress={() => {
                        router.push(`/agenda/${plant.id}`);
                      }}
                    >
                      <View className="w-full border border-neutral-300 rounded-xl overflow-hidden">
                        <Image
                          source={{ uri: plant.image }}
                          className="w-full h-44"
                          resizeMode="cover"
                        />
                        <Text className="text-xl font-bold p-4 text-center">
                          {plant.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              )}
            </View>
          )}
        />
      </View>
    </>
  );
}
