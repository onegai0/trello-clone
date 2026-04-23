import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todoService";
import type { Todo } from '../interfaces/ITodo';

const QUERY_KEY = ["todos"];

export function useTodos() {
  const queryClient = useQueryClient();

  // @ts-expect-error to remove later / new useListTodo
  const { data: todos = [], isFetching, hasFetchError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => todoService.getAll().then((todos) =>
      todos.sort((a, b) => a.id - b.id)
    ),
  });


  const addMutation = useMutation({
    mutationFn: (todo: Omit<Todo, "createdAt" | "id">) => {
      return todoService.add(todo);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        queryClient.invalidateQueries({ queryKey: ["lists"] }); 
    },

  });

  const toggleMutation = useMutation({
    mutationFn: (todo: Todo) =>
      todoService.update({ ...todo, completed: !todo.completed }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        queryClient.invalidateQueries({ queryKey: ["lists"] }); 
    },  });


  const editMutation = useMutation({
    mutationFn: (todo: Todo) => {
      return todoService.update(todo);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        queryClient.invalidateQueries({ queryKey: ["lists"] }); 
    },  });

  const deleteMutation = useMutation({
    mutationFn: todoService.delete,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        queryClient.invalidateQueries({ queryKey: ["lists"] }); 
    },  });

  return {
    todos,
    isFetching,
    hasFetchError,
    addTodo: (addTodo: Omit<Todo, "createdAt" | "id">) => addMutation.mutate(addTodo),
    deleteTodo: (id: number) => deleteMutation.mutate(id),
    toggleTodo: (editTodo: Todo) => toggleMutation.mutate(editTodo),
    editTodo: (editTodo: Todo) => editMutation.mutate(editTodo),
    isAdding: addMutation.isPending,
  };
}