import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "@/components";
import AntDesign from "@expo/vector-icons/AntDesign";
import NotificationTester from "@/components/NotificationTester";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  image: string;
}

const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "Anthurium",
    message: "đang cần được tưới",
    time: "13 phút",
    image:
      "https://file.hstatic.net/200000630767/file/anthurium-crystalhope_b91c9e032c4940a9b4f9ba67da19bec2_1024x1024.jpg",
  },
  {
    id: "2",
    title: "Hương Thảo",
    message: "còn 3 nhiệm vụ chưa được hoàn thành",
    time: "15 phút",
    image:
      "https://saigonhoa.com/wp-content/uploads/2015/04/chau-cay-huong-thao-1.jpg",
  },
  {
    id: "3",
    title: "Lưỡi hổ",
    message: "còn 2 nhiệm vụ chưa được hoàn thành",
    time: "15 phút",
    image:
      "https://annhiengarden.vn/annhien-media/crop/570_633/an-nhien-2024/cay-trong-dat/1000603/6-5.webp",
  },
  {
    id: "4",
    title: "Xương rồng",
    message: "đang phát triển tốt.",
    time: "1 giờ",
    image: "https://static.vinwonders.com/production/trong-xuong-rong-5.jpg",
  },
  {
    id: "5",
    title: "Cây lan",
    message: "đang nếu nắng. Hãy phơi nắng nhé!",
    time: "1 giờ",
    image:
      "https://product.hstatic.net/1000336151/product/20201204_084505_8d859b4216a34883bd56e45fba6eb4f1_master.jpg",
  },
];

const Notifications = () => {
  const [selectedItem, setSelectedItem] = useState<NotificationItem | null>(
    null
  );
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = (item: NotificationItem) => {
    // Xử lý logic xóa ở đây
    setShowMenu(false);
  };

  const handleMenuPress = (item: NotificationItem) => {
    setSelectedItem(item);
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <View className="flex-row items-center p-3">
      <Image source={{ uri: item.image }} className="w-20 h-20 rounded-full" />
      <View className="flex-1 ml-3 mr-4">
        <Text className="font-semibold text-lg">
          {item.title}{" "}
          <Text className="font-normal text-lg">{item.message}</Text>
        </Text>
        <Text className="text-neutral-400 text-sm">{item.time}</Text>
      </View>
      <TouchableOpacity onPress={() => handleMenuPress(item)}>
        <AntDesign name="ellipsis1" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <Header title="Thông báo" />
      <NotificationTester />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        className="mt-2"
      />
      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={closeMenu}
        >
          <View className="absolute bottom-0 w-full border border-neutral-300 rounded-lg bg-white">
            <TouchableOpacity
              className="p-4 border-b border-neutral-300"
              onPress={() => selectedItem && handleDelete(selectedItem)}
            >
              <Text className="text-semantic-error text-center text-lg">
                Xóa thông báo này
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="p-4" onPress={closeMenu}>
              <Text className="text-center text-lg">Hủy</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaProvider>
  );
};

export default Notifications;
