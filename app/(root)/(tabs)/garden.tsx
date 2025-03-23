import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Entypo,
  FontAwesome6,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { Header, Loading, SaveButton } from "@/components";
import { getDetailUser } from "@/services/userService";
import {
  getUnplanted,
  getFavorite,
  getPlanted,
  handleFavorite,
  removeUserPlant,
} from "@/services/plantService";
import { useQuery } from "@tanstack/react-query";
import { queryClient, queryKeys } from "@/libs/tanstackQuery";
import Toast from "react-native-toast-message";
import { useGlobalStore } from "@/store/global";

// Define types
interface UserData {
  address: {
    ward: string;
    district: string;
    province: string;
  } | null;
  email: string;
  username: string | null;
  preferences: any | null;
}

interface Plant {
  id: string;
  image_url: string[];
  plant_name: string;
}

interface PlantData {
  id: string;
  nickname: string;
  Plant: Plant;
}

interface PlantDataMap {
  all: PlantData[];
  favorites: PlantData[];
  unplanted: PlantData[];
}

interface UserStats {
  totalPlants: number;
  favorites: number;
  unplanted: number;
}

type TabType = "all" | "favorites" | "unplanted";

const fetchDetailUser = async (): Promise<UserData> => {
  const result = await getDetailUser();
  return result;
};

const fetchPlanted = async (): Promise<PlantData[]> => {
  const result = await getPlanted();
  return result;
};

const fetchFavorite = async (): Promise<PlantData[]> => {
  const result = await getFavorite();
  return result;
};

const fetchUnplanted = async (): Promise<PlantData[]> => {
  const result = await getUnplanted();
  return result;
};

// Thêm function để gọi API bỏ yêu thích
const handleRemoveFavorite = async (plantId: string): Promise<void> => {
  try {
    await handleFavorite(plantId, () => {
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Đã bỏ yêu thích cây này",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#3CC18E",
        },
        text2Style: {
          fontSize: 14,
          color: "black",
        },
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.unplanted, queryKeys.similar, queryKeys.popular],
      });
    });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Lỗi",
      text2: "Không thể bỏ yêu thích, vui lòng thử lại sau",
      position: "top",
      visibilityTime: 3000,
      topOffset: 50,
      text1Style: {
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
      },
      text2Style: {
        fontSize: 14,
        color: "black",
      },
    });
  }
};

// Thêm function để gọi API xóa cây chưa trồng
const handleRemovePlant = async (plantId: string): Promise<void> => {
  try {
    await removeUserPlant(plantId, () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.similar, queryKeys.popular, queryKeys.favorite],
      });
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Đã xóa cây khỏi danh sách",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#3CC18E",
        },
        text2Style: {
          fontSize: 14,
          color: "black",
        },
      });
    });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Lỗi",
      text2: "Không thể xóa cây, vui lòng thử lại sau",
      position: "top",
      visibilityTime: 3000,
      topOffset: 50,
      text1Style: {
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
      },
      text2Style: {
        fontSize: 14,
        color: "black",
      },
    });
  }
};

const Garden: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { setUserPlantId } = useGlobalStore();
  // Fetch user data with corrected query functions
  const { data: userData, isLoading: userLoading } = useQuery<UserData>({
    queryKey: [queryKeys.user],
    queryFn: fetchDetailUser,
  });

  // Fetch planted plants
  const { data: plantedData, isLoading: plantedLoading } = useQuery<
    PlantData[]
  >({
    queryKey: [queryKeys.planted],
    queryFn: fetchPlanted,
  });

  // Fetch favorite plants
  const { data: favoriteData, isLoading: favoriteLoading } = useQuery<
    PlantData[]
  >({
    queryKey: [queryKeys.favorite],
    queryFn: fetchFavorite,
  });

  // Fetch unplanted plants
  const { data: unplantedData, isLoading: unplantedLoading } = useQuery<
    PlantData[]
  >({
    queryKey: [queryKeys.unplanted],
    queryFn: fetchUnplanted,
  });

  // Combine all plant data
  const plantData: PlantDataMap = {
    all: plantedData || [],
    favorites: favoriteData || [],
    unplanted: unplantedData || [],
  };

  // Calculate user stats based on API data
  const userStats: UserStats = {
    totalPlants: plantedData?.length || 0,
    favorites: favoriteData?.length || 0,
    unplanted: unplantedData?.length || 0,
  };

  // Show loading state if any data is loading
  if (userLoading || plantedLoading || favoriteLoading || unplantedLoading) {
    return (
      <>
        <Header title="Vườn cây" />
        <Loading />
      </>
    );
  }

  const handlePress = (id?: string) => {
    if (activeTab === "all" && id) {
      router.push(`/agenda/${id}`);
    } else {
      router.push(`/properties/${id}`);
    }
  };

  // Thêm hàm xử lý sự kiện bỏ yêu thích
  const onRemoveFavorite = async (plantId: string) => {
    await handleRemoveFavorite(plantId);

    // Cập nhật lại dữ liệu sau khi bỏ yêu thích
    queryClient.setQueryData<PlantData[]>([queryKeys.favorite], (oldData) => {
      return oldData ? oldData.filter((plant) => plant.id !== plantId) : [];
    });

    // Cập nhật lại số lượng yêu thích
    queryClient.setQueryData<UserStats>(["userStats"], (oldStats) => {
      if (!oldStats) return userStats;
      return {
        ...oldStats,
        favorites: oldStats.favorites - 1,
      };
    });
  };

  // Thêm hàm xử lý sự kiện xóa cây chưa trồng
  const onRemovePlant = async (plantId: string) => {
    // Hiển thị hộp thoại xác nhận
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa cây này khỏi danh sách?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            await handleRemovePlant(plantId);

            // Cập nhật lại dữ liệu sau khi xóa
            queryClient.setQueryData<PlantData[]>(
              [queryKeys.unplanted],
              (oldData) => {
                return oldData
                  ? oldData.filter((plant) => plant.id !== plantId)
                  : [];
              }
            );

            // Cập nhật lại dữ liệu favorite
            queryClient.setQueryData<PlantData[]>(
              [queryKeys.favorite],
              (oldData) => {
                return oldData
                  ? oldData.filter((plant) => plant.id !== plantId)
                  : [];
              }
            );

            // Cập nhật lại số lượng cây chưa trồng và yêu thích
            queryClient.setQueryData<UserStats>(["userStats"], (oldStats) => {
              if (!oldStats) return userStats;
              return {
                ...oldStats,
                unplanted: oldStats.unplanted - 1,
                favorites:
                  oldStats.favorites -
                  (favoriteData?.some((plant) => plant.id === plantId) ? 1 : 0),
              };
            });
          },
        },
      ]
    );
  };

  const renderPlants = (): JSX.Element => {
    const plants = plantData[activeTab];

    if (!plants || plants.length === 0) {
      return (
        <View className="mt-4 px-4 items-center justify-center py-10">
          <Text className="text-lg text-neutral-500">
            Không có cây nào trong danh mục này
          </Text>
        </View>
      );
    }

    return (
      <View className="mt-4 px-4 mb-20">
        <View className="flex-row flex-wrap gap-4">
          {plants.map((plant) => (
            <TouchableOpacity
              key={plant.id}
              className="w-[48%] bg-neutral rounded-2xl shadow-lg overflow-hidden border border-neutral-200"
              onPress={() => {
                activeTab === "all"
                  ? handlePress(plant.id)
                  : handlePress(plant.Plant.id);
              }}
            >
              <View className="relative">
                <Image
                  source={{ uri: plant.Plant.image_url[0] }}
                  className="w-full h-56"
                  resizeMode="cover"
                />

                {/* Nút trái tim bỏ yêu thích ở góc phải trên của card khi ở tab favorites */}
                {activeTab === "favorites" && (
                  <TouchableOpacity
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
                    onPress={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(plant.id);
                    }}
                  >
                    <Entypo name="heart" size={20} color="#FF4B6E" />
                  </TouchableOpacity>
                )}

                {/* Nút xóa ở góc phải trên của card khi ở tab unplanted */}
                {activeTab === "unplanted" && (
                  <TouchableOpacity
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
                    onPress={(e) => {
                      e.stopPropagation();
                      onRemovePlant(plant.id);
                    }}
                  >
                    <AntDesign name="delete" size={20} color="#FF4B6E" />
                  </TouchableOpacity>
                )}
              </View>

              <View className="p-2 items-center">
                <Text className="text-lg font-inter-bold text-neutral-500">
                  {plant.nickname ? plant.nickname : plant.Plant.plant_name}
                </Text>

                {activeTab === "unplanted" ? (
                  <SaveButton
                    text="Trồng ngay"
                    onPress={() => {
                      setUserPlantId(plant.id);
                      router.push(`/care-form/${plant.Plant.id}`);
                    }}
                    style="p-2 rounded-3xl bg-primary"
                  />
                ) : (
                  ""
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider className="flex-1">
      <Header title="Vườn cây" />
      <ScrollView className="mb-20 bg-neutral">
        <View className="info-container bg-neutral">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc",
            }}
            className="w-full h-48"
          />

          <View className="items-start mt-[-60] ml-5">
            <Pressable
              className="relative"
              onPress={() => {
                router.push("/user-infor");
              }}
            >
              <Image
                source={{
                  uri: userData?.preferences?.avatar
                    ? userData?.preferences?.avatar
                    : "https://avatar.iran.liara.run/public/45",
                }}
                className="w-36 h-36 rounded-full border-4 border-neutral"
              />
              <View className="absolute bottom-2 right-3 bg-primary w-8 h-8 rounded-full justify-center items-center">
                <MaterialIcons name="photo-library" size={18} color="white" />
              </View>
            </Pressable>
            <View className="mt-2">
              <Text className="text-2xl font-inter-bold text-left">
                {userData?.username}
              </Text>
              <Text className="text-lg text-gray-500 mt-1 text-left">
                Email: {userData?.email}
              </Text>
              <Text className="text-lg text-gray-500 mt-1 text-left">
                Địa chỉ:{" "}
                {userData?.address
                  ? `${userData.address.ward}, ${userData.address.district}, ${userData.address.province}`
                  : "Chưa cập nhật địa chỉ"}
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row justify-around my-4">
          <TouchableOpacity
            onPress={() => setActiveTab("all")}
            className="items-center"
          >
            <FontAwesome6
              name="seedling"
              size={25}
              color={activeTab === "all" ? "#0B5B5C" : "#3CC18E"}
            />
            <Text className="text-center">{userStats.totalPlants}</Text>
            <Text className="text-center">Cây trồng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("favorites")}
            className="items-center"
          >
            <Entypo
              name="heart"
              size={25}
              color={activeTab === "favorites" ? "#0B5B5C" : "#3CC18E"}
            />
            <Text className="text-center">{userStats.favorites}</Text>
            <Text className="text-center">Yêu thích</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("unplanted")}
            className="items-center"
          >
            <MaterialCommunityIcons
              name="seed"
              size={25}
              color={activeTab === "unplanted" ? "#0B5B5C" : "#3CC18E"}
            />
            <Text className="text-center">{userStats.unplanted}</Text>
            <Text className="text-center">Cây chưa trồng</Text>
          </TouchableOpacity>
        </View>
        {renderPlants()}
      </ScrollView>
    </SafeAreaProvider>
  );
};
export default Garden;
