// components/TodoItem.tsx
import type { Todo } from "../services/todoService";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0" }}>
      <input
        type="checkbox"
        checked={todo.isFinished}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.isFinished ? "line-through" : "none", flex: 1 }}>
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo.id)}>🗑️</button>
    </li>
  );
}