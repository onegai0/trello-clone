import axios from 'axios';
import type { Todo } from '../interfaces/ITodo';

const api = axios.create({baseURL: import.meta.env.VITE_API_URL, headers: { "Content-Type": "application/json" }});

export const todoService = {
  getAll: () =>
    api.get<Todo[]>("/api/todo").then((res) => res.data),
 
  add: (todo: Omit<Todo, "createdAt" | "id">) =>
  api.post<Todo>("/api/todo", todo).then((res) => res.data), 
 
  update: (todo: Todo) =>
    api.put<Todo>(`/api/todo/${todo.id}`, todo).then((res) => res.data),
 
  delete: (id: number) =>
    api.delete(`/api/todo/${id}`).then((res) => res.data),
};
 