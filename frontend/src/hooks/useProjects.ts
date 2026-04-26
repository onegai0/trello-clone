import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { projectService } from "../services/projectService";
import type { Project } from "../interfaces/IProject";

const QUERY_KEY = ["projects"];

export function useProjects() {
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery({
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });

    },
  });

  const editMutation = useMutation({
    mutationFn: (project: Project) => {
      return projectService.update(project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });

    },
  });

  const deleteMutation = useMutation({
    mutationFn: projectService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });

    },
  });

  return {
    projects,
    isLoading,
    addProject: (project: Project) => addMutation.mutateAsync(project),
    deleteProject: (id: number) => deleteMutation.mutate(id),
    editProject: (editProject: Project) => editMutation.mutate(editProject),
    isAdding: addMutation.isPending,
  };
}