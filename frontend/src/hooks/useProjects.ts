import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../services/projectService";
import type { Project } from "../interfaces/IProject";

const QUERY_KEY = ["projects"];

export function useProjects() {
  const queryClient = useQueryClient();

  // @ts-expect-error to remove later / new useListTodo
  const { data: projects = [], isFetching, hasFetchError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => projectService.getAll().then((projects) =>
      projects
        .sort((a, b) => a.id - b.id)
        .map(project => ({
          ...project,
          lists: project.lists
            .sort((a, b) => a.order < b.order ? -1 : 1)
            .map(list => ({
              ...list,
              items: list.items.sort((a, b) => a.order < b.order ? -1 : 1)
            }))
        }))
    ),
  });


  const addMutation = useMutation({
    mutationFn: (project: Project) => {
      return projectService.add(project);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const editMutation = useMutation({
    mutationFn: (project: Project) => {
      return projectService.update(project);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });

  return {
    projects,
    isFetching,
    hasFetchError,
    addProject: (addProject: Project) => addMutation.mutate(addProject),
    deleteProject: (id: number) => deleteMutation.mutate(id),
    editProject: (editProject: Project) => editMutation.mutate(editProject),
    isAdding: addMutation.isPending,
  };
}