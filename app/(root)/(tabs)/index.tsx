import {
  View,
  Text,
  Pressable,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Card, Icon } from "@rneui/themed";

import { logout } from "@/libs/appwrite";
import { useGlobalStore } from "@/store/global";

const Home = () => {
  // const { refetch } = useGlobalStore();
  // const handleLogout = async () => {
  //   const result = await logout();
  //   if (result) {
  //     Alert.alert("Success", "Logged out successfully");
  //     refetch();
  //   } else {
  //     Alert.alert("Error", "Failed to logout");
  //   }
  // };

  const plantData = [
    {
      id: "1",
      name: "Trầu Bà Lỗ",
      image:
        "https://hoadepviet.com/wp-content/uploads/2019/02/cay-an-qua-lam-cay-bong-mat-.gif",
      favorite: false,
    },
    {
      id: "2",
      name: "Đuôi Công Táo",
      image:
        "https://hoadepviet.com/wp-content/uploads/2019/02/cay-an-qua-lam-cay-bong-mat-.gif",
      favorite: true,
    },
    {
      id: "3",
      name: "Tùng Nho",
      image:
        "https://hoadepviet.com/wp-content/uploads/2019/02/cay-an-qua-lam-cay-bong-mat-.gif",
      favorite: false,
    },
    {
      id: "4",
      name: "Hạc Cam",
      image:
        "https://hoadepviet.com/wp-content/uploads/2019/02/cay-an-qua-lam-cay-bong-mat-.gif",
      favorite: false,
    },
    {
      id: "5",
      name: "Hạc Cam",
      image:
        "https://hoadepviet.com/wp-content/uploads/2019/02/cay-an-qua-lam-cay-bong-mat-.gif",
      favorite: false,
    },
    {
      id: "6",
      name: "Hạc Cam",
      image:
        "https://hoadepviet.com/wp-content/uploads/2019/02/cay-an-qua-lam-cay-bong-mat-.gif",
      favorite: false,
    },
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        {/* <Navigation /> */}
        <Header />
        <View className="px-3 flex-1 mb-10">
          <View className="flex flex-row  justify-between items-center py-2">
            <Text className="text-3xl font-bold text-black">Phổ biến</Text>
            <Text className="text-[rgb(60,193,142)]">Tất cả</Text>
          </View>
          <FlatList
            data={plantData}
            keyExtractor={(item) => item.id}
            numColumns={2} // Hiển thị mỗi dòng 2 Card
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingHorizontal: 0, paddingBottom: 30 }}
            showsVerticalScrollIndicator={false} // Ẩn thanh cuộn
            renderItem={({ item }) => (
              <View className="w-52 pr-3 mr-0 pb-2 ">
                <Card
                  containerStyle={{ padding: 5, paddingVertical:10, borderRadius: 12, margin: 0 }}
                >
                
                  <View className="relative">
                    <Image
                      source={{ uri: item.image }}
                      className="w-full h-40 rounded-lg"
                      resizeMode="cover"
                    />
                    {/* Icon yêu thích */}
                    <TouchableOpacity className="absolute top-2 right-2 bg-white p-1 rounded-full">
                      <Icon
                        name={item.favorite ? "heart" : "heart-outline"}
                        type="ionicon"
                        color={item.favorite ? "red" : "#ccc"}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>

                  {/* Tên cây */}
                  <Text className="text-center text-lg font-bold text-black mt-2">
                    {item.name}
                  </Text>

                  {/* Nút thêm vào vườn */}
                  <TouchableOpacity
                    onPress={() => {
                      console.log("Add to garden");
                    }}
                    className="bg-[#3CC18E] rounded-full mt-2 py-2 border border-[#3CC18E]"
                  >
                    <Text className="text-white text-center font-medium">
                      Thêm vào vườn
                    </Text>
                  </TouchableOpacity>
                </Card>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
