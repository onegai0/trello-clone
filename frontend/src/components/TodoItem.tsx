import Checkbox from "./ui/Checkbox";
import RemoveIcon from '/src/assets/trash.svg?react'
import { type Todo } from '../interfaces/ITodo';
import { useState } from "react";
import { Popup } from "./Popup";
import { TodoForm } from "../forms/TodoForm";

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (editTodo: Todo) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editPopupActive, setEditPopupActive] = useState(false);

  const formatDate = (str?: string) => {

    if (!str) return "";
    const date = new Date(str.replace(" ", "T").replace(" ", ""));

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes} • ${day}/${month}/${year}`;
  };
  return (
    <div>

      {editPopupActive && (
        <Popup title="" onClose={() => setEditPopupActive(false)}>
          <TodoForm
            onConfirm={(editTodo) => {
              onEdit({ ...todo, ...editTodo });
              setEditPopupActive(false);
            }}
            onCancel={() => setEditPopupActive(false)}
            initialValue={todo}
          />
        </Popup>
      )}

      <div className='relative flex bg-[#292929] pt-1 h-auto rounded-md px-1.5 group'>

        <div className='flex flex-col  w-full relative bg'>





          <div className=''>
            <div className='w-auto relative mt-0.5 ps-6 items-start  leading-4.5 text-[14px] wrap-break-word text-lg text-[#e9e9e9] font-bold  '>

              <div className=' absolute left-0 top-[0px]'>
                <Checkbox
                  checked={todo.completed}
                  onChange={() => onToggle(todo.id)} />
              </div>

              <div className="break-words   select-none cursor-pointer" onClick={() => setEditPopupActive(true)}>{todo.title}</div>

              <div className=" size-[20px] absolute top-0 right-0 px-[14px] transition-opacity opacity-0 group-hover:opacity-100  bg-[#292929]">

              </div>

              <RemoveIcon className="size-[20px] absolute top-0 right-0 text-[#9c9c9c] absolute  opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" onClick={() => {
                onDelete(todo.id);
              }} />

            </div>

            <div className='flex  flex-row  items-end w-full mt-auto truncate justify-between text-[12px] leading-4.5 h-5 font-[600] text-[#d3d3d3]'>
              <div className=" font-mono  select-none cursor-pointer" onClick={() => setEditPopupActive(true)}>{todo.completed ? formatDate(todo.completedAt) : formatDate(todo.createdAt)}</div>

              <div className=" select-none cursor-pointer" onClick={() => setEditPopupActive(true)}>Mewing</div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}