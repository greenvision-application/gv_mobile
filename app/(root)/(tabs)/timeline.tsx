import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@/components";

const plantData = [
  {
    id: "1",
    location: "Phòng khách",
    images:
      "https://housevn.vn/upload/data/images/noi-that/nha-o/nt-009/noi-that-dep-nha-pho-5-tang-009-01.jpg",
    plants: [
      {
        id: "p1",
        image:
          "https://cafefcdn.com/203337114487263232/2020/11/24/photo-1-16061900622181559629865.jpg",
        name: "Cây lưỡi hổ",
      },

      {
        id: "p2",
        image:
          "https://cafefcdn.com/203337114487263232/2020/11/24/photo-1-16061900622181559629865.jpg",
        name: "Cây lubby",
      },
      {
        id: "p3",
        image:
          "https://cdn.tgdd.vn/Files/2022/05/10/1431513/cay-co-canh-dac-diem-y-nghia-va-cach-trong-cay-lam-kieng-tai-nha-202205101334012353.jpg",
        name: "Cây lưỡi hổ",
      },
      {
        id: "p4",
        image:
          "https://www.thetealab.us/wp-content/uploads/2020/11/dat-dai.jpg",
        name: "Cây lưỡi hổ",
      },
    ],
    lastCare: "10 giờ trước",
  },
  {
    id: "2",
    location: "Ban công",
    images:
      "https://housevn.vn/upload/data/images/noi-that/nha-o/nt-009/noi-that-dep-nha-pho-5-tang-009-01.jpg",
    plants: [
      {
        id: "p5",
        image:
          "https://storage.googleapis.com/digital-platform/hinh_anh_top_15_loai_cay_phong_thuy_trong_nha_mang_tai_loc_may_man_so_1_2afda09fad/hinh_anh_top_15_loai_cay_phong_thuy_trong_nha_mang_tai_loc_may_man_so_1_2afda09fad.jpg",
        name: "Cây lưỡi hổ",
      },
    ],
    lastCare: "2 giờ trước",
  },
  {
    id: "3",
    location: "Ngoài trời",
    images:
      "https://housevn.vn/upload/data/images/noi-that/nha-o/nt-009/noi-that-dep-nha-pho-5-tang-009-01.jpg",
    plants: [
      {
        id: "p6",
        image:
          "https://storage.googleapis.com/digital-platform/hinh_anh_top_15_loai_cay_phong_thuy_trong_nha_mang_tai_loc_may_man_so_1_2afda09fad/hinh_anh_top_15_loai_cay_phong_thuy_trong_nha_mang_tai_loc_may_man_so_1_2afda09fad.jpg",
        name: "Cây lưỡi hổ",
      },
    ],
    lastCare: "2 giờ trước",
  },
];

export default function Timeline() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <>
      <Header title="Lịch trình"/>
      {/* Menu cây được chăm sóc */}
      <View className="flex-1 bg-white mb-20">
        {/* Danh sách vị trí cây */}
        <FlatList
          data={plantData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="border-b border-neutral-300 p-4">
              {/* Tiêu đề vị trí */}
              <TouchableOpacity
                onPress={() =>
                  setExpanded(expanded === item.id ? null : item.id)
                }
                className="flex-row items-center justify-between"
              >
                <View className="flex-row items-center">
                  <View className="">
                    <Image
                      source={{ uri: item.images }}
                      className="w-24 h-24 border border-neutral-300 rounded-xl "
                    />
                  </View>
                  <View className="flex h-fit gap-3 flex-col ml-5 justify-between">
                    <Text className="text-xl font-bold">{item.location}</Text>
                    <Text className="text-gray-500">
                      {item.plants.length} cây trồng
                    </Text>
                    <Text className="text-gray-500">
                      Lần chăm sóc cuối • {item.lastCare}
                    </Text>
                  </View>
                </View>

                {expanded === item.id ? (
                  <Ionicons name="chevron-up" size={28} color="#3CC18E" />
                ) : (
                  <Ionicons name="chevron-down" size={28} color="#3CC18E" />
                )}
              </TouchableOpacity>

              {/* Hiển thị danh sách cây khi mở rộng */}
              {expanded === item.id && (
                <FlatList
                  data={item.plants}
                  numColumns={2}
                  keyExtractor={(plant) => plant.id}
                  renderItem={({ item }) => (
                    <View className="flex flex-row w-1/2 gap-2 border-neutral-300 pr-2 pt-4">
                      <View className="w-full border border-neutral-300 rounded-xl overflow-hidden">
                        <Image
                          source={{ uri: item.image }}
                          className="w-full h-44 "
                          resizeMode="cover"
                        />
                        <Text className="text-xl font-bold p-4 text-center">
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
          )}
        />
      </View>
    </>
  );
}
