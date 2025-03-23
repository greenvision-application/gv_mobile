import { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Card, Icon } from "@rneui/themed";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { Plant } from "@/libs/types";
import CustomModal from "./CustomModal";
import { addToGarden } from "@/services/plantService";
import { useGlobalStore } from "@/store/global";
import { queryClient, queryKeys } from "@/libs/tanstackQuery";

interface PlantCardProps {
  plant: Plant;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
}

const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  onToggleFavorite,
  favorites,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { setUserPlantId } = useGlobalStore();

  const handleClose = async () => {
    try {
      setModalVisible(false);
      await addToGarden({ plant_id: plant.id, caring_plant_infor: {} }, () => {
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
        queryClient.invalidateQueries({ queryKey: [queryKeys.unplanted] });
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể thêm cây vào vườn",
        position: "bottom",
        visibilityTime: 1000,
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
  };

  const handleConfirm = async () => {
    try {
      setModalVisible(false);
      const result = await addToGarden(
        { plant_id: plant.id, caring_plant_infor: {} },
        () => {
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
        }
      );
      setUserPlantId(result?.id);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.similar, queryKeys.popular, queryKeys.unplanted],
      });
      router.push(`/care-form/${plant.id}`);
    } catch (error) {
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
  };
  return (
    <View className="w-1/2 px-2 mr-0 pb-4">
      <TouchableOpacity
        onPress={() => {
          router.push(`/properties/${plant.id}`);
        }}
      >
        <Card
          containerStyle={{
            padding: 0,
            paddingVertical: 0,
            borderRadius: 12,
            margin: 0,
          }}
        >
          <View className="relative">
            <Image
              source={{ uri: plant.image }}
              className="w-full h-56 rounded-t-xl rounded-b-none border-b border-neutral-200"
              resizeMode="cover"
            />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-white p-1 rounded-full"
              onPress={() => onToggleFavorite(plant.id)}
            >
              <Icon
                name={favorites.includes(plant.id) ? "heart" : "heart-sharp"}
                type="ionicon"
                color={favorites.includes(plant.id) ? "red" : "#ccc"}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <Text className="text-center text-lg font-bold text-black mt-2">
            {plant.name}
          </Text>
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              setModalVisible(true);
            }}
            className="bg-primary rounded-full mx-4 my-3"
          >
            <Text className="text-neutral text-center font-inter-bold text-xl p-2">
              Thêm vào vườn
            </Text>
          </TouchableOpacity>
        </Card>
      </TouchableOpacity>

      {/* Custom Modal */}
      <CustomModal
        visible={isModalVisible}
        onReject={() => {
          setModalVisible(false);
        }}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Tạo lịch trình chăm sóc cây"
        message="Bạn có muốn tạo lịch trình chăm sóc cây ngay bây giờ không?"
      />
    </View>
  );
};

export default PlantCard;
