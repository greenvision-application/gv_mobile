import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Header } from "@/components";

const TimelineScreen = () => {
  const timelineData = [
    {
      date: "20 Nov",
      title: "Cây lưỡi hổ - Nảy mầm",
      description: "Hạt nảy mầm, mọc ra rễ mầm và lá mầm.",
    },
    {
      date: "25 Nov",
      title: "Cây lưỡi hổ - Cây con",
      description:
        "Cây phát triển lá thật đầu tiên, thân mảnh nhưng cũng cứng cáp.",
    },
    {
      date: "20 Dec",
      title: "Cây lưỡi hổ - Ra nụ và hoa",
      description: "Cây bắt đầu hình thành chùm hoa đầu tiên.",
    },
    {
      date: "23 Jan",
      title: "Cây lưỡi hổ - Đậu quả",
      description: "Quả non xuất hiện và bắt đầu lớn.",
    },
    {
      date: "27 Feb",
      title: "Cây lưỡi hổ - Chín quả",
      description: "Quả chuyển từ màu xanh sang màu đỏ hoặc vàng, tùy giống.",
    },
    {
      date: "10 Mar",
      title: "Cây lưỡi hổ - Nảy mầm",
      description: "Hạt nảy mầm, mọc ra rễ mầm và lá mầm.",
    },
    {
      date: "20 Apr",
      title: "Cây lưỡi hổ - Nảy mầm",
      description: "Hạt nảy mầm, mọc ra rễ mầm và lá mầm.",
    },
    {
      date: "27 Feb",
      title: "Cây lưỡi hổ - Chín quả",
      description: "Quả chuyển từ màu xanh sang màu đỏ hoặc vàng, tùy giống.",
    },
    {
      date: "10 Mar",
      title: "Cây lưỡi hổ - Nảy mầm",
      description: "Hạt nảy mầm, mọc ra rễ mầm và lá mầm.",
    },
    {
      date: "20 Apr",
      title: "Cây lưỡi hổ - Nảy mầm",
      description: "Hạt nảy mầm, mọc ra rễ mầm và lá mầm.",
    },
    {
      date: "20 Apr",
      title: "cuối cùng",
      description: "Hạt nảy mầm, mọc ra rễ mầm và lá mầm.",
    },
  ];

  return (
    <View className={` flex-1 pb-20`}>
      {/* Header */}
      <Header title="Lịch trình" />
      {/* Timeline List */}
      <FlatList
        data={timelineData}
        keyExtractor={(item, index) => index.toString()}
        className="p-4"
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => console.log("đã đi đến trang mới ", item.title)}
            className="flex-row items-start"
          >
            {/* Ngày tháng */}
            <View className="w-16">
              <Text className="text-black font-bold text-lg">{item.date}</Text>
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
    </View>
  );
};

export default TimelineScreen;
