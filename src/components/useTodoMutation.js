import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoApi } from "../api/todos";

const useTodoMutation = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: async ({ id, currentLiked }) => {
      await todoApi.patch(`/todos/${id}`, {
        liked: !currentLiked,
      });
    },
    onMutate: async (id, currentLiked) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodo = queryClient.getQueryData(["todos"]);
      queryClient.setQueryData(["todos"], (prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, liked: !currentLiked } : todo
        )
      );
      return { previousTodo };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(["todos"], context.previousTodo);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const formMutation = useMutation({
    mutationFn: (newTodo) => todoApi.post("/todos", newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
  return { addMutation, formMutation };
};

export default useTodoMutation;
