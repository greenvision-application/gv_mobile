import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import DatePicker from "react-native-date-picker";

export default function UserInfoForm() {
  const [showDatePicker, setshowDatePicker] = useState(false)
  const [selectedDate, setselectedDate] = useState(new Date())
  return (
    <View className="flex-1 w-full items-center justify-normal bg-neutral">
      <View className="px-6 w-full">
        <Text className="text-4xl font-inter-bold text-white text-center">
          Đăng nhập
        </Text>
        <Text className="mb-16 mt-4 text-center">
          Thông tin này giúp mọi người có thể kết nối với bạn dễ dàng hơn.
        </Text>
        <View className="flex flex-col gap-4">
          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="id-card-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Tên người dùng"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="location-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Địa chỉ"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300">
            <Ionicons name="transgender-sharp" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Giới tính"
              className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {/* Ô chọn Ngày sinh */}
          {/* <Pressable
            className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300"
            onPress={() => setOpen(true)}
          >
            <Ionicons name="calendar-sharp" size={25} color="#3CC18E" />
            <Text className="flex-1 ml-2 text-neutral-500 font-inter-medium text-md">
              { "Chọn ngày sinh"}
            </Text>
          </Pressable> */}

          {/* DatePicker Modal */}
          <DatePicker
            modal={true}
            open={showDatePicker}
            date={selectedDate}
            onConfirm={(date) => { 
            }}
            onCancel={() => {
            }}
      />
          
        </View>
        <Pressable
          onPress={() => console.log("Xác nhận")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#2F855A" : "#3CC18E", // Màu nhấn đổi thành tối hơn
              padding: 12,
              borderRadius: 10,
              alignItems: "center",
              marginTop: 20,
            },
          ]}
        >
          <Text className="text-white font-bold text-lg">Xác nhận</Text>
        </Pressable>
      </View>
    </View>
  );
}
