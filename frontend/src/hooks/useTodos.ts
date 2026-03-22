// hooks/useTodos.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todoService";
import type { Todo } from "../services/todoService";

const QUERY_KEY = ["todos"];

export function useTodos() {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, isError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: todoService.getAll,
  });

  const addMutation = useMutation({
    mutationFn: todoService.add,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  // Toggle: busca o todo atual e inverte isFinished via PUT
  const toggleMutation = useMutation({
    mutationFn: (id: number) => {
      const todo = queryClient.getQueryData<Todo[]>(QUERY_KEY)?.find((t) => t.id === id);
      if (!todo) throw new Error("Todo não encontrado");
      return todoService.update({ ...todo, isFinished: !todo.isFinished });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const deleteMutation = useMutation({
    mutationFn: todoService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  return {
    todos,
    isLoading,
    isError,
    addTodo: (title: string) => addMutation.mutate(title),
    toggleTodo: (id: number) => toggleMutation.mutate(id),
    deleteTodo: (id: number) => deleteMutation.mutate(id),
    isAdding: addMutation.isPending,
  };
}