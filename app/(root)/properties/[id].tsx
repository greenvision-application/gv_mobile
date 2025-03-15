import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar, Alert } from "react-native";
import { router } from "expo-router";
import PlantDetailsContent from "@/components/PlantDetailsContent";
import Loading from "@/components/Loading";
import { plantData } from "@/libs/dataFake";
import { useLocalSearchParams } from "expo-router";
import { Header } from "@/components";
import { plantDetail } from "@/services/plantService";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/tanstackQuery";

const Property = () => {
  const { id } = useLocalSearchParams();
  const {
    data: plantInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [queryKeys.plant_detail, id],
    queryFn: async () => {
      try {
        const result = await plantDetail(
          id,
          (res) => {
            return res;
          },
          () => {
            return plantData;
          }
        );
        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-neutral font-inter">
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <Header title="Thông tin" />

      <PlantDetailsContent plantData={plantInfo} />
      {/* Add to Garden Button */}
      {!isError && (
        <View className="absolute bottom-0 w-full bg-neutral border-t border-neutral-300 p-5">
          <TouchableOpacity className="flex-row items-center justify-center bg-primary py-3.5 rounded-2xl shadow-lg">
            <Text className="text-white text-lg font-bold">Thêm vào vườn</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Property;
