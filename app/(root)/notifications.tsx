import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Loading } from "@/components";
import NotificationTester from "@/components/NotificationTester";
import { getNotification } from "@/services/notificationService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { queryKeys } from "@/libs/tanstackQuery";
import images from "@/constants/images";

// Định nghĩa interface cho dữ liệu thông báo từ API
interface NotificationData {
  content: string;
  id: string;
  send_time: string;
  created_at: string;
  status: string;
  schedule_id: string;
  Care_Schedule: {
    User_Plant: {
      Plant: {
        image_url: string[];
      };
    };
  };
}

const Notifications = () => {
  const [selectedItem, setSelectedItem] = useState<NotificationData | null>(
    null
  );
  const [showMenu, setShowMenu] = useState(false);
  const queryClient = useQueryClient();

  // Sử dụng React Query để lấy dữ liệu thông báo
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.notifications],
    queryFn: async () => {
      return await getNotification();
    },
  });

  // Mutation để xóa thông báo
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      // Thay thế với API call xóa thông báo thực tế
      return Promise.resolve(id);
    },
    onSuccess: () => {
      // Làm mới danh sách thông báo sau khi xóa
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      closeMenu();
    },
  });

  const handleDelete = (item: NotificationData) => {
    deleteMutation.mutate(item.id);
  };

  const handleMenuPress = (item: NotificationData) => {
    setSelectedItem(item);
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  // Hàm định dạng thời gian
  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
      return "Không xác định";
    }
  };

  const renderItem = ({ item }: { item: NotificationData }) => (
    <View className="flex-row items-center p-3 border-b border-neutral-100">
      <Image
        source={{
          uri: item.Care_Schedule?.User_Plant?.Plant?.image_url[0],
        }}
        className="w-20 h-20 rounded-full"
        defaultSource={images.notFoundPlaceholder}
      />
      <View className="flex-1 ml-3 mr-4">
        <Text className="font-normal text-lg">{item.content}</Text>
        <Text className="text-neutral-400 text-sm">
          {formatTime(item.created_at)}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleMenuPress(item)}>
        <AntDesign name="ellipsis1" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaProvider className="flex-1 bg-neutral">
        <Header title="Thông báo" />
        <Loading />
      </SafeAreaProvider>
    );
  }

  if (isError) {
    return (
      <SafeAreaProvider className="flex-1 bg-neutral">
        <Header title="Thông báo" />
        <View className="flex-1 justify-center items-center p-4">
          <AntDesign name="warning" size={48} color="#FF6B6B" />
          <Text className="mt-4 text-lg text-center">
            Không thể tải thông báo. Vui lòng thử lại sau.
          </Text>
          <TouchableOpacity
            className="mt-4 bg-green-500 px-6 py-3 rounded-full"
            onPress={() =>
              queryClient.invalidateQueries({ queryKey: ["notifications"] })
            }
          >
            <Text className="text-white font-semibold">Tải lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider className="flex-1 bg-neutral">
      <Header title="Thông báo" />
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          className="mt-2"
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <AntDesign name="inbox" size={64} color="#CCCCCC" />
          <Text className="mt-4 text-lg text-neutral-500 text-center">
            Bạn chưa có thông báo nào
          </Text>
        </View>
      )}
      <NotificationTester />

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
          <View className="absolute bottom-0 w-full border border-neutral-300 rounded-t-lg bg-neutral">
            <TouchableOpacity
              className="p-4 border-b border-neutral-300"
              onPress={() => selectedItem && handleDelete(selectedItem)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <View className="flex-row justify-center items-center">
                  <ActivityIndicator size="small" color="#FF6B6B" />
                  <Text className="text-semantic-error text-center text-lg ml-2">
                    Đang xóa...
                  </Text>
                </View>
              ) : (
                <Text className="text-semantic-error text-center text-lg">
                  Xóa thông báo này
                </Text>
              )}
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
