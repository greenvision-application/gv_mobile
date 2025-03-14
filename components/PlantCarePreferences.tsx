import React from "react";
import { View, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import PlantDropdown from "./PlantDropdown";
import PlantMultiSelect from "./PlantMultiSelect";

type CarePreferencesProps = {
  careTimeOptions: Array<{ label: string; value: string }>;
  careTasksOptions: Array<{ label: string; value: string }>;
  convenientTimesOptions: Array<{ label: string; value: string }>;
  selectedCareTime: string;
  selectedCareTasks: string[];
  selectedConvenientTimes: string[];
  setSelectedCareTime: (value: string) => void;
  setSelectedCareTasks: (values: string[]) => void;
  setSelectedConvenientTimes: (values: string[]) => void;
};

const PlantCarePreferences: React.FC<CarePreferencesProps> = ({
  careTimeOptions,
  careTasksOptions,
  convenientTimesOptions,
  selectedCareTime,
  selectedCareTasks,
  selectedConvenientTimes,
  setSelectedCareTime,
  setSelectedCareTasks,
  setSelectedConvenientTimes,
}) => {
  return (
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
        <PlantDropdown
          data={careTimeOptions}
          value={selectedCareTime}
          onChange={(item) => setSelectedCareTime(item.value)}
          placeholder="Chọn thời gian"
          style={{
            backgroundColor: "#F9FAFB",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#D1D5DB",
            padding: 12,
          }}
        />
      </View>

      {/* Công việc muốn làm */}
      <View className="flex flex-col gap-2">
        <Text className="text-lg font-medium text-neutral-600">
          Bạn sẽ làm những việc nào để chăm sóc cây?
        </Text>
        <PlantMultiSelect
          data={careTasksOptions}
          value={selectedCareTasks}
          onChange={setSelectedCareTasks}
          placeholder="Chọn công việc"
        />
      </View>

      {/* Thời gian thuận tiện */}
      <View className="flex flex-col gap-2">
        <Text className="text-lg font-medium text-neutral-600">
          Thời gian nào thuận tiện để chăm sóc cây?
        </Text>
        <PlantMultiSelect
          data={convenientTimesOptions}
          value={selectedConvenientTimes}
          onChange={setSelectedConvenientTimes}
          placeholder="Chọn thời gian"
        />
      </View>
    </View>
  );
};

export default PlantCarePreferences;
