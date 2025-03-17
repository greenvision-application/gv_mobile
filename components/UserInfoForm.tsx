import { View, Text, TextInput, Pressable } from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useState, useRef, useEffect } from "react";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ActionSheet from "react-native-actionsheet";
import { Dropdown } from "react-native-element-dropdown";
import { callProvince, callDistrict, callWard } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/libs/tanstackQuery";
import { District, Province, Ward } from "@/libs/types";

// Kích hoạt plugin
dayjs.extend(utc);
dayjs.extend(timezone);

export default function UserInfoForm() {
  const [selected, setSelected] = useState<DateType>(); // Lưu ngày sinh
  const [openDatePicker, setOpenDatePicker] = useState(false); // Trạng thái hiển thị DatePicker
  const [gender, setGender] = useState(""); // Lưu giới tính
  const genderActionSheet = useRef<ActionSheet>(null); // Ref để mở ActionSheet

  // State cho địa chỉ
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);

  // Lấy danh sách tỉnh/thành phố
  const { data: provinces, isLoading: isLoadingProvinces } = useQuery({
    queryKey: [queryKeys.provinces],
    queryFn: async () => {
      return await callProvince();
    },
  });

  // Lấy danh sách quận/huyện dựa trên tỉnh đã chọn
  const {
    data: districtData,
    isLoading: isLoadingDistricts,
    refetch: refetchDistricts,
  } = useQuery({
    queryKey: [queryKeys.districts, selectedProvince?.code],
    queryFn: () =>
      selectedProvince?.code
        ? callDistrict(selectedProvince.code.toString())
        : Promise.reject("No province code"),
    enabled: !!selectedProvince?.code,
  });

  // Lấy danh sách phường/xã dựa trên quận/huyện đã chọn
  const {
    data: wardData,
    isLoading: isLoadingWards,
    refetch: refetchWards,
  } = useQuery({
    queryKey: [queryKeys.wards, selectedDistrict?.code],
    queryFn: () =>
      selectedDistrict?.code
        ? callWard(selectedDistrict.code.toString())
        : Promise.reject("No district code"),
    enabled: !!selectedDistrict?.code,
  });

  // Danh sách quận/huyện
  const districts = districtData?.districts || [];

  // Danh sách phường/xã
  const wards = wardData?.wards || [];

  // Reset quận/huyện và phường/xã khi thay đổi tỉnh
  useEffect(() => {
    if (selectedProvince) {
      setSelectedDistrict(null);
      setSelectedWard(null);
      refetchDistricts();
    }
  }, [selectedProvince]);

  // Reset phường/xã khi thay đổi quận/huyện
  useEffect(() => {
    if (selectedDistrict) {
      setSelectedWard(null);
      refetchWards();
    }
  }, [selectedDistrict]);

  // Format địa chỉ đầy đủ
  const getFullAddress = () => {
    const parts = [];
    if (selectedWard) parts.push(selectedWard.name);
    if (selectedDistrict) parts.push(selectedDistrict.name);
    if (selectedProvince) parts.push(selectedProvince.name);
    return parts.join(", ");
  };

  return (
    <View className="flex-1 w-full items-center justify-start pt-48 bg-neutral">
      <View className="px-6 w-full">
        <Text className="text-4xl font-inter-bold text-white text-center">
          Thông tin
        </Text>
        <Text className="mb-10 mt-4 text-base text-center font-inter">
          Thông tin này giúp bạn chăm sóc cây cá nhân hóa hơn!
        </Text>
        <View className="flex flex-col gap-4">
          <View className="flex flex-col gap-4">
            {/* Ô nhập tên người dùng */}
            <View className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300 justify-between">
              <View className="flex flex-row items-center h-14">
                <Ionicons name="id-card-sharp" size={25} color="#3CC18E" />
                <TextInput
                  placeholder="Nhập username của bạn"
                  className=" w-5/6 ml-2 text-neutral-500 font-inter-medium text-base"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View>
                <Text className="text-semantic-error">*</Text>
              </View>
            </View>

            {/* Dropdown chọn Tỉnh/Thành phố */}
            <View className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300 justify-between">
              <View className="flex flex-row items-center h-14 w-full">
                <FontAwesome name="map" size={25} color="#3CC18E" />
                <View className="flex-1 ml-2">
                  <Dropdown
                    style={{ width: "100%" }}
                    placeholderStyle={{
                      color: "#9CA3AF",
                    }}
                    selectedTextStyle={{}}
                    data={provinces || []}
                    labelField="name"
                    valueField="code"
                    search
                    searchPlaceholder="Tìm kiếm..."
                    placeholder="Chọn Tỉnh/Thành phố"
                    value={selectedProvince?.code}
                    onChange={(item) => {
                      setSelectedProvince(item);
                    }}
                    disable={isLoadingProvinces}
                  />
                </View>
              </View>
            </View>

            {/* Dropdown chọn Quận/Huyện */}
            <View className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300 justify-between">
              <View className="flex flex-row items-center h-14 w-full">
                <FontAwesome5 name="map-marked-alt" size={25} color="#3CC18E" />
                <View className="flex-1 ml-2">
                  <Dropdown
                    style={{ width: "100%" }}
                    placeholderStyle={{
                      color: "#9CA3AF",
                    }}
                    selectedTextStyle={{}}
                    data={districts}
                    labelField="name"
                    valueField="code"
                    placeholder={
                      selectedProvince
                        ? "Chọn Quận/Huyện"
                        : "Vui lòng chọn Tỉnh/Thành phố trước"
                    }
                    value={selectedDistrict?.code}
                    onChange={(item) => {
                      setSelectedDistrict(item);
                    }}
                    disable={!selectedProvince || isLoadingDistricts}
                  />
                </View>
              </View>
            </View>

            {/* Dropdown chọn Phường/Xã */}
            <View className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300 justify-between">
              <View className="flex flex-row items-center h-14 w-full">
                <Ionicons name="location-sharp" size={25} color="#3CC18E" />
                <View className="flex-1 ml-2">
                  <Dropdown
                    style={{ width: "100%" }}
                    placeholderStyle={{
                      color: "#9CA3AF",
                    }}
                    selectedTextStyle={{
                      fontFamily: "inter",
                    }}
                    data={wards}
                    labelField="name"
                    valueField="code"
                    placeholder={
                      selectedDistrict
                        ? "Chọn Phường/Xã"
                        : "Vui lòng chọn Quận/Huyện trước"
                    }
                    value={selectedWard?.code}
                    onChange={(item) => {
                      setSelectedWard(item);
                    }}
                    disable={!selectedDistrict || isLoadingWards}
                  />
                </View>
              </View>
            </View>

            {/* Ô chọn Giới tính */}
            <Pressable
              className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300"
              onPress={() => genderActionSheet.current?.show()}
            >
              <Ionicons name="transgender-sharp" size={25} color="#3CC18E" />
              <Text className="px-2 flex-1 ml-2 font-inter-medium text-md">
                {gender || "Chọn giới tính"}
              </Text>
            </Pressable>

            {/* Ô chọn Ngày sinh */}
            <Pressable
              className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300"
              onPress={() => setOpenDatePicker(true)}
            >
              <AntDesign name="calendar" size={24} color="#3CC18E" />
              <Text className="flex-1 ml-2 p-2 text-neutral-300 font-inter-medium text-md">
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
              className="bg-primary-400 border border-primary rounded-2xl font-inter-semibold"
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
          className="bg-primary-400 active:bg-primary-800 h-14 rounded-2xl mt-5 flex justify-center items-center"
          onPress={() => {
            console.log("Thông tin đã nhập:", {
              address: getFullAddress(),
              gender,
              birthdate: selected ? dayjs(selected).format("DD/MM/YYYY") : null,
            });
          }}
        >
          <Text className="text-white font-bold text-lg">Xác nhận</Text>
        </Pressable>
      </View>
    </View>
  );
}
