import { View, Text, Button, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useStore } from "@/store";
import { fetchUsers, deleteUser, addUser } from "@/services/userService";

const Home = () => {
  // example about zustand
  const { count, increment, decrement, user, updateUser } = useStore();
  const updateName = () => {
    updateUser({ ...user, name: "Jane" });
  };

  // example about react-query and axios

  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000,
  });
  console.log(users);

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => refetch(), // Refresh danh sách sau khi thêm user
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => refetch(), // Refresh danh sách sau khi xóa user
  });
  return (
    <View>
      <Text>Home</Text>

      {/* example about zustand */}
      <Text>{count}</Text>
      <Button title="+" onPress={increment} />
      <Button title="-" onPress={decrement} />

      <Text>{user.name}</Text>
      <Text>{user.age}</Text>
      <Button title="Update Name" onPress={updateName} />

      {/* example about react-query and axios */}
      <View className="flex-1 items-center justify-center">
        <Button
          title="Thêm User"
          onPress={() =>
            addUserMutation.mutate({
              name: "John Doe",
              email: "john@example.com",
            })
          }
        />
        {users ? (
          <SafeAreaProvider>
            <SafeAreaView className="flex-1">
              <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="flex-row items-center justify-between p-4">
                    <Text className="font-inter-extrabold">{item.username}</Text>
                    <Button
                      title="Xóa"
                      onPress={() => deleteUserMutation.mutate(item.id)}
                    />
                  </View>
                )}
              />
            </SafeAreaView>
          </SafeAreaProvider>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

export default Home;
