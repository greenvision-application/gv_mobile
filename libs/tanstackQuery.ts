import { QueryClient, focusManager } from "@tanstack/react-query";

const queryClient = new QueryClient();

const queryKeys = {
  similar: "similar-plant",
  popular: "popular-plant",
  timeline: "timeline",
  user: "user",
  planted: "planted",
  favorite: "favorite",
  unplanted: "unplanted",
  schedule: "schedule",
  tasks: "tasks",
  plant_detail: "plant_detail",
  categories: "categories",
};

export { queryClient, queryKeys };
