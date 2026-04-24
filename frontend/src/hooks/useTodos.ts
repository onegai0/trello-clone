import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todoService";
import type { Todo } from '../interfaces/ITodo';



export function useTodos() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (todo: Omit<Todo, "createdAt" | "id">) => {
      return todoService.add(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });

    },

  });

  const toggleMutation = useMutation({
    mutationFn: (todo: Todo) =>
      todoService.update({ ...todo, completed: !todo.completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });

    },
  });


  const editMutation = useMutation({
    mutationFn: (todo: Todo) => {
      return todoService.update(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });

    },
  });

  const deleteMutation = useMutation({
    mutationFn: todoService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });

    },
  });

  return {
    addTodo: (addTodo: Omit<Todo, "createdAt" | "id">) => addMutation.mutate(addTodo),
    deleteTodo: (id: number) => deleteMutation.mutate(id),
    toggleTodo: (editTodo: Todo) => toggleMutation.mutate(editTodo),
    editTodo: (editTodo: Todo) => editMutation.mutate(editTodo),
    isAdding: addMutation.isPending,
  };
}