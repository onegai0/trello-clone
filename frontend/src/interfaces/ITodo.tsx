
export interface Todo {
    id: number;
    priority?: number;
    order: string;
    title: string;
    description?: string;
    file? : string[];
    tag?: string;
    completed: boolean;
    createdAt: string;
    dueDate?: string;
    completedAt?: string;
    todoListId? : number;
}