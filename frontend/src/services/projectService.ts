import axios from 'axios';
import type { Project } from '../interfaces/IProject';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL, headers: { "Content-Type": "application/json" } });
export const projectService = {
    getAll: () => 
        api.get<Project[]>("/api/project").then((res) => res.data),

    add: (project: Project) =>
        api.post<Project>("/api/project", project).then((res) => res.data),

    update: (project: Project) =>
        api.put<Project>(`/api/project/${project.id}`, project).then((res) => res.data),

    delete: (id: number) =>
        api.delete(`/api/project/${id}`).then((res) => res.data),
};
