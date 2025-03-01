import {
  CameraType,
  CameraView,
  useCameraPermissions,
  FlashMode,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { useRouter } from "expo-router";
import { uploadImageFile } from "@/services/userService";
import { useGlobalStore } from "@/store/global";
import Loading from "@/components/Loading";

const Scan = () => {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [isLoading, setIsLoading] = useState(false);
  const { setUploadedFileUrl } = useGlobalStore();

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to use the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const getFileInfo = (uri: string) => {
    const fileName = uri.split("/").pop() || "";
    const fileType = fileName.split(".").pop() || "";
    return { fileName, fileType };
  };

  const resizeImage = async (uri: string) => {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
  };

  const getFileSize = async (uri: string) => {
    const info = await FileSystem.getInfoAsync(uri);
    return info.exists ? info.size : undefined;
  };

  const transferImageData = async () => {
    try {
      const resizedUri = await resizeImage(uri!);
      const { fileName, fileType } = getFileInfo(resizedUri);

      let formData = new FormData();
      formData.append("file", {
        uri: resizedUri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);

      return formData;
    } catch (error) {
      console.error("Error transferring image data:", error);
      throw error;
    }
  };

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync({
      quality: 0.7,
      base64: false,
    });
    setUri(photo?.uri || null);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (!result.canceled) {
      setUri(result.assets[0].uri);
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const toggleFlash = () => {
    setFlash((prev) => {
      switch (prev) {
        case "off":
          return "on";
        case "on":
          return "auto";
        case "auto":
          return "off";
        default:
          return "off";
      }
    });
  };

  const handleScanPlant = async () => {
    if (!uri) return;
    const size = await getFileSize(uri);
    if (size && size > 5 * 1024 * 1024) {
      console.error("File quá lớn, vui lòng chọn ảnh nhỏ hơn 5MB.");
      return;
    }
    try {
      setIsLoading(true);
      const formData = await transferImageData();

      const uploadResult = await uploadImageFile(formData);
      if (!uploadResult.url) {
        throw new Error("Không tìm thấy URL ảnh sau khi upload");
      }
      setUploadedFileUrl(uploadResult.url);
      router.push("/properties/ai-infor");
    } catch (error) {
      console.error("Error uploading plant:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const renderPicture = () => {
    return (
      <View style={styles.pictureContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Image
              source={{ uri: uri || undefined }}
              resizeMode="cover"
              style={styles.image}
            />
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => setUri(null)}
                title="Chụp lại ảnh"
                color="#4C85EA"
              />
              <Button
                onPress={handleScanPlant}
                title="Nhận dạng cây"
                color="#4CAF50"
              />
            </View>
          </>
        )}
      </View>
    );
  };

  const renderCamera = () => {
    return (
      <CameraView
        style={styles.camera}
        ref={ref}
        facing={facing}
        flash={flash}
        mute={true}
        responsiveOrientationWhenOrientationLocked
      >
        <View style={styles.closeContainer}>
          <Pressable onPress={() => router.replace("/")}>
            <Ionicons name="close-circle-outline" size={40} color="white" />
          </Pressable>
        </View>
        <View style={styles.flashContainer}>
          <Pressable onPress={toggleFlash}>
            <Ionicons
              name={flash === "off" ? "flash-off" : "flash"}
              size={35}
              color="white"
            />
          </Pressable>
        </View>

        <View style={styles.guideFrame}>
          <View style={styles.guideText}>
            <Text
              style={styles.guideTextContent}
              className="text-semantic-info font-inter-semibold"
            >
              Đặt cây/hoa/lá trong khung chỉ định
            </Text>
          </View>
        </View>

        <View style={styles.shutterContainer}>
          <Pressable onPress={pickImage}>
            <Ionicons name="images" size={40} color="white" />
          </Pressable>
          <Pressable onPress={takePicture}>
            {({ pressed }) => (
              <View
                style={[
                  styles.shutterBtn,
                  {
                    opacity: pressed ? 0.5 : 1,
                  },
                ]}
              >
                <View style={[styles.shutterBtnInner]} />
              </View>
            )}
          </Pressable>
          <Pressable onPress={toggleFacing}>
            <Ionicons name="camera-reverse" size={40} color="white" />
          </Pressable>
        </View>
      </CameraView>
    );
  };

  return (
    <View style={styles.container}>
      {uri ? renderPicture() : renderCamera()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pictureContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 20,
  },
  image: {
    width: "90%",
    aspectRatio: 1,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  closeContainer: {
    position: "absolute",
    top: 75,
    right: 20,
    zIndex: 1,
  },
  flashContainer: {
    position: "absolute",
    top: 75,
    width: "100%",
    alignItems: "center",
  },
  guideFrame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  guideText: {
    position: "absolute",
    width: "90%",
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 15,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  guideTextContent: {
    fontSize: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 8,
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
export default Scan;
