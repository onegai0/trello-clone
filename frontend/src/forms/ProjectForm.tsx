import { useState } from "react";
import type { Project } from "../interfaces/IProject";
interface ProjectFormProps {
    onConfirm: (todo: Partial<Project>) => void;
  onCancel: () => void;
  initialValue?: Partial<Project>;
}

export function ProjectForm({ onConfirm, onCancel, initialValue = {} }: ProjectFormProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex flex-col gap-2">
      <input
        autoFocus
        type="text"
        placeholder="Nome do projeto"
        value={value.title ?? ""}
        onChange={(e) => setValue({ ...value, title: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && value.title?.trim() && onConfirm(value)}
        className="bg-[#272727] text-white rounded-md px-3 py-2 outline-none focus:ring-2"
      />

      {/* futuramente adiciona campos aqui */}
      {/* <input value={value.description} onChange={...} /> */}

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