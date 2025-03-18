import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import PlantDetailsContent from "@/components/PlantDetailsContent";
import Loading from "@/components/Loading";
import { plantData } from "@/libs/dataFake";
import { router, useLocalSearchParams } from "expo-router";
import { Header } from "@/components";
import { addToGarden, plantDetail } from "@/services/plantService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/tanstackQuery";
import Toast from "react-native-toast-message";
import { useGlobalStore } from "@/store/global";

const Property = () => {
  const { id } = useLocalSearchParams();
  const { setUserPlantId } = useGlobalStore();
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

  // Mutation để thêm cây vào vườn
  const addToGardenMutation = useMutation({
    mutationFn: async () => {
      return await addToGarden({
        plant_id: plantInfo.id,
        caring_plant_infor: {},
      });
    },
    onSuccess: async (data) => {
      setUserPlantId(data?.id);
      router.push(`/care-form/${plantInfo.id}`);
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

  const handleAdd = async () => {
    addToGardenMutation.mutate();
  };

  if (isLoading || addToGardenMutation.isPending) {
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
          <TouchableOpacity
            onPress={handleAdd}
            className="flex-row items-center justify-center bg-primary py-3.5 rounded-2xl shadow-lg"
          >
            <Text className="text-white text-lg font-bold">Thêm vào vườn</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Property;
