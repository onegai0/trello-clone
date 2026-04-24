import axios from 'axios';
import type { TodoListType } from '../interfaces/ITodoList';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'https://localhost:5254', headers: { "Content-Type": "application/json" } });
export const listService = {
    getAll: () =>
        api.get<TodoListType[]>("/api/todolist").then((res) => res.data),
    add: (list: TodoListType) =>
        api.post<TodoListType>("/api/todolist", list).then((res) => res.data),

    update: (list: TodoListType) =>
        api.put<TodoListType>(`/api/todolist/${list.id}`, list).then((res) => res.data),

    delete: (id: number) =>
        api.delete(`/api/todolist/${id}`).then((res) => res.data),
};
