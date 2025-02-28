import {
  View,
  Text,
  Pressable,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Card, Icon } from "@rneui/themed";
import { useState } from "react";

import { logout } from "@/libs/appwrite";
import { useGlobalStore } from "@/store/global";

const Home = () => {
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const popularPlants = [
    {
      id: "1",
      name: "Trầu Bà Lỗ",
      image:
        "https://vuacayxanh.net/wp-content/uploads/2024/05/trau-ba-lo-1.jpg",
      favorite: false,
    },
    {
      id: "2",
      name: "Đuôi Công Táo",
      image:
        "https://duonglangarden.com/wp-content/uploads/2022/03/cogn-dung-cay-duoi-cong-tao.jpg",
      favorite: true,
    },
    {
      id: "3",
      name: "Tùng Nho",
      image:
        "https://phuongrosa.com/file/sanpham/cayvanphong/1587997738-cay-tung.jpg",
      favorite: false,
    },
    {
      id: "4",
      name: "Hạc Cam",
      image:
        "https://mowgarden.com/wp-content/uploads/2022/09/cay-hong-hac-mini-Philodendron-Billietiae-chau-uom-2-1.jpg",
      favorite: false,
    },
    {
      id: "5",
      name: "Xương Rồng",
      image:
        "https://static.vinwonders.com/production/trong-xuong-rong.jpg",
      favorite: false,
    },
  ];

  const similarPlants = [
    {
      id: "5",
      name: "Sen Đá",
      image:
        "https://sendakimcuong.net/wp-content/uploads/2022/04/sen-da-co-an-duoc-khong.jpg",
      favorite: false,
    },
    {
      id: "6",
      name: "Xương Rồng",
      image:
        "https://static.vinwonders.com/production/trong-xuong-rong.jpg",
      favorite: false,
    },
    {
      id: "7",
      name: "Sen Đá",
      image:
        "https://static.vinwonders.com/production/trong-xuong-rong.jpg",
      favorite: false,
    },
    {
      id: "8",
      name: "Sen Đá Hồng",
      image:
        "https://vuoncuasen.com/wp-content/uploads/2024/03/sen-da-soi-hong.jpeg",
      favorite: false,
    },
    {
      id: "9",
      name: "Xương Rồng",
      image:
        "https://vuoncuasen.com/wp-content/uploads/2024/03/sen-da-soi-hong.jpeg",
      favorite: false,
    },
    {
      id: "10",
      name: "Xương Rồng",
      image:
        "https://hoadepviet.com/wp-content/uploads/2019/02/cay-an-qua-lam-cay-bong-mat-.gif",
      favorite: false,
    },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const renderPlantCard = (item: {
    id: string;
    name: string;
    image: string;
    favorite: boolean;
  }) => (
    <View className="w-1/2 px-2 mr-0 pb-4">
      <Card containerStyle={{ padding: 0, paddingVertical:0, borderRadius: 12, margin: 0 }}>
        <View className="relative">
          <Image
            source={{ uri: item.image }}
            className="w-full h-44 rounded-lg"
            resizeMode="cover"
          />
          <TouchableOpacity 
            className="absolute top-2 right-2 bg-white p-1 rounded-full"
            onPress={() => toggleFavorite(item.id)}
          >
            <Icon
              name={favorites.includes(item.id) ? "heart" : "heart-sharp"}
              type="ionicon"
              color={favorites.includes(item.id) ? "red" : "#ccc"}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <Text className="text-center text-lg font-bold text-black mt-2">
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            console.log("Add to garden");
          }}
          className="bg-[#3CC18E] rounded-full mt-2 py-2 border border-[#3CC18E] mx-4 my-3"
        >
          <Text className="text-neutral-100 text-center font-medium">
            Thêm vào vườn
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <Header />
        <ScrollView className="px-3 flex-1 mb-14">
          {/* Phổ biến */}
          <View className="flex flex-row justify-between items-center py-2">
            <Text className="text-2xl font-bold text-black">Phổ biến</Text>
            <TouchableOpacity onPress={() => setShowAllPopular(!showAllPopular)}>
              <Text className="text-[rgb(60,193,142)]">
                {showAllPopular ? "Thu gọn" : "Tất cả"}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap">
            {popularPlants.slice(0, showAllPopular ? popularPlants.length : 4).map((item) => renderPlantCard(item))}
          </View>

          {/* Cây tương tự */}
          <View className="flex flex-row justify-between items-center py-2 mt-4">
            <Text className="text-2xl font-bold text-black">Tương tự cây của bạn</Text>
            <TouchableOpacity onPress={() => setShowAllSimilar(!showAllSimilar)}>
              <Text className="text-[rgb(60,193,142)]">
                {showAllSimilar ? "Thu gọn" : "Tất cả"}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap">
            {similarPlants.slice(0, showAllSimilar ? similarPlants.length : 4).map((item) => renderPlantCard(item))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;