import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import PlantDetailsContent from "@/components/PlantDetailsContent";
import Loading from "@/components/Loading";
import { plantData } from "@/libs/dataFake";
import { router, useLocalSearchParams } from "expo-router";
import { CustomModal, Header } from "@/components";
import { addToGarden, plantDetail } from "@/services/plantService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/tanstackQuery";
import Toast from "react-native-toast-message";
import { useGlobalStore } from "@/store/global";
import { useState } from "react";

const Property = () => {
  const { id } = useLocalSearchParams();
  const { setUserPlantId } = useGlobalStore();
  const [isModalVisible, setModalVisible] = useState(false);

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
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Đã thêm cây vào vườn của bạn",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#3CC18E",
        },
        text2Style: {
          fontSize: 14,
          color: "black",
        },
      });
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

  const handleClose = async () => {
    return await addToGarden(
      {
        plant_id: plantInfo.id,
        caring_plant_infor: {},
      },
      () => {
        setModalVisible(false);
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Đã thêm cây vào vườn của bạn",
          position: "top",
          visibilityTime: 3000,
          topOffset: 50,
          text1Style: {
            fontSize: 16,
            fontWeight: "bold",
            color: "#3CC18E",
          },
          text2Style: {
            fontSize: 14,
            color: "black",
          },
        });
      },
      () => {
        setModalVisible(false);
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Không thể thêm cây vào vườn",
          position: "bottom",
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
      }
    );
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
            onPress={() => setModalVisible(true)}
            className="flex-row items-center justify-center bg-primary py-3.5 rounded-2xl shadow-lg"
          >
            <Text className="text-white text-lg font-bold">Thêm vào vườn</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Custom Modal */}
      <CustomModal
        visible={isModalVisible}
        onReject={() => {
          setModalVisible(false);
        }}
        onClose={handleClose}
        onConfirm={handleAdd}
        title="Tạo lịch trình chăm sóc cây"
        message="Bạn có muốn tạo lịch trình chăm sóc cây ngay bây giờ không?"
      />
    </View>
  );
};

export default Property;
