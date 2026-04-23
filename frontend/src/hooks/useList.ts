import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listService } from "../services/listService";
import type { TodoListType } from "../interfaces/ITodoList";

const QUERY_KEY = ["lists"];

export function useLists() {
  const queryClient = useQueryClient();

  // @ts-expect-error to remove later / new useListTodo
  const { data: lists = [], isFetching, hasFetchError } = useQuery({
    queryKey: QUERY_KEY,
queryFn: () => listService.getAll().then((lists) =>
  lists
    .sort((a, b) => a.id - b.id)
    .map(list => ({
      ...list,
      items: list.items.sort((a, b) => a.id - b.id)
    }))
),
  });


  const addMutation = useMutation({
    mutationFn: (list: TodoListType) => {
      return listService.add(list);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const editMutation = useMutation({
    mutationFn: (list: TodoListType) => {
      return listService.update(list);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const deleteMutation = useMutation({
    mutationFn: listService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  return {
    lists,
    isFetching,
    hasFetchError,
    addList: (addList:TodoListType) => addMutation.mutate(addList),
    deleteList: (id: number) => deleteMutation.mutate(id),
    editList: (editList: TodoListType) => editMutation.mutate(editList),
    isAdding: addMutation.isPending,
  };
}