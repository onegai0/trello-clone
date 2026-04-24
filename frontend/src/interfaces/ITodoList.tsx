import type { Todo } from "./ITodo";

export interface TodoListType {
    id: number;
    order: string;
    projectId: number;
    title: string;
    items: Todo[];
}