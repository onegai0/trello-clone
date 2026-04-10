import { useState } from "react";
import type { Form } from '../interfaces/IForm';
interface ListFormProps  extends Form {
initialBorder?: boolean;
}

export function ListForm({ onConfirm, onCancel, initialValue = "" }: ListFormProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex flex-col gap-2">
      <input
        autoFocus
        type="text"
        placeholder="Nome da lista..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && value.trim() && onConfirm(value.trim())}
        className="bg-[#272727] text-white rounded-md px-3 py-2 outline-none focus:ring-2 "
      />
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="text-gray-400 hover:text-white px-4 py-2 cursor-pointer">
          Cancelar
        </button>
        <button
          onClick={() => value.trim() && onConfirm(value.trim())}
          className="bg-[#363636] hover:bg-[#3b3b3b] text-[#cecece] px-4 py-2 rounded-md cursor-pointer"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}