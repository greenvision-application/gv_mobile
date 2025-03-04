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
import PlantDetailsContent from "@/components/PlantDetailsContent";
import { useGlobalStore } from "@/store/global";
import { scanPlant } from "@/services/userService";
import Loading from "@/components/Loading";

const plantData = {
  plant_name: "Sen",
  scientific_name: "Nelumbo nucifera",
  overview: [
    "Sen là một loài thực vật thủy sinh thuộc chi Nelumbo, thường được gọi là hoa sen.",
    "Sen có nguồn gốc từ châu Á và châu Úc, được trồng rộng rãi ở nhiều nơi trên thế giới.",
    "Hoa sen có nhiều màu sắc khác nhau, nhưng phổ biến nhất là màu hồng và trắng.",
    "Sen không chỉ là một loài hoa đẹp mà còn có nhiều công dụng trong đời sống.",
  ],
  characteristic: [
    "Hoa lớn, có nhiều màu sắc từ trắng, hồng, đỏ đến vàng.",
    "Lá to, hình tròn, nổi trên mặt nước.",
    "Thân rễ nằm dưới bùn.",
  ],
  function: [
    "Trang trí: Hoa sen thường được dùng để trang trí trong các ao hồ, đầm lầy, hoặc trồng trong chậu cảnh.",
    "Thực phẩm: Các bộ phận của cây sen như hạt sen, ngó sen, củ sen đều có thể ăn được.",
    "Y học: Sen được sử dụng trong y học cổ truyền để chữa nhiều bệnh.",
    "Tâm linh: Hoa sen có ý nghĩa quan trọng trong Phật giáo và Hindu giáo.",
  ],
  meaning: [
    "Biểu tượng của sự thuần khiết, thanh cao và giác ngộ trong Phật giáo.",
    "Tượng trưng cho sự tái sinh và vẻ đẹp trong văn hóa Ai Cập cổ đại.",
    "Ở Việt Nam, hoa sen là quốc hoa, tượng trưng cho sự thanh cao, bất khuất của con người Việt Nam.",
  ],
  image_url: [
    "https://cdn.pixabay.com/photo/2023/10/26/11/17/flower-8342448_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/08/12/23/27/lotus-7382649_1280.jpg",
  ],
  difficulty_level: "EASY" as const,
  soil_type: "LOAM" as const,
  category_id: "f1b45078-6b0c-4949-b8c8-466257157880",
  habitatLocation: "OUTDOOR" as const,
  minTemperature: 20,
  maxTemperature: 35,
  minMatureSize: 50,
  maxMatureSize: 200,
  humidityRange: "HIGH" as const,
  lightRequirement: "HIGH" as const,
};

const PlantDetailFromGemini = () => {
  const { uploadedFileUrl } = useGlobalStore();
  const [isLoading, setIsLoading] = useState(false);
  const [plantInfo, setPlantInfo] = useState(plantData);

  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const fetchPlantInfo = async () => {
      if (!uploadedFileUrl) return;

      try {
        setIsLoading(true);
        const result = await scanPlant(uploadedFileUrl);
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
  }, [uploadedFileUrl]);

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
