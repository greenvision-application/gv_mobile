import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import UserInfoForm from "@/components/UserInfoForm";
import Navigation from "@/components/Navigation";

import { logout } from "@/libs/appwrite";
import { useGlobalStore } from "@/store/global";

const Home = () => {
  const { refetch } = useGlobalStore();
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <Navigation />
        <UserInfoForm />
        <View>
          <Text>Home</Text>
          <Pressable
            onPress={handleLogout}
            className="bg-semantic-error py-4 rounded-full flex-row items-center justify-center space-x-3 mt-5 shadow-sm active:opacity-90"
          >
            <Text className="text-neutral font-inter-semibold text-xl text-center">
              Đăng xuất
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
