import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Header, Loading } from "@/components";
import { useGlobalStore } from "@/store/global";
import { generateTasks, updateTask } from "@/services/plantService";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useMutation, useQuery } from "@tanstack/react-query";
import { vi } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import Toast from "react-native-toast-message";
import variables from "@/constants/variables";
import { queryKeys, queryClient } from "@/libs/tanstackQuery";
import { TaskType } from "@/libs/types";

// Định nghĩa kiểu dữ liệu Task
interface Task {
  id: string;
  content: string;
  completion_status: TaskType;
  task_date: string;
  task_time: string;
}

// Component hiển thị một task đơn lẻ
const TaskItem = ({
  task,
  onToggleStatus,
}: {
  task: Task;
  onToggleStatus: () => void;
}) => {
  const formattedDate = format(new Date(task.task_date), "dd/MM/yyyy", {
    locale: vi,
  });
  const formattedTime = format(
    toZonedTime(new Date(task.task_time), "UTC"),
    "HH:mm",
    {
      locale: vi,
    }
  );

  const isFutureTask = new Date(task.task_date) > new Date();

  return (
    <View className="flex-row p-4 bg-neutral rounded-lg shadow-sm mb-3 items-center">
      <TouchableOpacity
        onPress={onToggleStatus}
        disabled={isFutureTask}
        className={`h-6 w-6 rounded-full mr-3 items-center justify-center border ${
          task.completion_status ===
          variables.ENUM_TRANSLATIONS.TASK_STATUS.DONE
            ? "bg-primary border-primary"
            : "bg-neutral border-semantic-error"
        } ${isFutureTask ? "opacity-50" : ""}`}
      >
        {task.completion_status ===
          variables.ENUM_TRANSLATIONS.TASK_STATUS.DONE && (
          <Ionicons name="checkmark" size={20} color="white" />
        )}
      </TouchableOpacity>

      <View className="flex-1">
        <Text
          className={`text-md font-inter mb-2 ${
            task.completion_status ===
            variables.ENUM_TRANSLATIONS.TASK_STATUS.DONE
              ? "text-semantic-success line-through"
              : task.completion_status ===
                variables.ENUM_TRANSLATIONS.TASK_STATUS.NOT_YET
              ? "text-semantic-error"
              : "text-neutral-500"
          }`}
        >
          {task.content}
        </Text>

        <View className="flex-row justify-between">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={18} color="#666" />
            <Text className="text-xs font-inter text-neutral-500 ml-1 mr-3">
              {formattedDate}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={18} color="#666" />
            <Text className="text-xs font-inter text-neutral-500 ml-1">
              {formattedTime}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Component hiển thị nhóm task theo ngày
const TaskGroup = ({
  date,
  tasks,
  onToggleStatus,
}: {
  date: string;
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
}) => {
  const formattedDate = format(new Date(date), "EEEE, dd/MM/yyyy", {
    locale: vi,
  });

  return (
    <View className="mb-3">
      <Text className="text-lg font-inter-semibold mb-2 text-neutral-500">
        {formattedDate}
      </Text>

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={() => onToggleStatus(task.id)}
        />
      ))}
    </View>
  );
};

// Component chính
const AgendaTask = () => {
  const { phaseId } = useGlobalStore();

  // Fetch dữ liệu tasks
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKeys.tasks, phaseId],
    queryFn: () => generateTasks(phaseId!),
  });

  // Mutation để cập nhật trạng thái task
  const mutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskType }) =>
      updateTask(taskId, status),
    onSuccess: () => {
      // Invalidate và refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks, phaseId] });
    },
  });

  // Xử lý toggle trạng thái task
  const handleToggleStatus = (taskId: string) => {
    const task = data?.tasks.find((task: Task) => task.id === taskId);
    if (!task) return;

    const taskDate = new Date(task.task_date);
    const today = new Date();

    if (taskDate > today) return;

    const newStatus = task.completion_status === "DONE" ? "DO" : "DONE";
    mutation.mutate({ taskId, status: newStatus });
  };

  // Nhóm tasks theo ngày
  const groupTasksByDate = (tasks: Task[] = []) => {
    const grouped: { [date: string]: Task[] } = {};

    tasks.forEach((task) => {
      const date = task.task_date.split("T")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(task);
    });

    return Object.entries(grouped)
      .sort(
        ([dateA], [dateB]) =>
          new Date(dateA).getTime() - new Date(dateB).getTime()
      )
      .map(([date, tasks]) => ({ date, tasks }));
  };

  const groupedTasks = groupTasksByDate(data?.tasks);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return Toast.show({
      type: "error",
      text1: "Lỗi",
      text2: "Lỗi khi lấy dữ liệu công việc",
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
  }

  return (
    <View className="flex-1 bg-neutral">
      <Header title="Công việc" />

      <ScrollView className="flex-1 px-4 pt-4">
        {groupedTasks.length > 0 ? (
          groupedTasks.map(({ date, tasks }) => (
            <TaskGroup
              key={date}
              date={date}
              tasks={tasks}
              onToggleStatus={handleToggleStatus}
            />
          ))
        ) : (
          <View className="items-center justify-center py-10">
            <Text className="text-gray-500">Không có công việc nào</Text>
          </View>
        )}

        {/* Khoảng trống ở cuối để tránh nội dung bị che khuất bởi các UI khác */}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
};

export default AgendaTask;
