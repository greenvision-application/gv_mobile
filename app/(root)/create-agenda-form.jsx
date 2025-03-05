import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    Pressable,
  } from "react-native";
  import { useState, useRef } from "react";
  import {
    Ionicons,
    FontAwesome,
    FontAwesome6,
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
  import { TouchableOpacity } from "react-native";
  import ActionSheet from "react-native-actionsheet";
  import CustomSlider from "@/components/CustomSlider";
  
  const CreateAgendaForm = () => {
    // development stage
    const [developStage, setDevelopStage] = useState("");
    const developStageActionSheet = useRef<ActionSheet>(null);
    // place plant
    const [placePlant, setPlacePlant] = useState("");
    const placePlantActionSheet = useRef<ActionSheet>(null);
    // soil type
    const [soilType, setSoilType] = useState("");
    const soilTypeActionSheet = useRef<ActionSheet>(null);
  
    const [plant, setPlant] = useState({
      image:
        "https://hulatrees.com/wp-content/uploads/2022/03/cay-luoi-ho-la-ngan-vien-vang-04.jpg",
      name: "Cây Lưỡi Hổ",
      type: "Cây cảnh",
    });
  
    const [schedule, setSchedule] = useState({
      water: 3,
      sun: 4,
      soil: 1,
    });
    const plantData = {
      image:
        "https://hulatrees.com/wp-content/uploads/2022/03/cay-luoi-ho-la-ngan-vien-vang-04.jpg",
      name: "Cây Lưỡi Hổ",
      type: "Cây cảnh",
      careLocation: "Chăm sóc trong nhà",
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
  
    const removeNote = (index) => {
      const newNotes = notes.filter((_, i) => i !== index);
      setNotes(newNotes);
    };
  
    const handleSave = () => {
      console.log("Lưu thông tin chăm sóc");
    };
  
    return (
      <>
        {/* header */}
        <View className="bg-[#3CC18E] p-2 py-4 flex flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => console.log("Back button pressed")}
            className=""
          >
            <Ionicons name="chevron-back-sharp" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-neutral-100 text-2xl font-inter-bold">
            Chăm sóc
          </Text>
          <TouchableOpacity
            onPress={() => console.log("Setting button pressed")}
            className=""
          >
            <Ionicons name="settings-sharp" size={30} color="white" />
          </TouchableOpacity>
        </View>
  
        <ScrollView className="bg-black px-2">
          {/* Thông tin cây */}
          <View className="bg-gray-100 p-2 px-4 pt-4 flex flex-row items-center justify-between">
            <View className="">
              <Image
                source={{ uri: plantData.image }}
                className="w-36 h-36 rounded-xl"
              />
            </View>
            <View className=" pr-4 flex flex-col justify-between h-24">
              <Text className="text-2xl font-bold">{plantData.name}</Text>
              <Text className="text-gray-500">
                {plantData.type} - {plantData.careLocation}
              </Text>
              <Text className="text-[#3CC18E]">
                Chăm sóc <Text className="font-bold"> trong nhà </Text>
              </Text>
            </View>
          </View>
  
          {/*thống kê  */}
          <View className="flex flex-row items-center justify-between px-4 py-4">
            <View className="flex flex-col items-center justify-center">
              <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
                <Ionicons name="stats-chart-outline" size={24} color="black" />
              </View>
              <Text className="mt-2">Trung bình</Text>
            </View>
            <View className="flex flex-col items-center justify-center">
              <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
                <Ionicons name="location-outline" size={24} color="black" />
              </View>
              <Text className="mt-2">Phòng khách</Text>
            </View>
            <View className="flex flex-col items-center justify-center">
              <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
                <FontAwesome name="thermometer-half" size={24} color="black" />
              </View>
              <Text className="mt-2">13 - 35 C</Text>
            </View>
            <View className="flex flex-col items-center justify-center">
              <View className="border border-neutral-200 rounded-full w-16 h-16 bg-neutral-200 flex items-center justify-center">
                <FontAwesome6 name="ruler" size={24} color="black" />
              </View>
              <Text className="mt-2">50 - 60cm</Text>
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
                disabled={true}
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
                disabled={true}
              />
            </View>
            <View className="w-1/12">
              <Text>Vừa</Text>
            </View>
          </View>
  
          {/* Thuộc tính cây */}
          <View className="p-4 flex flex-col gap-4">
            {/* Tên cây */}
            <View className="flex flex-col gap-4">
              <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300 gap-4">
                <FontAwesome name="tree" size={24} color="#3CC18E" />
                <TextInput
                  placeholder="Tên cây"
                  className="flex-1 ml-2 text-[#3CC18E] font-inter-medium text-xl"
                  placeholderTextColor="#9CA3AF"
                  value="Cây Lưỡi Hổ"
                  readOnly
                />
              </View>
            </View>
            {/* Loại cây */}
            <View className="flex flex-col gap-4">
              <View className="flex flex-row items-center rounded-2xl p-3 border border-neutral-300 gap-4">
                <Ionicons name="leaf-sharp" size={25} color="#3CC18E" />
                <TextInput
                  placeholder="Loại cây"
                  className="flex-1 ml-2 text-[#3CC18E] font-inter-medium text-xl"
                  placeholderTextColor="#9CA3AF"
                  readOnly
                  value="Cây Cảnh"
                />
              </View>
            </View>
            {/* Ô chọn giai đoạn phát triển cây */}
            <Pressable
              className="flex flex-row items-center rounded-2xl px-4 border border-neutral-300 py-5"
              onPress={() => developStageActionSheet.current?.show()}
            >
              <FontAwesome6 name="sun-plant-wilt" size={25} color="#3CC18E" />
              <Text
                className={`${
                  developStage ? "text-[#3CC18E]" : "text-[#9CA3AF]"
                } px-2 flex-1 ml-2 font-inter-medium text-xl`}
              >
                {developStage || "Giai đoạn phát triển của cây"}
              </Text>
            </Pressable>
            {/* Ô chọn địa điểm trồng cây */}
            <Pressable
              className="flex flex-row items-center rounded-2xl px-4 border border-neutral-300 py-5 "
              onPress={() => placePlantActionSheet.current?.show()}
            >
              <FontAwesome6 name="tree-city" size={25} color="#3CC18E" />
              <Text
                className={`${
                  placePlant ? "text-[#3CC18E]" : "text-[#9CA3AF]"
                } px-2 flex-1 ml-2 font-inter-medium text-xl`}
              >
                {placePlant || "Chọn địa điểm trồng cây"}
              </Text>
            </Pressable>
            {/* Chọn loại đất */}
            <Pressable
              className="flex flex-row items-center rounded-2xl px-4 border border-neutral-300 py-5 gap-2"
              onPress={() => soilTypeActionSheet.current?.show()}
            >
              <Ionicons name="archive-sharp" size={25} color="#3CC18E" />
              <Text
                className={`${
                  soilType ? "text-[#3CC18E]" : "text-[#9CA3AF]"
                } px-2 flex-1 ml-2 font-inter-medium text-xl`}
              >
                {soilType || "Loại đất"}
              </Text>
            </Pressable>
            {/* Sức khỏe */}
            <View className="h-48 mt-4 p-4 bg-gray-100 border border-neutral-300 rounded-2xl flex flex-col gap-5">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="cross-outline"
                    size={30}
                    color="#3CC18E"
                  />
                  <Text className="text-2xl font-medium">Sức khỏe</Text>
                </View>
                <MaterialCommunityIcons
                  name="line-scan"
                  size={30}
                  color="#3CC18E"
                />
              </View>
              <View className="flex flex-row items-center justify-between pb-5 border-b border-neutral-300">
                <Text className="text-xl">Tình trạng</Text>
                <Text className="text-xl font-medium">
                  {plantData.healthStatus.status}
                </Text>
              </View>
  
              <Text className="text-xl text-neutral-300">
                Lần scan cuối: {plantData.healthStatus.lastCheck}
              </Text>
            </View>
            {/* Tưới nước */}
            <View className="h-48 mt-4 p-4 bg-gray-100 border border-neutral-300 rounded-2xl flex flex-col gap-5">
              <View className="flex flex-row items-center justify-center">
                <View className="flex flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="watering-can-outline"
                    size={30}
                    color="#3CC18E"
                  />
                  <Text className="text-2xl font-medium">Tưới nước</Text>
                </View>
              </View>
              <View className="flex flex-row items-center justify-between pb-5 border-b border-neutral-300">
                <Text className="text-xl">Tần suất</Text>
                <Text className="text-xl font-medium">
                  {plantData.careActivities[0].frequency}
                </Text>
              </View>
  
              <Text className="text-xl text-neutral-300">
                Lần scan cuối: {plantData.healthStatus.lastCheck}
              </Text>
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
                  <MaterialCommunityIcons
                    name="note-text"
                    size={28}
                    color="#3CC18E"
                    style={{ marginRight: 10 }}
                  />
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
                      <Ionicons name="close-circle" size={24} color="red" />
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
                  <Text className="text-xl font-semibold text-neutral-300">
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
  
          {/* ActionSheet cho chọn giai đoạn phát triển của cây */}
          <ActionSheet
            ref={developStageActionSheet}
            title="Chọn thời gian phát triển của cây"
            options={[
              "Mới gieo trồng",
              "Mới nảy mầm",
              "Phát triển thành cây non",
              "Cây non phát triển thành cây trưởng thành",
              "Hủy",
            ]}
            cancelButtonIndex={4} // Index của nút Hủy
            onPress={(index) => {
              if (index === 0) setDevelopStage("Mới gieo trồng");
              else if (index === 1) setDevelopStage("Mới nảy mầm");
              else if (index === 2) setDevelopStage("phát triển thành cây non");
              else if (index === 3)
                setDevelopStage("Cây non phát triển thành cây trưởng thành");
              else setDevelopStage("");
            }}
          />
          {/* ActionSheet cho chọn địa điểm trồng cây */}
          <ActionSheet
            ref={placePlantActionSheet}
            title="Chọn chọn địa điểm trồng cây"
            options={["Trong nhà", "Ngoài trời", "Ban công", "Hủy"]}
            cancelButtonIndex={3} // Index của nút Hủy
            onPress={(index) => {
              if (index === 0) setPlacePlant("Trong nhà");
              else if (index === 1) setPlacePlant("Ngoài trời");
              else if (index === 2) setPlacePlant("Ban công");
              else setPlacePlant("");
            }}
          />
          {/* ActionSheet cho loại đât */}
          <ActionSheet
            ref={soilTypeActionSheet}
            title="Loại đất"
            options={["Đất sét", "Đất cát", "Đất đỏ", "Hủy"]}
            cancelButtonIndex={3} // Index của nút Hủy
            onPress={(index) => {
              if (index === 0) setSoilType("Đất sét");
              else if (index === 1) setSoilType("Đất cát");
              else if (index === 2) setSoilType("Đất đỏ");
              else setSoilType("");
            }}
          />
        </ScrollView>
      </>
    );
  };
  export default CreateAgendaForm;
  