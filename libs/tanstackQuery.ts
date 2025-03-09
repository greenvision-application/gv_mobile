import { QueryClient, focusManager } from "@tanstack/react-query";

const queryClient = new QueryClient();

const queryKeys = {
  popular: "popular-plant",
};

export { queryClient, queryKeys };
