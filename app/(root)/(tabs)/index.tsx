import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Header,
  SearchHeader,
  PopularPlants,
  SimilarPlants,
} from "@/components";
import { popularPlants, similarPlants } from "@/libs/dataFake";
import { logout } from "@/libs/appwrite";
import { useGlobalStore } from "@/store/global";
import { useRouter } from "expo-router";

const Home = () => {
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { refetch } = useGlobalStore();
  const route = useRouter();

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
    route.replace("/(root)/(tabs)/scan");
  };

  const handleNotification = () => {
    route.replace("/(root)/notifications")
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
          const result = await logout();
          if (result) {
            Alert.alert("Success", "Logged out successfully");
            refetch();
          } else {
            Alert.alert("Error", "Failed to logout");
          }
        },
        style: "destructive",
      },
    ]);
  };

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
