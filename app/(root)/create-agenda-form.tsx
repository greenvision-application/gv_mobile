import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useState, useRef } from "react";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import {
  Ionicons,
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  EvilIcons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import CustomSlider from "@/components/CustomSlider";
import { Header } from "@/components";
import variables from "@/constants/variables";

const dropdownData = {
  developStage: [
    { label: "Mới gieo trồng", value: "Mới gieo trồng" },
    { label: "Mới nảy mầm", value: "Mới nảy mầm" },
    { label: "Phát triển thành cây non", value: "Phát triển thành cây non" },
    { label: "Cây trưởng thành", value: "Cây trưởng thành" },
  ],
  placePlant: [
    {
      label: "Ban công",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.BALCONY,
    },
    {
      label: "Phòng tắm",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.BATHROOM,
    },
    {
      label: "Trong vườn",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.GARDEN,
    },
    {
      label: "Nhà kính",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.GREENHOUSE,
    },
    {
      label: "Thủy canh",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.HYDROPONICS,
    },
    {
      label: "Trong nhà",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.INDOOR,
    },
    {
      label: "Nhà bếp",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.KITCHEN,
    },
    {
      label: "Văn phòng",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.OFFICE,
    },
    {
      label: "Ngoài trời",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.OUTDOOR,
    },
    {
      label: "Sân thượng",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.TERRACE,
    },
    {
      label: "Vường treo",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.WALL_PLANTER,
    },
    {
      label: "Bệ của sổ",
      value: variables.ENUM_TRANSLATIONS.PLANT_SITE.WINDOW_SILL,
    },
  ],
  soilType: [
    { label: "Đất đá vôi", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.CHALK },
    { label: "Đất set", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.CLAY },
    { label: "Đất mùn", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.LOAM },
    {
      label: "Đất than bùn",
      value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.PEAT,
    },
    { label: "Đất cát", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.SANDY },
    { label: "Đất phù sa", value: variables.ENUM_TRANSLATIONS.SOIL_TYPE.SILT },
  ],
  typeOfPlant: [
    { label: "Cây cảnh", value: "Cây cảnh" },
    { label: "Cây ăn qả", value: "Cây ăn qả" },
    { label: "Cây thân gỗ", value: "Cây thân gỗ" },
    { label: "Cây thủy sinh", value: "Cây thủy sinh" },
  ],
  careTimeOptions: [
    { label: "Dưới 5 phút", value: "under_5" },
    { label: "5 - 10 phút", value: "5_10" },
    { label: "10 - 20 phút", value: "10_20" },
    { label: "Trên 20 phút", value: "above_20" },
  ],
  careTasksOptions: [
    { label: "Tưới nước", value: "watering" },
    { label: "Bón phân", value: "fertilizing" },
    { label: "Tỉa lá", value: "pruning" },
    { label: "Kiểm tra sâu bệnh", value: "pest_check" },
    { label: "Vệ sinh chậu và đất", value: "cleaning" },
  ],
  convenientTimesOptions: [
    { label: "Sáng sớm (6h - 8h)", value: "morning" },
    { label: "Buổi trưa (12h - 14h)", value: "noon" },
    { label: "Buổi chiều (16h - 18h)", value: "afternoon" },
    { label: "Buổi tối (20h - 22h)", value: "evening" },
  ],
};

const CreateAgendaForm = () => {
  const [developStage, setDevelopStage] = useState("");
  const [placePlant, setPlacePlant] = useState("");
  const [soilType, setSoilType] = useState("");
  const [plantType, setPlantType] = useState("");
  const [healthDescription, setHealthDescription] = useState("");
  const [selectedConvenientTimes, setSelectedConvenientTimes] = useState<
    string[]
  >([]);
  const [selectedCareTime, setSelectedCareTime] = useState("");
  const [selectedCareTasks, setSelectedCareTasks] = useState<string[]>([]);

  const plantData = {
    image:
      "https://hulatrees.com/wp-content/uploads/2022/03/cay-luoi-ho-la-ngan-vien-vang-04.jpg",
    name: "Cây Lưỡi Hổ",
    type: "Cây cảnh",
    careLocation: "trong nhà",
    attributes: [
      { title: "Loại cây", value: "Cây cảnh trong nhà" },
      { title: "Giai đoạn phát triển", value: "Trưởng thành" },
      { title: "Địa điểm trồng", value: "Trong chậu" },
      { title: "Loại đất", value: "Đất tơi xốp" },
    ],
    healthStatus: {
      status: "Phát triển bình thường",
      lastCheck: "23/10/2023",
    },
    careActivities: [
      { title: "Tưới nước", frequency: "3 lần/tuần", icon: "tint" },
      { title: "Tắm nắng", frequency: "4-5 lần/tuần", icon: "wb-sunny" },
      { title: "Xới đất", frequency: "1 lần/tháng", icon: "spa" },
    ],
    actions: ["Bắt sâu", "Thay chậu", "Xịt ẩm", "Tỉa lá", "Khác"],
  };
  // tạo notes

  const [notes, setNotes] = useState([""]); // Bắt đầu với 1 ghi chú mặc định

  const addNote = () => {
    if (notes.length < 3) {
      setNotes([...notes, ""]); // Thêm ghi chú mới
    }
  };

  const removeNote = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const handleSave = () => {
    console.log("Lưu thông tin chăm sóc");
  };

  return (
    <>
      {/* Header */}
      <Header title="Chăm sóc" />

      <ScrollView className="bg-neutral px-2">
        {/* Thông tin cây */}
        <View className="bg-neutral px-2 pt-4 flex flex-row items-center gap-x-5">
          <Image
            source={{ uri: plantData.image }}
            className="w-40 h-40 rounded-2xl"
          />
          <View className="">
            <Text className="text-2xl font-inter-bold mb-4">
              {plantData.name}
            </Text>
            <Text className="text-neutral-400 text-xl mb-4">
              {plantData.type}
            </Text>
            <Text className="text-primary">
              Chăm sóc{" "}
              <Text className="font-inter-bold">{plantData.careLocation}</Text>
            </Text>
          </View>
        </View>

        {/*Thống kê  */}
        <View className="flex flex-row items-center justify-between px-4 py-4">
          <View className="flex flex-col items-center justify-center">
            <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
              <Ionicons name="stats-chart-outline" size={24} color="black" />
            </View>
            <Text className="mt-2 font-inter-light text-base">Trung bình</Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
              <Ionicons name="location-outline" size={24} color="black" />
            </View>
            <Text className="mt-2 font-inter-light text-base">Phòng khách</Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
              <FontAwesome name="thermometer-half" size={24} color="black" />
            </View>
            <Text className="mt-2 font-inter-light text-base">13 - 35 C</Text>
          </View>
          <View className="flex flex-col items-center justify-center">
            <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
              <FontAwesome6 name="ruler" size={24} color="black" />
            </View>
            <Text className="mt-2 font-inter-light text-base">50 - 60cm</Text>
          </View>
        </View>
        {/* Slider */}
        <View className="flex flex-row items-center justify-between px-4 ">
          <View className="w-1/12">
            <Ionicons name="sunny" size={30} color="#3CC18E" />
          </View>
          <View className="w-10/12">
            <CustomSlider
              label="Volume Control"
              min={0}
              max={60}
              initialValue={80}
              disabled={false}
            />
          </View>
          <View className="w-1/12">
            <Text>Cao</Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between px-4">
          <View className="w-1/12">
            <Ionicons name="water" size={30} color="#3CC18E" />
          </View>
          <View className="w-10/12">
            <CustomSlider
              label="Volume Control"
              min={0}
              max={100}
              initialValue={50}
              disabled={false}
            />
          </View>
          <View className="w-1/12">
            <Text>Vừa</Text>
          </View>
        </View>

        {/* Thuộc tính cây */}
        <View className="p-4 flex flex-col gap-4">
          {/* Tên cây */}
          <View className="flex flex-row items-center rounded-2xl p-4 border border-neutral-300 gap-4">
            <Ionicons name="card" size={25} color="#3CC18E" />
            <TextInput
              placeholder="Tên bạn muốn đặt cho cây"
              className="flex-1 text-neutral-600 font-inter text-lg"
              placeholderTextColor="#9CA3AF"
              value="Cây Lưỡi Hổ"
            />
          </View>
          {/* Loại cây */}
          <View className="flex flex-row items-center rounded-2xl p-4 border border-neutral-300 gap-4">
            <Entypo name="feather" size={25} color="#3CC18E" />
            <Dropdown
              data={dropdownData.typeOfPlant}
              labelField="label"
              valueField="value"
              placeholder="Điều chỉnh loại cây"
              value={plantType}
              onChange={(item) => setPlantType(item.value)}
              style={{ flex: 1 }}
              placeholderStyle={{ color: "#9CA3AF" }}
            />
          </View>
          {/* Giai đoạn phát triển */}
          <View className="flex flex-row items-center rounded-2xl p-4 border border-neutral-300 gap-4">
            <FontAwesome6 name="chart-gantt" size={25} color="#3CC18E" />
            <Dropdown
              data={dropdownData.developStage}
              labelField="label"
              valueField="value"
              placeholder="Chọn giai đoạn phát triển"
              value={developStage}
              onChange={(item) => setDevelopStage(item.value)}
              style={{ flex: 1 }}
              placeholderStyle={{ color: "#9CA3AF" }}
            />
          </View>
          {/* Địa điểm trồng cây */}
          <View className="flex flex-row items-center rounded-2xl p-4 border border-neutral-300 gap-4">
            <Ionicons name="map" size={25} color="#3CC18E" />
            <Dropdown
              data={dropdownData.placePlant}
              labelField="label"
              valueField="value"
              placeholder="Chọn địa điểm trồng"
              value={placePlant}
              onChange={(item) => setPlacePlant(item.value)}
              style={{ flex: 1 }}
              placeholderStyle={{ color: "#9CA3AF" }}
            />
          </View>
          {/* Loại đất */}
          <View className="flex flex-row items-center rounded-2xl p-4 border border-neutral-300 gap-4">
            <Entypo name="shopping-basket" size={25} color="#3CC18E" />
            <Dropdown
              data={dropdownData.soilType}
              labelField="label"
              valueField="value"
              placeholder="Chọn loại đất"
              value={soilType}
              onChange={(item) => setSoilType(item.value)}
              style={{ flex: 1 }}
              placeholderStyle={{ color: "#9CA3AF" }}
            />
          </View>

          {/* Sức khỏe */}
          <View className="h-auto mt-4 p-4 bg-gray-100 border border-neutral-300 rounded-2xl flex flex-col gap-5">
            <View className="flex flex-row items-center justify-between">
              <View className="flex flex-row items-center gap-2">
                <MaterialIcons
                  name="health-and-safety"
                  size={25}
                  color="#3CC18E"
                />
                <Text className="text-lg font-inter-semibold">Sức khỏe</Text>
              </View>
              <Ionicons name="scan-outline" size={25} color="#3CC18E" />
            </View>
            <TextInput
              className="mt-2 p-3 rounded-xl border border-neutral-300 text-lg"
              placeholder="Mô tả tình trạng cây (tối đa 150 ký tự)..."
              placeholderTextColor="#9CA3AF"
              maxLength={150}
              multiline
              value={healthDescription}
              onChangeText={setHealthDescription}
            />
          </View>
          <View className="mt-4 p-5 border border-neutral-300 rounded-2xl flex flex-col gap-3">
            <View className="flex flex-row items-center gap-2 pb-3 border-b border-neutral-200">
              <FontAwesome6 name="file-waveform" size={25} color="#3CC18E" />
              <Text className="text-lg font-inter-semibold text-neutral-500">
                Chăm sóc cá nhân hóa
              </Text>
            </View>

            {/* Thời gian có thể dành mỗi ngày */}
            <View className="flex flex-col gap-2">
              <Text className="text-lg font-medium text-neutral-600">
                Thời gian có thể dành cho cây mỗi ngày?
              </Text>
              <Dropdown
                data={dropdownData.careTimeOptions}
                labelField="label"
                valueField="value"
                placeholder="Chọn thời gian"
                placeholderStyle={{ color: "#9CA3AF" }}
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#D1D5DB",
                  padding: 12,
                }}
                value={selectedCareTime}
                onChange={(item) => setSelectedCareTime(item.value)}
              />
            </View>

            {/* Công việc muốn làm */}
            <View className="flex flex-col gap-2">
              <Text className="text-lg font-medium text-neutral-600">
                Bạn sẽ làm những việc nào để chăm sóc cây?
              </Text>
              <MultiSelect
                data={dropdownData.careTasksOptions}
                labelField="label"
                valueField="value"
                placeholder="Chọn công việc"
                placeholderStyle={{ color: "#9CA3AF" }}
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#D1D5DB",
                  padding: 12,
                }}
                value={selectedCareTasks}
                onChange={(item) => setSelectedCareTasks(item)}
              />
            </View>

            {/* Thời gian thuận tiện */}
            <View className="flex flex-col gap-2">
              <Text className="text-lg font-medium text-neutral-600">
                Thời gian nào thuận tiện để chăm sóc cây?
              </Text>
              <MultiSelect
                data={dropdownData.convenientTimesOptions}
                labelField="label"
                valueField="value"
                placeholder="Chọn thời gian"
                placeholderStyle={{ color: "#9CA3AF" }}
                style={{
                  backgroundColor: "#F9FAFB",
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#D1D5DB",
                  padding: 12,
                }}
                value={selectedConvenientTimes}
                onChange={(item) => setSelectedConvenientTimes(item)}
              />
            </View>
          </View>

          {/* ghi chú */}
          <View className="h-min-48 h-max-screen mt-4 p-4 bg-gray-100 border border-neutral-300 rounded-2xl flex flex-col justify-between gap-5">
            {notes.map((note, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <FontAwesome6 name="notes-medical" size={25} color="#3CC18E" />
                <TextInput
                  className="text-lg  flex-1"
                  placeholder="Ghi chú ..."
                  placeholderTextColor="#B7BBC1"
                  multiline
                  maxLength={100}
                  textAlignVertical="top"
                  value={note}
                  onChangeText={(text) => {
                    const newNotes = [...notes];
                    newNotes[index] = text;
                    setNotes(newNotes);
                  }}
                />
                {/* Hiển thị nút X chỉ khi không phải ghi chú đầu tiên */}
                {index > 0 && (
                  <TouchableOpacity onPress={() => removeNote(index)}>
                    <EvilIcons name="close-o" size={25} color="red" />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {/* Ẩn nút "Thêm ghi chú" khi đủ 3 ghi chú */}
            {notes.length < 3 && (
              <TouchableOpacity
                onPress={addNote}
                className="flex flex-row items-center justify-center border-t border-neutral-300 py-2"
              >
                <Ionicons name="add-sharp" size={24} color="#B7BBC1" />
                <Text className="text-lg font-inter-semibold text-neutral-300">
                  Thêm ghi chú
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Nút Lưu */}
          <TouchableOpacity
            onPress={handleSave}
            className="flex flex-1 bg-[#3CC18E] p-4 rounded-2xl items-center mt-4 mb-20 border border-neutral-300"
          >
            <Text className="text-neutral-100 text-xl font-semibold">Lưu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default CreateAgendaForm;
