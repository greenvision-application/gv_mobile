import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View, Text } from "react-native";
import { Header, Loading } from "@/components";
import { Ionicons, Entypo, FontAwesome6 } from "@expo/vector-icons";
import dropdownData from "@/constants/dropdownData";
import { router, useLocalSearchParams } from "expo-router";
import {
  plantDetail,
  getCategory,
  updateGardenPlant,
} from "@/services/plantService";
import { useQuery } from "@tanstack/react-query";

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
import { useGlobalStore } from "@/store/global";
import Toast from "react-native-toast-message";
import { queryKeys } from "@/libs/tanstackQuery";

const CreateAgendaForm: React.FC = () => {
  const { id } = useLocalSearchParams();
  const { updateUserPlantId } = useGlobalStore();
  const [developStage, setDevelopStage] = useState("");
  const [placePlant, setPlacePlant] = useState("");
  const [soilType, setSoilType] = useState("");
  const [nickname, setNickname] = useState("");
  const [plantType, setPlantType] = useState("");
  const [healthDescription, setHealthDescription] = useState("");
  const [selectedConvenientTimes, setSelectedConvenientTimes] = useState<
    string[]
  >([]);
  const [phaseOptions, setPhaseOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCareTime, setSelectedCareTime] = useState("");
  const [selectedCareTasks, setSelectedCareTasks] = useState<string[]>([]);
  const [notes, setNotes] = useState([""]);

  // Validation states
  const [errors, setErrors] = useState({
    developStage: false,
    placePlant: false,
    soilType: false,
    plantType: false,
  });

  // Fetch plant details
  const { data: plantInfo = {}, isLoading: isPlantLoading } = useQuery({
    queryKey: [queryKeys.plant_detail, id],
    queryFn: () =>
      plantDetail(
        id,
        (res) => res,
        (err) => {
          Alert.alert("Lỗi", "Lỗi khi lấy thông tin cây");
        }
      ),
  });

  // Fetch plant categories
  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: [queryKeys.categories],
    queryFn: async () => {
      const result = await getCategory(
        (res) => res,
        (err) => {
          Alert.alert("Lỗi", "Lỗi khi lấy thông tin loại cây");
        }
      );

      return result
        ? result.map((item: any) => ({
            label: item.category_name,
            value: item.id,
          }))
        : [];
    },
  });

  useEffect(() => {
    if (plantInfo && plantInfo.Phase && Array.isArray(plantInfo.Phase)) {
      const phases = plantInfo.Phase.map((phase: any) => ({
        label: phase.phase_name,
        value: phase.id,
      }));
      setPhaseOptions(phases);
    }
  }, [plantInfo]);

  const isLoading = isPlantLoading || isCategoriesLoading;

  let plantStatistics = {
    difficulty_level: plantInfo.difficulty_level,
    habitatLocation: plantInfo.habitatLocation,
    minTemperature: plantInfo.minTemperature,
    maxTemperature: plantInfo.maxTemperature,
    minMatureSize: plantInfo.minMatureSize,
    maxMatureSize: plantInfo.maxMatureSize,
    lightRequirement: plantInfo.lightRequirement,
    humidityRange: plantInfo.humidityRange,
  };

  // Function to validate required fields
  const validateForm = () => {
    const newErrors = {
      developStage: developStage === "",
      placePlant: placePlant === "",
      soilType: soilType === "",
      plantType:
        plantType === "" &&
        (plantInfo.approved_content !== true ||
          !plantInfo.Category?.category_name),
    };

    setErrors(newErrors);

    // Return true if no errors (all required fields filled)
    return !Object.values(newErrors).some((error) => error === true);
  };

  const isFormValid =
    developStage !== "" &&
    placePlant !== "" &&
    soilType !== "" &&
    (plantType !== "" ||
      (plantInfo.approved_content === true &&
        plantInfo.Category?.category_name));

  const handleSave = async () => {
    if (!validateForm()) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng điền đầy đủ các trường bắt buộc",
        position: "top",
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
      return;
    }

    try {
      await updateGardenPlant(
        {
          id: updateUserPlantId,
          nickname: nickname,
          growth_stage: developStage,
          plant_site: placePlant,
          planting_date: new Date().toISOString(),
          caring_plant_infor: {
            soilType: {
              description: "The type of soil in which the plant is grown",
              value: soilType,
            },
            healthDescription: {
              description:
                "A description of the plant's current health condition",
              value: healthDescription,
            },
            convenientTimes: {
              description:
                "The convenient times the user has for taking care of the plant",
              value: selectedConvenientTimes,
            },
            careTasks: {
              description:
                "The plant care tasks that the user wants to perform",
              value: selectedCareTasks,
            },
            careTime: {
              description:
                "The specific time slots during the day when the user can take care of their plant",
              value: selectedCareTime,
            },
            note: {
              description: "Personal notes about the plant or related matters",
              value: notes,
            },
          },
        },
        (res) => {
          Toast.show({
            type: "success",
            text1: "Thành công",
            text2: "Đã lưu thông tin cây vào vườn của bạn",
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
          router.push(`/agenda/${res?.id}`);
        }
      );
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể thêm cây vào vườn",
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
    }
  };

  return (
    <>
      {/* Header */}
      <Header title="Chăm sóc" />

      <ScrollView className="bg-neutral px-2">
        {isLoading ? (
          <Loading />
        ) : (
          <View className="mb-20">
            {/* Plant Info */}
            <PlantHeader
              image={plantInfo.image_url?.[0]}
              name={plantInfo.plant_name}
              type={plantInfo.Category?.category_name}
              careLocation={plantInfo.habitatLocation}
            />

            {/* Statistics */}
            <PlantStatistics plantInformation={plantStatistics} />

            {/* Environment Sliders */}
            <PlantEnvironmentSliders
              lightValue={plantInfo.lightRequirement}
              humidityValue={plantInfo.humidityRange}
            />

            {/* Plant Attributes */}
            <View className="p-4 flex flex-col gap-4">
              {/* Plant Name */}
              <PlantInfoField
                icon={<Ionicons name="card" size={25} color="#3CC18E" />}
              >
                <PlantTextInput
                  placeholder="Tên bạn muốn đặt cho cây"
                  value={nickname ?? plantInfo.plant_name}
                  onChangeText={setNickname}
                />
              </PlantInfoField>

              {/* Plant Type */}
              <PlantInfoField
                icon={<Entypo name="feather" size={25} color="#3CC18E" />}
                error={
                  errors.plantType && (
                    <Text className="text-semantic-error text-md font-inter-light mt-1">
                      Vui lòng chọn loại cây
                    </Text>
                  )
                }
                required={true}
              >
                <PlantDropdown
                  data={categories}
                  value={plantType}
                  onChange={(item) => {
                    setPlantType(item.value);
                    setErrors({ ...errors, plantType: false });
                  }}
                  placeholder={
                    plantInfo.approved_content === true
                      ? plantInfo.Category?.category_name
                      : "Điều chỉnh loại cây"
                  }
                  editable={plantInfo.approved_content === true ? false : true}
                />
              </PlantInfoField>

              {/* Development Stage */}
              <PlantInfoField
                icon={
                  <FontAwesome6 name="chart-gantt" size={25} color="#3CC18E" />
                }
                error={
                  errors.developStage && (
                    <Text className="text-semantic-error text-md font-inter-light mt-1">
                      Vui lòng chọn giai đoạn phát triển
                    </Text>
                  )
                }
                required={true}
              >
                <PlantDropdown
                  data={phaseOptions}
                  value={developStage}
                  onChange={(item) => {
                    setDevelopStage(item.value);
                    setErrors({ ...errors, developStage: false });
                  }}
                  placeholder="Chọn giai đoạn phát triển"
                />
              </PlantInfoField>

              {/* Plant Location */}
              <PlantInfoField
                icon={<Ionicons name="map" size={25} color="#3CC18E" />}
                error={
                  errors.placePlant && (
                    <Text className="text-semantic-error text-md font-inter-light mt-1">
                      Vui lòng chọn địa điểm trồng
                    </Text>
                  )
                }
                required={true}
              >
                <PlantDropdown
                  data={dropdownData.placePlant}
                  value={placePlant}
                  onChange={(item) => {
                    setPlacePlant(item.value);
                    setErrors({ ...errors, placePlant: false });
                  }}
                  placeholder="Chọn địa điểm trồng"
                />
              </PlantInfoField>

              {/* Soil Type */}
              <PlantInfoField
                icon={
                  <Entypo name="shopping-basket" size={25} color="#3CC18E" />
                }
                error={
                  errors.soilType && (
                    <Text className="text-semantic-error text-md font-inter-light mt-1">
                      Vui lòng chọn loại đất
                    </Text>
                  )
                }
                required={true}
              >
                <PlantDropdown
                  data={dropdownData.soilType}
                  value={soilType}
                  onChange={(item) => {
                    setSoilType(item.value);
                    setErrors({ ...errors, soilType: false });
                  }}
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
              <SaveButton
                onPress={handleSave}
                style={
                  !isFormValid
                    ? "mt-4 p-4 rounded-2xl bg-neutral-300"
                    : "mt-4 p-4 rounded-2xl bg-primary"
                }
              />
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default CreateAgendaForm;
