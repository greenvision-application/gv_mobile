import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card, Icon } from "@rneui/themed";
import { router } from "expo-router";
import { Plant } from "@/libs/types";
import CustomModal from "./CustomModal";

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
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          console.log("Tạo lịch trình chăm sóc");
        }}
        title="Tạo lịch trình chăm sóc cây"
        message="Bạn có muốn tạo lịch trình chăm sóc cây ngay bây giờ không?"
      />
    </View>
  );
};

export default PlantCard;
