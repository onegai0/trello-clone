
export interface Todo {
    id: number;
    priority?: number;
    order?: number;
    title: string;
    description?: string;
    tag?: string;
    completed: boolean;
    createdAt: string;
    dueDate?: string;
    completedAt?: string;
}