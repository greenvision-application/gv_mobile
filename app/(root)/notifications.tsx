import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Loading } from "@/components";
import NotificationTester from "@/components/NotificationTester";
import {
  getNotification,
  deleteNotifications,
} from "@/services/notificationService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { queryKeys, queryClient } from "@/libs/tanstackQuery";
import images from "@/constants/images";
import { router } from "expo-router";

interface NotificationData {
  content: string;
  id: string;
  send_time: string;
  created_at: string;
  status: string;
  schedule_id: string;
  Care_Schedule: {
    User_Plant: {
      id: string;
      Plant: {
        id: string;
        image_url: string[];
      };
    };
  };
}

const Notifications = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.notifications],
    queryFn: async () => {
      return await getNotification();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNotifications(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.notifications] });
    },
  });

  const handleDelete = (item: NotificationData) => {
    deleteMutation.mutate(item.id);
  };

  const handleNotificationPress = (item: NotificationData) => {
    if (item.schedule_id) {
      router.push(`/agenda/${item.Care_Schedule.User_Plant.id}`);
    }
  };

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return formatDistanceToNow(date, { addSuffix: true, locale: vi });
    } catch (error) {
      return "Không xác định";
    }
  };

  const renderItem = ({ item }: { item: NotificationData }) => {
    return (
      <TouchableOpacity onPress={() => handleNotificationPress(item)}>
        <View className="flex-row items-center p-3 border-b border-neutral-100 bg-neutral">
          <Image
            source={
              item.Care_Schedule?.User_Plant?.Plant?.image_url[0]
                ? {
                    uri: item.Care_Schedule?.User_Plant?.Plant?.image_url[0],
                  }
                : images.notFoundPlaceholder
            }
            className="w-20 h-20 rounded-full"
            defaultSource={images.notFoundPlaceholder}
          />
          <View className="flex-1 ml-3 mr-4">
            <Text className="font-normal text-lg">{item.content}</Text>
            <Text className="text-neutral-400 text-sm">
              {formatTime(item.created_at)}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleDelete(item)}>
            <AntDesign name="delete" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

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
      <View className="flex-1 bg-neutral">
        <Header title="Thông báo" />
        <View className="flex-1 justify-center items-center p-4">
          <AntDesign name="warning" size={48} color="#FF6B6B" />
          <Text className="mt-4 text-lg text-center">
            Không thể tải thông báo. Vui lòng thử lại sau.
          </Text>
          <TouchableOpacity
            className="mt-4 bg-primary px-6 py-3 rounded-full"
            onPress={() =>
              queryClient.invalidateQueries({
                queryKey: [queryKeys.notifications],
              })
            }
          >
            <Text className="text-neutral font-semibold">Tải lại</Text>
          </TouchableOpacity>
        </View>
      </View>
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
          className=" bg-neutral"
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <AntDesign name="inbox" size={64} color="#CCCCCC" />
          <Text className="mt-4 text-lg text-neutral-500 text-center">
            Bạn chưa có thông báo nào
          </Text>
        </View>
      )}
      {/* <NotificationTester /> */}
    </SafeAreaProvider>
  );
};

export default Notifications;
