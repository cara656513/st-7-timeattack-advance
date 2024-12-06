import { useQuery } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useTodoQuery = (id) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: async () => {
      const response = await todoApi(`/todos/${id}`);
      return response.data;
    },
  });
};

export default useTodoQuery;
