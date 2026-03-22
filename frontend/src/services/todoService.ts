import axios from 'axios';

export interface Todo {
    id: number;
    title: string;
    isFinished: boolean;
}

const api = axios.create({baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5254', headers: { "Content-Type": "application/json" }});

export const todoService = {
  getAll: () =>
    api.get<Todo[]>("/api/todo").then((res) => res.data),
 
  add: (title: string) =>
    api.post<Todo>("/api/todo", { title, isFinished: false }).then((res) => res.data),
 
  update: (todo: Todo) =>
    api.put<Todo>(`/api/todo/${todo.id}`, todo).then((res) => res.data),
 
  delete: (id: number) =>
    api.delete(`/api/todo/${id}`).then((res) => res.data),
};
 