import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "@/components";
import Entypo from '@expo/vector-icons/Entypo';

const user = {
  name: "Rina ksor",
  role: "(Thợ vườn tập sự)",
  status: "But I can see us lost in the memory\nAugust slipped away into a moment in time.",
  avatar: "https://f.hoatieu.vn/data/image/2022/08/25/avatar-cute-meo-con-than-chet.jpg",
  coverImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1000&auto=format&fit=crop",
  stats: {
    totalPlants: 8,
    favorites: 3,
    unplanted: 56,
  },
};

const plantData = {
  all: [
    { id: 1, name: 'Cây xương rồng', image: 'https://coconhouse.com/wp-content/uploads/2019/11/bef31bec91c2769c2fd3.jpg'},
    { id: 2, name: 'Cây lô hội', image: 'https://vandienfmp.vn/wp-content/uploads/2021/01/%E1%BA%A2nh-c%C3%A2y-l%C3%B4-h%E1%BB%99i.jpg' },
    { id: 3, name: 'Cây trầu bà', image: 'https://caytrauba.com/wp-content/uploads/2023/01/monstera-deliciosa-800x800-1.jpg'},
  ],
  favorites: [
    { id: 2, name: 'Cây lô hội', image: 'https://vandienfmp.vn/wp-content/uploads/2021/01/%E1%BA%A2nh-c%C3%A2y-l%C3%B4-h%E1%BB%99i.jpg' },
    { id: 3, name: 'Cây trầu bà', image: 'https://caytrauba.com/wp-content/uploads/2023/01/monstera-deliciosa-800x800-1.jpg'},
  ],
  unplanted: [
    { id: 4, name: 'Cây cúc', image: 'https://khuvuonmini.com/asset/editor/ResponsiveFilemanager-master/source/PHUONG-%20CAY%20GIONG/c%C3%BAc%20b%C3%A1ch%20nh%E1%BA%ADt/cuc-anh-belis%20%205.jpg'},
    { id: 5, name: 'Cây hoa hồng', image: 'https://lh3.googleusercontent.com/f8WE9R7_1d3qejfWNU7aBe6XPZCSNwmRYWW69Z4oJPK1Qf7yrvslFfVQhdLOgjf8Qdi149Awc-6HHcgvkFgvqp2nEEEIaxergSssTJOl_H9AgaPWi5db8Wp48uV7iCDB7RqjkhRRBeZyMRddTps1iOM'},
    { id: 6, name: 'Cây lan', image: 'https://product.hstatic.net/1000336151/product/20201204_084505_8d859b4216a34883bd56e45fba6eb4f1_master.jpg'},
  ]
};

const Garden = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const renderPlants = () => {
    const plants = plantData[activeTab as keyof typeof plantData];
    return (
      <View className="mt-4 px-4">
        <View className="flex-row flex-wrap gap-4">
          {plants.map((plant) => (
            <View key={plant.id} className="w-[48%] bg-neutral rounded-2xl shadow-lg overflow-hidden border border-neutral-200">
              <Image 
                source={{ uri: plant.image }} 
                className="w-full h-56"
                resizeMode="cover"
              />
              <View className="p-2 items-center">
                <Text className="text-lg font-semibold text-black">{plant.name}</Text>
              </View>
            </View>
          ))}
        </View>
        </View>
    );
  };
  return (
    <SafeAreaProvider className="flex-1 bg-neutral p-4">
      <Header title="Vườn cây" />
    <ScrollView className="mb-20 bg-neutral">
      {/* Thông tin người dùng */}
      <View className="info-container">
        <Image source={{ uri: user.coverImage }} className="w-full h-48" />
        <View className="items-start mt-[-60] ml-5">
          <Image source={{ uri: user.avatar }} className="w-36 h-36 rounded-full border-4 border-neutral" />
          <View className="mt-2">
            <Text className="text-2xl font-bold text-left">{user.name}</Text>
            <Text className="text-xl text-gray-500 text-left">{user.role}</Text>
            <Text className="text-base text-gray-400 mt-1 text-left">{user.status}</Text>
          </View>
        </View>
      </View>      
      
      {/* Thống kê */}
      <View className="flex-row justify-around my-4">
        <TouchableOpacity onPress={() => setActiveTab('all')} className="items-center">
        <Entypo name="tree" size={24} color={activeTab === 'all' ? '#0B5B5C' : '#3CC18E'} />
          <Text className="text-center">{user.stats.totalPlants}</Text>
          <Text className="text-center">Cây trồng</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('favorites')} className="items-center">
        <Entypo name="heart-outlined" size={24} color={activeTab === 'favorites' ? '#0B5B5C' : '#3CC18E'} />
          <Text className="text-center">{user.stats.favorites}</Text>
          <Text className="text-center">Yêu thích</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('unplanted')} className="items-center">
        <Entypo name="leaf" size={24} color={activeTab === 'unplanted' ? '#0B5B5C' : '#3CC18E'} />
          <Text className="text-center ">{user.stats.unplanted}</Text>
          <Text className="text-center">Cây chưa trồng</Text>
        </TouchableOpacity>
      </View>      {/* Hiển thị danh sách cây theo tab */}
      {renderPlants()}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Garden;
