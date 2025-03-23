import { QueryClient, focusManager } from "@tanstack/react-query";

const queryClient = new QueryClient();

const queryKeys = {
  provinces: "provinces",
  districts: "districts",
  wards: "wards",
  similar: "similar-plant",
  popular: "popular-plant",
  timeline: "timeline",
  user: "user",
  planted: "planted",
  favorite: "favorite",
  unplanted: "unplanted",
  schedule: "schedule",
  tasks: "tasks",
  scan: "scan",
  health: "health",
  plant_detail: "plant_detail",
  categories: "categories",
  notifications: "notifications",
};

export { queryClient, queryKeys };
