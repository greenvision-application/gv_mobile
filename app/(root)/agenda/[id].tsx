import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Header, Loading } from "@/components";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { generateSchedule } from "@/services/plantService";
import Toast from "react-native-toast-message";

const TimelineScreen = () => {
  const { id } = useLocalSearchParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["schedule", id],
    queryFn: () => generateSchedule(id),
    staleTime: 1 * 60 * 1000,
  });

  const formatTimelineData = (scheduleData: any) => {
    if (!scheduleData) return [];

    return scheduleData.map((item: any) => ({
      date: format(new Date(item.careSchedule.start_date), "dd MMM", {
        locale: vi,
      }),
      title: `${item.careSchedule.phase_name}`,
      description: item.careSchedule.desc,
      id: item.careSchedule.id,
    }));
  };

  const timelineData = data ? formatTimelineData(data) : [];

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return Toast.show({
      type: "error",
      text1: "Lỗi",
      text2: "Lỗi khi lấy dữ liệu lịch trình",
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
  }

  return (
    <View className={` flex-1 pb-20`}>
      {/* Header */}
      <Header title="Lịch trình" />
      {/* Timeline List */}
      {timelineData.length > 0 ? (
        <FlatList
          data={timelineData}
          keyExtractor={(item) => item.id}
          className="p-4"
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => console.log("đã đi đến trang mới ", item.title)}
              className="flex-row items-start"
            >
              {/* Ngày tháng */}
              <View className="w-16">
                <Text className="text-black font-bold text-lg">
                  {item.date}
                </Text>
              </View>

              {/* Đường dọc và chấm tròn */}
              <View className="items-center">
                <View className="w-6 h-6 border-2 border-[#3CC18E] rounded-full" />
                {index !== timelineData.length - 1 && (
                  <View className="w-1 bg-neutral-300 h-24" />
                )}
              </View>

              {/* Nội dung sự kiện */}
              <View className="min-h-24 flex-1 bg-primary p-4 rounded-lg ml-2 border border-neutral-300 my-2">
                <Text className="font-bold">{item.title}</Text>
                <Text className="text-sm">{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text>Không có dữ liệu lịch trình.</Text>
        </View>
      )}
    </View>
  );
};

export default TimelineScreen;
