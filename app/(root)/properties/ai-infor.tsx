import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { router } from "expo-router";
import PlantDetailsContent from "@/components/PlantDetailsContent";
import { useGlobalStore } from "@/store/global";
import { scanPlant } from "@/services/geminiService";
import Loading from "@/components/Loading";
import { plantData } from "@/libs/dataFake";
import { Header } from "@/components";
import Toast from "react-native-toast-message";
import {
  addToGarden,
  createPlant,
  generatePhase,
} from "@/services/plantService";
import { CreatePlantRequest } from "@/libs/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/tanstackQuery";

const PlantDetailFromGemini = () => {
  const { uploadedFile, setUserPlantId } = useGlobalStore();

  // Sử dụng useQuery để lấy thông tin cây
  const { data: plantInfo, isLoading: isLoadingPlantInfo } = useQuery({
    queryKey: [queryKeys.scan, uploadedFile],
    queryFn: async () => {
      if (!uploadedFile) return plantData;

      try {
        const result = await scanPlant(
          uploadedFile,
          (res) => res,
          (err) => {
            router.replace("/scan");
            return null;
          }
        );
        return result || plantData;
      } catch (error) {
        console.error("Error scanning plant:", error);
        return plantData;
      }
    },
    enabled: !!uploadedFile, // Chỉ chạy khi có uploadedFile
  });

  // Mutation để tạo cây mới
  const createPlantMutation = useMutation({
    mutationFn: async (data: CreatePlantRequest) => {
      return await createPlant(data);
    },
    onSuccess: async (data) => {
      await generatePhase(data?.id, {
        plant_name: data?.plant_name,
        scientific_name: data?.scientific_name,
      });
    },
  });

  // Mutation để thêm cây vào vườn
  const addToGardenMutation = useMutation({
    mutationFn: async (plantId: string) => {
      return await addToGarden({
        plant_id: plantId,
        caring_plant_infor: {},
      });
    },
    onSuccess: async (data) => {
      setUserPlantId(data?.id);
      router.push(`/care-form/${createPlantMutation.data.id}`);
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể thêm cây vào vườn",
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
    },
  });

  const handleSave = async () => {
    const prepareFormDataPlant: CreatePlantRequest = {
      approved_content: false,
      characteristic: plantInfo.characteristic,
      difficulty_level: plantInfo.difficulty_level,
      function: plantInfo.function,
      habitatLocation: plantInfo.habitatLocation,
      humidityRange: plantInfo.humidityRange,
      image_url: plantInfo.image_url,
      lightRequirement: plantInfo.lightRequirement,
      maxMatureSize: plantInfo.maxMatureSize,
      maxTemperature: plantInfo.maxTemperature,
      meaning: plantInfo.meaning,
      plant_name: plantInfo.plant_name,
      minMatureSize: plantInfo.minMatureSize,
      minTemperature: plantInfo.minTemperature,
      overview: plantInfo.overview,
      scientific_name: plantInfo.scientific_name,
      soil_type: plantInfo.soil_type,
    };

    // Thực hiện mutation theo chuỗi
    createPlantMutation.mutate(prepareFormDataPlant, {
      onSuccess: (createdPlant) => {
        addToGardenMutation.mutate(createdPlant.id);
      },
      onError: () => {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Không thể tạo cây mới",
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
      },
    });
  };

  if (
    isLoadingPlantInfo ||
    createPlantMutation.isPending ||
    addToGardenMutation.isPending
  ) {
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
        <TouchableOpacity
          onPress={handleSave}
          className="flex-row items-center justify-center bg-primary py-3.5 rounded-2xl shadow-lg"
        >
          <Text className="text-white text-lg font-bold">Thêm vào vườn</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlantDetailFromGemini;
