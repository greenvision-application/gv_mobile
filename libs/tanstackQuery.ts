import { QueryClient, focusManager } from "@tanstack/react-query";

const queryClient = new QueryClient();

const queryKeys = {
  similar: "similar-plant",
  popular: "popular-plant",
};

export { queryClient, queryKeys };
