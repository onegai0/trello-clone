import { useState } from "react";
import type { Todo } from '../interfaces/ITodo';

interface TodoFormProps {
  onConfirm: (todo: Partial<Todo>) => void;
  onCancel: () => void;
  initialValue?: Partial<Todo>;
}

export function TodoForm({ onConfirm, onCancel, initialValue = {} }: TodoFormProps) {
  const [value, setValue] = useState(initialValue);
  const set = (field: Partial<Todo>) => setValue(v => ({ ...v, ...field }));

  return (
    <div className="flex flex-col gap-2">
      <input
        autoFocus
        type="text"
        placeholder="Nome da tarefa..."
        value={value.title ?? ""}
        onChange={(e) => set({ title: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && value.title?.trim() && onConfirm(value)}
        className="bg-[#272727] text-white rounded-md px-3 py-2 outline-none focus:ring-2"
      />

      <textarea
        placeholder="Descrição..."
        value={value.description ?? ""}
        onChange={(e) => set({ description: e.target.value })}
        className="bg-[#272727] text-white rounded-md px-3 py-2 outline-none focus:ring-2 resize-none"
        rows={3}
      />

      <input
        type="text"
        placeholder="Tag..."
        value={value.tag ?? ""}
        onChange={(e) => set({ tag: e.target.value })}
        className="bg-[#272727] text-white rounded-md px-3 py-2 outline-none focus:ring-2"
      />

      <select
        value={value.priority ?? ""}
        onChange={(e) => set({ priority: e.target.value ? Number(e.target.value) : undefined })}
        className="bg-[#272727] text-white rounded-md px-3 py-2 outline-none focus:ring-2"
      >
        <option value="">Prioridade...</option>
        <option value="1">Baixa</option>
        <option value="2">Média</option>
        <option value="3">Alta</option>
      </select>

      <input
        type="datetime-local"
        value={value.dueDate ? new Date(value.dueDate).toLocaleString('sv').slice(0, 16) : ""}
        onChange={(e) => {
          if (!e.target.value) return set({ dueDate: undefined });
          const [datePart, timePart] = e.target.value.split('T');
          const [year, month, day] = datePart.split('-').map(Number);
          const [hour, minute] = timePart.split(':').map(Number);
          const date = new Date(year, month - 1, day, hour, minute);
          set({ dueDate: date.toISOString() });
        }}
        className="bg-[#272727] text-white rounded-md px-3 py-2 outline-none focus:ring-2"
      />

      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="text-gray-400 hover:text-white px-4 py-2 cursor-pointer">
          Cancelar
        </button>
        <button
          onClick={() => value.title?.trim() && onConfirm(value)}
          className="bg-[#363636] hover:bg-[#3b3b3b] text-[#cecece] px-4 py-2 rounded-md cursor-pointer"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}