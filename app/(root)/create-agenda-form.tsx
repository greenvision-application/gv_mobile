import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Header } from "@/components";
import { Ionicons, Entypo, FontAwesome6 } from "@expo/vector-icons";
import dropdownData from "@/constants/dropdownData";

import {
  PlantCarePreferences,
  PlantDropdown,
  PlantEnvironmentSliders,
  PlantHeader,
  PlantHealthSection,
  PlantInfoField,
  PlantNotes,
  PlantStatistics,
  PlantTextInput,
  SaveButton,
} from "@/components";

const CreateAgendaForm: React.FC = () => {
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
  const [notes, setNotes] = useState([""]);

  const plantData = {
    image:
      "https://hulatrees.com/wp-content/uploads/2022/03/cay-luoi-ho-la-ngan-vien-vang-04.jpg",
    name: "Cây Lưỡi Hổ",
    type: "Cây cảnh",
    careLocation: "trong nhà",
  };

  const handleSave = () => {
    console.log("Lưu thông tin chăm sóc");
    // Implement your save logic here
  };

  return (
    <>
      {/* Header */}
      <Header title="Chăm sóc" />

      <ScrollView className="bg-neutral px-2">
        {/* Plant Info */}
        <PlantHeader
          image={plantData.image}
          name={plantData.name}
          type={plantData.type}
          careLocation={plantData.careLocation}
        />

        {/* Statistics */}
        <PlantStatistics />

        {/* Environment Sliders */}
        <PlantEnvironmentSliders />

        {/* Plant Attributes */}
        <View className="p-4 flex flex-col gap-4">
          {/* Plant Name */}
          <PlantInfoField
            icon={<Ionicons name="card" size={25} color="#3CC18E" />}
          >
            <PlantTextInput
              placeholder="Tên bạn muốn đặt cho cây"
              value="Cây Lưỡi Hổ"
            />
          </PlantInfoField>

          {/* Plant Type */}
          <PlantInfoField
            icon={<Entypo name="feather" size={25} color="#3CC18E" />}
          >
            <PlantDropdown
              data={dropdownData.typeOfPlant}
              value={plantType}
              onChange={(item) => setPlantType(item.value)}
              placeholder="Điều chỉnh loại cây"
            />
          </PlantInfoField>

          {/* Development Stage */}
          <PlantInfoField
            icon={<FontAwesome6 name="chart-gantt" size={25} color="#3CC18E" />}
          >
            <PlantDropdown
              data={dropdownData.developStage}
              value={developStage}
              onChange={(item) => setDevelopStage(item.value)}
              placeholder="Chọn giai đoạn phát triển"
            />
          </PlantInfoField>

          {/* Plant Location */}
          <PlantInfoField
            icon={<Ionicons name="map" size={25} color="#3CC18E" />}
          >
            <PlantDropdown
              data={dropdownData.placePlant}
              value={placePlant}
              onChange={(item) => setPlacePlant(item.value)}
              placeholder="Chọn địa điểm trồng"
            />
          </PlantInfoField>

          {/* Soil Type */}
          <PlantInfoField
            icon={<Entypo name="shopping-basket" size={25} color="#3CC18E" />}
          >
            <PlantDropdown
              data={dropdownData.soilType}
              value={soilType}
              onChange={(item) => setSoilType(item.value)}
              placeholder="Chọn loại đất"
            />
          </PlantInfoField>

          {/* Health Section */}
          <PlantHealthSection
            healthDescription={healthDescription}
            setHealthDescription={setHealthDescription}
          />

          {/* Care Preferences */}
          <PlantCarePreferences
            careTimeOptions={dropdownData.careTimeOptions}
            careTasksOptions={dropdownData.careTasksOptions}
            convenientTimesOptions={dropdownData.convenientTimesOptions}
            selectedCareTime={selectedCareTime}
            selectedCareTasks={selectedCareTasks}
            selectedConvenientTimes={selectedConvenientTimes}
            setSelectedCareTime={(value) => setSelectedCareTime(value)}
            setSelectedCareTasks={setSelectedCareTasks}
            setSelectedConvenientTimes={setSelectedConvenientTimes}
          />

          {/* Notes */}
          <PlantNotes notes={notes} setNotes={setNotes} />

          {/* Save Button */}
          <SaveButton onPress={handleSave} />
        </View>
      </ScrollView>
    </>
  );
};

export default CreateAgendaForm;
