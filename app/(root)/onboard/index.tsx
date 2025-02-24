import { View, Pressable, SafeAreaView, Text } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import images from "@/constants/images";
import OnboardingContent from "@/components/onboard";

const onboardData = [
  {
    image: images.onboard1,
    title: "Kết nối cộng đồng",
    description:
      "Giao lưu, chia sẻ và cùng nhau tạo nên một cộng đồng yêu thiên nhiên gắn kết vững mạnh",
  },
  {
    image: images.onboard2,
    title: "Quản lý cây trồng",
    description:
      "Tạo lập cách chăm sóc, quản lý cây trồng hiệu quả, cùng mọi người phát triển vườn cây của mình",
  },
  {
    image: images.onboard3,
    title: "Cập nhật kiến thức",
    description:
      "Học hỏi những kiến thức bổ ích về cây trồng, giáo trình và kiến thức đời sống",
  },
];

const Onboard = () => {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    if (page === onboardData.length - 1) {
      router.push("/");
    } else {
      setPage(page + 1);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  return (
    <SafeAreaView className="h-full bg-neutral">
      <View className="absolute top-20 right-6 z-10">
        <Pressable onPress={handleSkip}>
          <Text className="text-primary font-inter-semibold text-lg">
            Bỏ qua
          </Text>
        </Pressable>
      </View>

      <OnboardingContent
        image={onboardData[page].image}
        title={onboardData[page].title}
        description={onboardData[page].description}
        page={page}
        totalPages={onboardData.length}
      />

      <View className="absolute bottom-28 left-0 right-0 px-6">
        <Pressable
          onPress={handleNext}
          className="bg-primary py-4 rounded-full shadow-md active:opacity-90"
        >
          <Text className="text-neutral font-inter-semibold text-xl text-center">
            Tiếp tục
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Onboard;
