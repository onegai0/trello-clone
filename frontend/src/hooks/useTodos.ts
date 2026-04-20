import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todoService";
import type { Todo } from '../interfaces/ITodo';

const QUERY_KEY = ["todos"];

export function useTodos() {
  const queryClient = useQueryClient();

  // @ts-expect-error deixa ai po
  const { data: todos = [], isFetching, hasFetchError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: todoService.getAll,
  });


  const addMutation = useMutation({
    mutationFn: todoService.add,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: number) => {
      const todo = queryClient.getQueryData<Todo[]>(QUERY_KEY)?.find((t) => t.id === id);
      if (!todo) throw new Error("Todo não encontrado");
      return todoService.update({ ...todo, completed: !todo.completed });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });


const editMutation = useMutation({
  mutationFn: (updatedTodo: Todo) => {
    return todoService.update(updatedTodo);
  },
  onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
});

  const deleteMutation = useMutation({
    mutationFn: todoService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  return {
    todos,
    isFetching,
    hasFetchError,
    addTodo: (title: string) => addMutation.mutate(title),
    toggleTodo: (id: number) => toggleMutation.mutate(id),
    deleteTodo: (id: number) => deleteMutation.mutate(id),
    editTodo: (updatedTodo: Todo) => editMutation.mutate(updatedTodo),
    isAdding: addMutation.isPending,
  };
}