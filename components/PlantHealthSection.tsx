import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

type PlantHealthSectionProps = {
  healthDescription: string;
  setHealthDescription: (text: string) => void;
};

const PlantHealthSection: React.FC<PlantHealthSectionProps> = ({
  healthDescription,
  setHealthDescription,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  // Xử lý khi nhấn vào biểu tượng quét
  const handleScanPress = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    if (permission?.granted) {
      setCameraVisible(true);
    }
  };

  // Chụp ảnh
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });
      setCapturedImage(photo!.uri);
      setCameraVisible(false);
    }
  };

  return (
    <View className="h-auto mt-4 p-4 bg-gray-100 border border-neutral-300 rounded-2xl flex flex-col gap-5">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2">
          <MaterialIcons name="health-and-safety" size={25} color="#3CC18E" />
          <Text className="text-lg font-inter-semibold">Sức khỏe</Text>
        </View>
        <TouchableOpacity onPress={handleScanPress}>
          <Ionicons name="scan-outline" size={25} color="#3CC18E" />
        </TouchableOpacity>
      </View>

      {capturedImage && (
        <View className="mt-2">
          <Image
            source={{ uri: capturedImage }}
            className="w-full h-48 rounded-xl"
            resizeMode="cover"
          />
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              className="mt-2 flex-row items-center"
              onPress={() => setCapturedImage(null)}
            >
              <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
              <Text className="ml-1 text-semantic-error">Xóa ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-2 flex-row items-center"
              onPress={() => console.log("Đang kiểm tra")}
            >
              <MaterialCommunityIcons name="image-auto-adjust" size={24} color="#3CC18E" />
              <Text className="ml-1 text-semantic-success">Kiểm tra</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <TextInput
        className="mt-2 p-3 rounded-xl border border-neutral-300 text-lg"
        placeholder="Mô tả tình trạng cây (tối đa 500 ký tự)..."
        placeholderTextColor="#9CA3AF"
        maxLength={500}
        multiline
        value={healthDescription}
        onChangeText={setHealthDescription}
      />

      <Modal visible={cameraVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          {permission?.granted && (
            <>
              <CameraView style={styles.camera} ref={cameraRef}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setCameraVisible(false)}
                >
                  <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
              </CameraView>

              <View style={styles.captureButtonContainer}>
                <TouchableOpacity
                  onPress={takePicture}
                  style={styles.captureButton}
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  captureButtonContainer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "white",
  },
});

export default PlantHealthSection;
