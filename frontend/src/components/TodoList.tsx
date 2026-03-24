// components/TodoList.tsx
import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const [input, setInput] = useState("");
  const { todos, isLoading, isError, addTodo, toggleTodo, deleteTodo, isAdding } = useTodos();

  function handleAdd() {
    const trimmed = input.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleAdd();
  }

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p style={{ color: "red" }}>Erro ao carregar tarefas.</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nova tarefa..."
          style={{ flex: 1, padding: "0.5rem" }}
          disabled={isAdding}
        />
        <button onClick={handleAdd} disabled={isAdding} style={{ padding: "0.5rem 1rem" }}>
          {isAdding ? "..." : "Adicionar"}
        </button>
      </div>

      {todos.length === 0 ? (
        <p style={{ color: "#999" }}>Nenhuma tarefa ainda.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        {todos.filter((t) => t.isFinished).length} / {todos.length} concluídas
      </p>
    </div>
  );
}