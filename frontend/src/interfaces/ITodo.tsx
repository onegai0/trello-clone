export const Status = {
    Todo: 'Todo',
    Doing: 'Doing',
    Done: 'Done'
} as const

export type Status = typeof Status[keyof typeof Status]

export interface Todo {
    id: number;
    priority?: number;
    order?: number;
    title: string;
    description?: string;
    tag?: string;
    completed: boolean;
    createdAt?: string;
    dueDate?: string;
    completedAt?: string;
}