import { useMutation, useQueryClient } from "@tanstack/react-query";
import { listService } from "../services/listService";
import type { TodoListType } from "../interfaces/ITodoList";

export function useLists() {
  const queryClient = useQueryClient();


  const addMutation = useMutation({
    mutationFn: (list: TodoListType) => {
      return listService.add(list);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["lists"] }); 
    },
  });

  const editMutation = useMutation({
    mutationFn: (list: TodoListType) => {
      return listService.update(list);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["lists"] }); 
    },
  });

  const deleteMutation = useMutation({
    mutationFn: listService.delete,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["lists"] }); 
    },
  });

  return {
    addList: (addList:TodoListType) => addMutation.mutate(addList),
    deleteList: (id: number) => deleteMutation.mutate(id),
    editList: (editList: TodoListType) => editMutation.mutate(editList),
    isAdding: addMutation.isPending,
  };
}