import React from "react";
import { View } from "react-native";
import SectionHeader from "./SectionHeader";
import PlantCard from "./PlantCard";
import { Plant } from "@/libs/types";

interface SimilarPlantsProps {
  plants: Plant[];
  showAllSimilar: boolean;
  setShowAllSimilar: (value: boolean) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const SimilarPlants: React.FC<SimilarPlantsProps> = ({
  plants,
  showAllSimilar,
  setShowAllSimilar,
  favorites,
  onToggleFavorite,
}) => {
  return (
    <>
      <SectionHeader
        title="Tương tự cây của bạn"
        showAll={showAllSimilar}
        onToggleShowAll={() => setShowAllSimilar(!showAllSimilar)}
      />
      <View className="flex-row flex-wrap">
        {plants.slice(0, showAllSimilar ? plants.length : 4).map((plant) => (
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

export default SimilarPlants;
