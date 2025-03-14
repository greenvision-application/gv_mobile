import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StatusBar, Alert } from "react-native";
import { router } from "expo-router";
import PlantDetailsContent from "@/components/PlantDetailsContent";
import Loading from "@/components/Loading";
import { plantData } from "@/libs/dataFake";
import { useLocalSearchParams } from "expo-router";
import { Header } from "@/components";
import { plantDetail } from "@/services/plantService";

const Property = () => {
  const { id } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [plantInfo, setPlantInfo] = useState(plantData);

  useEffect(() => {
    const fetchPlantInfo = async () => {
      try {
        setIsLoading(true);
        const result = await plantDetail(id, (res) => {
          return res;
        });
        if (result) {
          setPlantInfo(result);
        }
      } catch (error) {
        Alert.alert("Lỗi", "Lỗi khi lấy thông tin cây");
        console.error("Error get detail plant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlantInfo();
  }, [id]);

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
      <View className="absolute bottom-0 w-full bg-neutral border-t border-neutral-300 p-5">
        <TouchableOpacity className="flex-row items-center justify-center bg-primary py-3.5 rounded-2xl shadow-lg">
          <Text className="text-white text-lg font-bold">Thêm vào vườn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Property;
