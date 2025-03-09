import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import PlantDetailsContent from "@/components/PlantDetailsContent";
import { useGlobalStore } from "@/store/global";
import { scanPlant } from "@/services/geminiService";
import Loading from "@/components/Loading";
import { plantData } from "@/libs/dataFake";

const PlantDetailFromGemini = () => {
  const { uploadedFile } = useGlobalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [plantInfo, setPlantInfo] = useState(plantData);

  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const fetchPlantInfo = async () => {
      if (!uploadedFile) return;

      try {
        setIsLoading(true);
        const result = await scanPlant(
          uploadedFile,
          (res) => {
            return res;
          },
          (err) => {
            router.replace("/scan");
          }
        );
        if (result) {
          setPlantInfo(result);
        }
      } catch (error) {
        console.error("Error scanning plant:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlantInfo();
  }, [uploadedFile]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-neutral font-inter">
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View
        className="relative w-full bg-primary shadow-lg"
        style={{ height: windowHeight / 8 }}
      >
        <View
          className="absolute left-4 right-4"
          style={{
            top: Platform.OS === "ios" ? 60 : 20,
          }}
        >
          <View className="flex flex-row items-center w-full justify-center">
            <TouchableOpacity className="absolute left-0 flex flex-row bg-neutral/30 backdrop-blur-lg rounded-full size-12 items-center justify-center shadow-sm">
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-neutral text-2xl font-inter-semibold tracking-wide">
              Thông tin
            </Text>
          </View>
        </View>
      </View>
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

export default PlantDetailFromGemini;
