import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Header,
  SearchHeader,
  PopularPlants,
  SimilarPlants,
} from "@/components";
import { popularPlants, similarPlants } from "@/libs/dataFake";

const Home = () => {
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

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
    console.log("Opening scanner");
  };

  const handleNotification = () => {
    console.log("Opening notifications");
  };

  const handleSettings = () => {
    console.log("Opening settings");
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
        onSettings={handleSettings}
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
