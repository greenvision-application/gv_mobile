import React from "react";
import { View } from "react-native";
import { Plant } from "@/libs/types";
import PlantCard from "./PlantCard";
import SectionHeader from "./SectionHeader";

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
  return (
    <>
      <SectionHeader
        title="Phổ biến"
        showAll={showAllPopular}
        onToggleShowAll={() => setShowAllPopular(!showAllPopular)}
      />
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
