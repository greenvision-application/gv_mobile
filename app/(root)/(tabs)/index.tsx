import React, { useState, useEffect } from "react";
import { ScrollView, Alert, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import {
  Header,
  SearchHeader,
  PopularPlants,
  SimilarPlants,
  ErrorMessage,
  Loading,
} from "@/components";
import { logout } from "@/libs/appwrite";
import { useGlobalStore } from "@/store/global";
import helper from "@/libs/helper";
import {
  addToGarden,
  handleFavorite,
  popularPlant,
  recommendationsPlant,
} from "@/services/plantService";
import { Plant } from "@/libs/types";
import { queryClient, queryKeys } from "@/libs/tanstackQuery";
import Toast from "react-native-toast-message";

const Home = () => {
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { refetch } = useGlobalStore();

  const toggleFavorite = async (id: string) => {
    try {
      const createdUserPlant = await addToGarden({
        plant_id: id,
        caring_plant_infor: {},
      });

      await handleFavorite(createdUserPlant.id, () => {
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.favorite,
            queryKeys.unplanted,
            queryKeys.popular,
            queryKeys.similar,
          ],
        });
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thay đổi yêu thích, vui lòng thử lại sau",
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
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSearch = (text: string) => {
    console.log("Searching for:", text);
  };

  const handleScan = () => {
    router.replace("/(root)/(tabs)/scan");
  };

  const handleNotification = () => {
    router.push("/(root)/notifications");
  };

  const handleNotificationSettings = () => {
    console.log("Opening notification settings");
    // Điều hướng đến màn hình cài đặt thông báo
  };

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        onPress: async () => {
          const token = await helper.getToken();

          const result = token ? await helper.removeToken() : await logout();

          if (result) {
            Alert.alert("Thành công", "Đăng xuất thành công");
            refetch();
          } else {
            Alert.alert("Lỗi", "Lỗi khi đăng xuất");
          }
        },
        style: "destructive",
      },
    ]);
  };
  const fetchPopularPlants = async (): Promise<Plant[]> => {
    try {
      const data = await new Promise<Plant[]>((resolve, reject) => {
        popularPlant(
          (res) => resolve(helper.mapApiDataToPlants(res)),
          (err) => reject(new Error(err.message))
        );
      });
      return data;
    } catch (error) {
      throw new Error("Đã xảy ra lỗi khi tải dữ liệu!");
    }
  };

  const { data: popularPlants = [] } = useQuery({
    queryKey: [queryKeys.popular],
    queryFn: fetchPopularPlants,
    staleTime: 1000,
  });

  const {
    data: similarPlants = [],
    isLoading: similarPlantsLoading,
    error: similarPlantsError,
  } = useQuery({
    queryKey: [queryKeys.similar],
    queryFn: async () => {
      return new Promise<Plant[]>((resolve, reject) => {
        recommendationsPlant(
          (res) => {
            const data = helper.mapRecommendationPlants(res);
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    staleTime: 1000,
  });

  return (
    <SafeAreaProvider>
      {/* Header */}
      <Header title="Trang chủ" />

      {/* Search Header */}
      <SearchHeader
        onSearch={handleSearch}
        onScan={handleScan}
        onNotification={handleNotification}
        onNotificationSettings={handleNotificationSettings}
        onLogout={handleLogout}
      />

      {/* Content */}
      <ScrollView className="flex-1 mb-20 bg-neutral px-2">
        <PopularPlants
          plants={popularPlants}
          showAllPopular={showAllPopular}
          setShowAllPopular={setShowAllPopular}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        {similarPlantsLoading ? (
          <Loading />
        ) : similarPlantsError ? (
          <ErrorMessage message="Lỗi khi lấy dữ liệu câu tương tự" />
        ) : similarPlants.length > 0 ? (
          <SimilarPlants
            plants={similarPlants}
            showAllSimilar={showAllSimilar}
            setShowAllSimilar={setShowAllSimilar}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        ) : null}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Home;
