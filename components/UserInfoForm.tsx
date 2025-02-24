import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import DateTimePicker, {
  DateType,
  getDefaultStyles,
} from "react-native-ui-datepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ActionSheet from "react-native-actionsheet"; // Import ActionSheet

// Kích hoạt plugin
dayjs.extend(utc);
dayjs.extend(timezone);

export default function UserInfoForm() {
  const defaultStyles = getDefaultStyles();
  let today = new Date();
  const [selected, setSelected] = useState<DateType>(); // Lưu ngày sinh
  const [openDatePicker, setOpenDatePicker] = useState(false); // Trạng thái hiển thị DatePicker
  const [gender, setGender] = useState(""); // Lưu giới tính
  const genderActionSheet = useRef<ActionSheet>(null); // Ref để mở ActionSheet
  return (
    <View className="flex-1 w-full items-center justify-normal bg-neutral">
      <View className="px-6 w-full">
        <Text className="text-4xl font-inter-bold text-white text-center">
          Thông tin
        </Text>
        <Text className="mb-16 mt-4 text-center">
          Thông tin này giúp mọi người có thể kết nối với bạn dễ dàng hơn.
        </Text>
        <View className="flex flex-col gap-4">
          <View className="flex flex-col gap-4">
            {/* Ô nhập tên người dùng */}
            <View className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300 justify-between">
              <View className="flex flex-row items-center h-14">

                <Ionicons name="id-card-sharp" size={25} color="#3CC18E" />
                <TextInput
                  placeholder="Tên người dùng"
                  className=" w-5/6 ml-2 text-neutral-500 font-inter-medium text-md"
                  placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View>
                  <Text className="text-semantic-error">*</Text>
                </View>
            </View>

            {/* Ô nhập địa chỉ */}
            <View className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300 justify-between">
              <View className="flex flex-row items-center h-14">
                <Ionicons name="location-sharp" size={25} color="#3CC18E" />
                <TextInput
                  placeholder="Địa chỉ"
                  className="w-5/6 ml-2 text-neutral-500 font-inter-medium text-md "
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View>
                <Text className="text-semantic-error">*</Text>
              </View>
            </View>

            {/* Ô chọn Giới tính */}
            <Pressable
              className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300"
              onPress={() => genderActionSheet.current?.show()}
            >
              <Ionicons name="transgender-sharp" size={25} color="#3CC18E" />
              <Text className="px-2 flex-1 ml-2 text-[#9CA3AF] font-inter-medium text-md">
                {gender || "Chọn giới tính"}
              </Text>
            </Pressable>

            {/* Ô chọn Ngày sinh */}
            <Pressable
              className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300"
              onPress={() => setOpenDatePicker(true)}
            >
              <Ionicons name="calendar-sharp" size={25} color="#3CC18E" />
              <Text className="flex-1 ml-2 p-2 text-[#9CA3AF] font-inter-medium text-md">
                {selected
                  ? dayjs(selected).format("DD/MM/YYYY")
                  : "Chọn ngày sinh"}
              </Text>
            </Pressable>
          </View>

          {/* DatePicker Modal */}
          {openDatePicker && (            
            <DateTimePicker
              
              style={{ zIndex: 9999, position: "absolute" }}
              className="bg-[#3CC18E] border border-[#3CC18E] rounded-2xl"

              mode="single"
              date={selected || dayjs().tz("Asia/Ho_Chi_Minh").toDate()} // Ngày mặc định theo múi giờ Việt Nam
              onChange={({ date }) => {
                if (date) {
                  setSelected(dayjs(date).tz("Asia/Ho_Chi_Minh").toDate()); // Lưu ngày đã chọn theo múi giờ VN
                }
                setOpenDatePicker(false);
              }}
              maxDate={dayjs().tz("Asia/Ho_Chi_Minh").toDate()} // Chỉ cho chọn ngày trong quá khứ
            />            
          )}
        </View>
        {/* ActionSheet cho chọn giới tính */}
        <ActionSheet
          ref={genderActionSheet}
          title="Chọn giới tính"
          options={["Nam", "Nữ", "Khác", "Hủy"]}
          cancelButtonIndex={3} // Index của nút Hủy
          onPress={(index: number) => {
            if (index === 0) setGender("Nam");
            if (index === 1) setGender("Nữ");
            if (index === 2) setGender("Khác");
          }}
        />
        {/* Nút xác nhận */}
        <Pressable
          className="bg-[#3CC18E] active:bg-[#2F855A] h-14 rounded-2xl mt-5 flex justify-center items-center"
          onPress={() => console.log("Xác nhận")}
        >
          <Text className="text-white font-bold text-lg">Xác nhận</Text>
        </Pressable>
      </View>
    </View>
  );
}
