import { View, Text, TextInput, Pressable, Image } from "react-native";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ActionSheet from "react-native-actionsheet";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
import {
  callProvince,
  callDistrict,
  callWard,
  getDetailUser,
  updateUser,
  uploadImage,
} from "@/services/userService";
import { queryKeys } from "@/libs/tanstackQuery";
import { District, Province, Ward } from "@/libs/types";
import variables from "@/constants/variables";
import { FormInfoData } from "@/store/global";
import { router } from "expo-router";

// Kích hoạt plugin
dayjs.extend(utc);
dayjs.extend(timezone);

export default function UserInfoForm() {
  // State definitions
  const [selected, setSelected] = useState<DateType>();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [gender, setGender] = useState("");
  const genderActionSheet = useRef<ActionSheet>(null);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<any>(null); // Để lưu trữ file ảnh mới được chọn
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user data
  const { data: userData, refetch: refetchUserData } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: () => {
      return getDetailUser();
    },
  });

  // Update form when user data changes
  useEffect(() => {
    if (userData) {
      setUsername(userData.username || "");
      setEmail(userData.email || "");
      setGender(userData.preferences?.gender || "");

      if (userData.preferences?.dateBirth) {
        setSelected(dayjs(userData.preferences.dateBirth).toDate());
      }

      if (userData.preferences?.avatar) {
        setImage(userData.preferences.avatar);
      }

      if (userData.address?.province_code) {
        setSelectedProvince(userData.address.province_code);
      }

      if (userData.address?.district_code) {
        setSelectedDistrict(userData.address.district_code);
      }

      if (userData.address?.ward_code) {
        setSelectedWard(userData.address.ward_code);
      }
    }
  }, [userData]);

  // Mutation for uploading image
  const uploadImageMutation = useMutation({
    mutationFn: (fileData: FormData) => uploadImage(fileData),
    onSuccess: (response) => {
      // Assuming the response contains the uploaded image URL
      const imageUrl = response.url;
      if (imageUrl) {
        updateUserWithImage(imageUrl);
      } else {
        // If no image URL is returned, just update user info
        updateUserInfo(null);
      }
    },
    onError: (error) => {
      setIsSubmitting(false);
      alert("Lỗi khi tải lên ảnh đại diện");
    },
  });

  // Mutation for updating user profile
  const updateUserMutation = useMutation({
    mutationFn: (userInfo: FormInfoData) => updateUser(userInfo),
    onSuccess: () => {
      setIsSubmitting(false);
      Toast.show({
        type: "success",
        text1: "Thành công",
        text2: "Cập nhật thông tin thành công",
        position: "top",
        visibilityTime: 3000,
        topOffset: 50,
        text1Style: {
          fontSize: 16,
          fontWeight: "bold",
          color: "#3CC18E",
        },
        text2Style: {
          fontSize: 14,
          color: "black",
        },
      });
      refetchUserData(); // Refresh user data after update
      router.push("/garden");
    },
    onError: (error) => {
      setIsSubmitting(false);
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Lỗi khi cập nhật thông tin",
        position: "bottom",
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
    },
  });

  // Fetch provinces
  const { data: provinces, isLoading: isLoadingProvinces } = useQuery({
    queryKey: [queryKeys.provinces],
    queryFn: async () => {
      return await callProvince();
    },
  });

  // Fetch districts based on selected province
  const { data: districtData, isLoading: isLoadingDistricts } = useQuery({
    queryKey: [queryKeys.districts, selectedProvince?.code],
    queryFn: () =>
      selectedProvince?.code
        ? callDistrict(selectedProvince.code.toString())
        : Promise.reject("No province code"),
    enabled: !!selectedProvince?.code,
  });

  // Fetch wards based on selected district
  const { data: wardData, isLoading: isLoadingWards } = useQuery({
    queryKey: [queryKeys.wards, selectedDistrict?.code],
    queryFn: () =>
      selectedDistrict?.code
        ? callWard(selectedDistrict.code.toString())
        : Promise.reject("No district code"),
    enabled: !!selectedDistrict?.code,
  });

  // Extract data from query results
  const districts = districtData?.districts || [];
  const wards = wardData?.wards || [];

  // Reset district and ward when province changes
  useEffect(() => {
    if (selectedProvince) {
      setSelectedDistrict(null);
      setSelectedWard(null);
    }
  }, [selectedProvince]);

  // Reset ward when district changes
  useEffect(() => {
    if (selectedDistrict) {
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  // Request permission to access media library
  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Chúng tôi cần quyền truy cập vào thư viện ảnh của bạn!");
      return false;
    }
    return true;
  };

  // Pick image from library
  const pickImage = async () => {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        setImage(selectedAsset.uri); // Preview image
        setNewImageFile(selectedAsset); // Save file for upload
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi chọn ảnh");
    }
  };

  const resizeImage = async (uri: string) => {
    try {
      const result = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return result.uri;
    } catch (error) {
      return uri; // Return original URI if manipulation fails
    }
  };

  const getFileInfo = (uri: string) => {
    const fileName = uri.split("/").pop() || "";
    const fileType = fileName.split(".").pop() || "";
    return { fileName, fileType };
  };

  // Helper function to create form data for image upload
  const transferImageData = async () => {
    if (!newImageFile) return null;
    try {
      const resizedUri = await resizeImage(newImageFile.uri!);
      const { fileName, fileType } = getFileInfo(resizedUri);

      let formData = new FormData();
      formData.append("file", {
        uri: resizedUri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);

      return formData;
    } catch (error) {
      throw error;
    }
  };

  // Function to update user info with new image URL
  const updateUserWithImage = (avatarUrl: string) => {
    const userInfo: FormInfoData = {
      username,
      email,
      avatar: avatarUrl,
      gender,
      dayOfBirth: selected ? new Date(selected as any).toISOString() : null,
      address: {
        province: selectedProvince?.name!,
        district: selectedDistrict?.name!,
        ward: selectedWard?.name!,
        ward_code: selectedWard?.code!,
        district_code: selectedDistrict?.code!,
        province_code: selectedProvince?.code!,
      },
    };

    updateUserMutation.mutate(userInfo);
  };

  // Function to update user info without new image
  const updateUserInfo = (avatarUrl: string | null) => {
    const userInfo: FormInfoData = {
      username,
      email,
      avatar: avatarUrl || image || undefined, // Use existing image if no new one, or undefined
      gender,
      dayOfBirth: selected ? new Date(selected as any).toISOString() : null,
      address: {
        province: selectedProvince?.name!,
        district: selectedDistrict?.name!,
        ward: selectedWard?.name!,
        ward_code: selectedWard?.code!,
        district_code: selectedDistrict?.code!,
        province_code: selectedProvince?.code!,
      },
    };

    updateUserMutation.mutate(userInfo);
  };
  // Handle form submission
  const handleSubmit = async () => {
    if (!username || !email) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
      return;
    }

    setIsSubmitting(true);

    try {
      // If there's a new image, upload it first
      if (newImageFile) {
        const formData = await transferImageData();
        if (formData) {
          uploadImageMutation.mutate(formData);
        } else {
          // If formData creation failed, just update user info
          updateUserInfo(null);
        }
      } else {
        // No new image, just update user info
        updateUserInfo(null);
      }
    } catch (error) {
      setIsSubmitting(false);
      alert("Có lỗi xảy ra khi xử lý biểu mẫu");
    }
  };
  return (
    <View className="flex-1 w-full items-center bg-neutral">
      <View className="px-6 mt-5 w-full">
        <View className="flex flex-col gap-4">
          <View className="flex flex-col gap-4">
            {/* Avatar Section */}
            <View className="flex items-center">
              <Pressable onPress={pickImage} className="relative">
                {image ? (
                  <Image
                    source={{ uri: image }}
                    className="w-24 h-24 rounded-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-20 h-20 rounded-full bg-neutral-200 justify-center items-center">
                    <FontAwesome name="user" size={40} color="#A3A3A3" />
                  </View>
                )}
                <View className="absolute bottom-0 right-0 bg-primary w-8 h-8 rounded-full justify-center items-center">
                  <MaterialIcons name="photo-library" size={18} color="white" />
                </View>
              </Pressable>
              <Text className="mt-2 text-white font-inter">Ảnh đại diện</Text>
            </View>

            {/* Username Input */}
            <View className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300 justify-between">
              <View className="flex flex-row items-center h-14">
                <Ionicons name="id-card-sharp" size={25} color="#3CC18E" />
                <TextInput
                  placeholder="Nhập username của bạn"
                  className="w-5/6 ml-2 text-neutral-500 font-inter-medium text-base"
                  placeholderTextColor="#9CA3AF"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
              <View>
                <Text className="text-semantic-error">*</Text>
              </View>
            </View>

            {/* Email Input */}
            <View className="flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300 justify-between">
              <View className="flex flex-row items-center h-14">
                <MaterialIcons name="email" size={25} color="#3CC18E" />
                <TextInput
                  placeholder="Nhập email của bạn"
                  className="w-5/6 ml-2 text-neutral-500 font-inter-medium text-base"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>
              <View>
                <Text className="text-semantic-error">*</Text>
              </View>
            </View>

            {/* Province Dropdown */}
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
                    value={
                      userData.address?.province_code
                        ? selectedProvince
                        : selectedProvince?.code
                    }
                    onChange={(item) => {
                      setSelectedProvince(item);
                    }}
                    disable={isLoadingProvinces || isSubmitting}
                  />
                </View>
              </View>
            </View>

            {/* District Dropdown */}
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
                    value={
                      userData.address.district_code
                        ? selectedDistrict
                        : selectedDistrict?.code
                    }
                    onChange={(item) => {
                      setSelectedDistrict(item);
                    }}
                    disable={
                      !selectedProvince || isLoadingDistricts || isSubmitting
                    }
                  />
                </View>
              </View>
            </View>

            {/* Ward Dropdown */}
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
                    value={
                      userData.address.ward_code
                        ? selectedWard
                        : selectedWard?.code
                    }
                    onChange={(item) => {
                      setSelectedWard(item);
                    }}
                    disable={
                      !selectedDistrict || isLoadingWards || isSubmitting
                    }
                  />
                </View>
              </View>
            </View>

            {/* Gender and Date of Birth */}
            <View className="flex flex-row items-center justify-between gap-2">
              <Pressable
                className="flex-1 flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300"
                onPress={() => genderActionSheet.current?.show()}
                disabled={isSubmitting}
              >
                <Ionicons name="transgender-sharp" size={25} color="#3CC18E" />
                <Text className="px-2 flex-1 ml-2 font-inter-medium text-md text-neutral-500">
                  {gender || "Chọn giới tính"}
                </Text>
              </Pressable>

              <Pressable
                className="flex-1 flex flex-row items-center h-14 rounded-2xl px-4 border border-neutral-300"
                onPress={() => setOpenDatePicker(true)}
                disabled={isSubmitting}
              >
                <AntDesign name="calendar" size={24} color="#3CC18E" />
                <Text className="flex-1 ml-2 p-2 text-neutral-500 font-inter-medium text-md">
                  {selected
                    ? dayjs(selected).format("DD/MM/YYYY")
                    : "Chọn ngày sinh"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* DatePicker Modal */}
          {openDatePicker && (
            <DateTimePicker
              style={{ zIndex: 9999, position: "absolute" }}
              className="bg-primary-400 border border-primary rounded-2xl font-inter-semibold"
              mode="single"
              date={selected || dayjs().tz("Asia/Ho_Chi_Minh").toDate()}
              onChange={({ date }) => {
                if (date) {
                  setSelected(dayjs(date).tz("Asia/Ho_Chi_Minh").toDate());
                }
                setOpenDatePicker(false);
              }}
              maxDate={dayjs().tz("Asia/Ho_Chi_Minh").toDate()}
            />
          )}
        </View>

        {/* Gender ActionSheet */}
        <ActionSheet
          ref={genderActionSheet}
          title="Chọn giới tính"
          options={["Nam", "Nữ", "Khác", "Hủy"]}
          cancelButtonIndex={3}
          onPress={(index: number) => {
            if (index === 0) setGender(variables.ENUM_TRANSLATIONS.GENDER.MALE);
            if (index === 1)
              setGender(variables.ENUM_TRANSLATIONS.GENDER.FEMALE);
            if (index === 2)
              setGender(variables.ENUM_TRANSLATIONS.GENDER.OTHER);
          }}
        />

        {/* Submit Button */}
        <Pressable
          className={`${
            isSubmitting
              ? "bg-primary-200"
              : "bg-primary-400 active:bg-primary-800"
          } h-14 rounded-2xl mt-5 flex justify-center items-center`}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text className="text-neutral font-inter-bold text-lg">
            {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
