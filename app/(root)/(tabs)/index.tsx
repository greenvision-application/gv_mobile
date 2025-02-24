import { View, Text, Button, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useStore } from "@/store";
import { fetchUsers, deleteUser, addUser } from "@/services/userService";
import { queryClient } from "@/libs/tanstackQuery";
import UserInfoForm from "@/components/UserInfoForm";
import Navigation from "@/components/Navigation";


const Home = () => {
  // example about zustand
  const { count, increment, decrement, user, updateUser } = useStore();
  const updateName = () => {
    updateUser({ ...user, name: "Jane" });
  };

  // example about react-query and axios

  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000,
  });
  console.log(users);

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <Navigation />
        <UserInfoForm />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;
