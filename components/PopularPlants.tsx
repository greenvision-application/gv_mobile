import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Plant } from "@/libs/types";
import PlantCard from "./PlantCard";
import SectionHeader from "./SectionHeader";
import NoResults from "./NoResults";
import { useGlobalStore } from "@/store/global";

interface PopularPlantsProps {
  plants: Plant[];
  showAllPopular: boolean;
  setShowAllPopular: (value: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const PopularPlants: React.FC<PopularPlantsProps> = ({
  plants,
  showAllPopular,
  setShowAllPopular,
  favorites,
  onToggleFavorite,
}) => {
  const { loading } = useGlobalStore();
  return (
    <>
      <SectionHeader
        title="Phổ biến"
        showAll={showAllPopular}
        onToggleShowAll={() => setShowAllPopular(!showAllPopular)}
      />
      {loading && (
        <ActivityIndicator size="large" className="text-primary-300 mt-5" />
      )}
      {!loading && plants.length === 0 && <NoResults />}
      <View className="flex-row flex-wrap">
        {plants.slice(0, showAllPopular ? plants.length : 4).map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </View>
    </>
  );
};

export default PopularPlants;
