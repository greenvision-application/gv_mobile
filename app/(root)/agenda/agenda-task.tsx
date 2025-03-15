import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Header, Loading } from "@/components";
import { useGlobalStore } from "@/store/global";
import { generateTasks } from "@/services/plantService";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vi } from "date-fns/locale";
import Toast from "react-native-toast-message";
import variables from "@/constants/variables";
import { queryKeys } from "@/libs/tanstackQuery";

type StatusTask =
  (typeof variables.ENUM_TRANSLATIONS.TASK_STATUS)[keyof typeof variables.ENUM_TRANSLATIONS.TASK_STATUS];
// Định nghĩa kiểu dữ liệu Task
interface Task {
  id: string;
  content: string;
  completion_status: StatusTask;
  task_date: string;
  task_time: string;
}

// Giả định API Service để cập nhật trạng thái task
const updateTaskStatus = async (taskId: string, status: StatusTask) => {
  // Đây là nơi bạn sẽ gọi API thực tế
  // Ví dụ: return await api.put(`/tasks/${taskId}`, { completion_status: status });
  return { success: true };
};

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
  const formattedTime = format(new Date(task.task_time), "HH:mm", {
    locale: vi,
  });

  return (
    <View className="flex-row p-4 bg-neutral rounded-lg shadow-sm mb-3 items-center">
      <TouchableOpacity
        onPress={onToggleStatus}
        className={`h-6 w-6 rounded-full mr-3 items-center justify-center border ${
          task.completion_status ===
          variables.ENUM_TRANSLATIONS.TASK_STATUS.DONE
            ? "bg-primary border-primary"
            : "bg-neutral border-semantic-error"
        }`}
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
              ? "text-primary line-through"
              : "text-neutral-500"
          }`}
        >
          {task.content}
        </Text>

        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={14} color="#666" />
          <Text className="text-xs text-gray-500 ml-1 mr-3">
            {formattedDate}
          </Text>

          <Ionicons name="time-outline" size={14} color="#666" />
          <Text className="text-xs text-gray-500 ml-1">{formattedTime}</Text>
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
  const queryClient = useQueryClient();

  // Fetch dữ liệu tasks
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKeys.tasks, phaseId],
    queryFn: () => generateTasks(phaseId!),
  });

  // Mutation để cập nhật trạng thái task
  const mutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: StatusTask }) =>
      updateTaskStatus(taskId, status),
    onSuccess: () => {
      // Invalidate và refetch
      queryClient.invalidateQueries({ queryKey: [queryKeys.tasks, phaseId] });
    },
  });

  // Xử lý toggle trạng thái task
  const handleToggleStatus = (taskId: string) => {
    const task = data?.tasks.find((task: Task) => task.id === taskId);
    if (!task) return;

    const newStatus =
      task.completion_status === variables.ENUM_TRANSLATIONS.TASK_STATUS.DONE
        ? variables.ENUM_TRANSLATIONS.TASK_STATUS.NOT_YET
        : variables.ENUM_TRANSLATIONS.TASK_STATUS.DONE;
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
