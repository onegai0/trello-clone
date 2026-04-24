import type { TodoListType } from "./ITodoList";

export interface Project {
    id: number;
    title: string;
    lists: TodoListType[];
}