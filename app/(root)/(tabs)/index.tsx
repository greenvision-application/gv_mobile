import React, { useState, useEffect } from "react";
import { ScrollView, Alert, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/libs/tanstackQuery";
import {
  Header,
  SearchHeader,
  PopularPlants,
  SimilarPlants,
} from "@/components";
import { similarPlants } from "@/libs/dataFake";
import { logout } from "@/libs/appwrite";
import { useGlobalStore } from "@/store/global";
import helper from "@/libs/helper";
import { popularPlant } from "@/services/plantService";
import { Plant } from "@/libs/types";
import { queryKeys } from "@/libs/tanstackQuery";

const Home = () => {
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { refetch, setLoading } = useGlobalStore();

  const toggleFavorite = (id: string) => {
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

        <SimilarPlants
          plants={similarPlants}
          showAllSimilar={showAllSimilar}
          setShowAllSimilar={setShowAllSimilar}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Home;
