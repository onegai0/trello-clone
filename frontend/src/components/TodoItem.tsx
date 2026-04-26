import Checkbox from "./ui/Checkbox";
import RemoveIcon from '/src/assets/trash.svg?react'
import ClipIcon from '/src/assets/clip.svg?react'
import ClockIcon from '/src/assets/clock.svg?react'
import DescriptionIcon from '/src/assets/description.svg?react'
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
    const date = new Date(str);
    const now = new Date();

    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const currentYear = now.getFullYear();

    const diffMs = date.getTime() - now.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const showYear = year !== currentYear;
    const showTime = diffDays > -1 && diffDays < 1 && diffDays > 0;

    let result = `${day} ${month}`;
    if (showYear) result += ` ${year}`;
    if (showTime) result += ` ${hours}:${minutes}`;

    return result;
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

      <div className='relative flex bg-[#292929] pt-1.5 pb-1 h-[auto] rounded-md px-1.5 group'>
        <div className='flex flex-col w-full relative'>
          <div className="flex flex-col gap-1.5 ">
            <div className='w-auto relative mt-0.5 ps-6 items-start leading-4.5 text-[14px] wrap-break-word text-lg text-[#e9e9e9] font-bold'>
              <div className='absolute left-0 top-[0px]'>
                <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
              </div>

              <div className="break-words select-none cursor-pointer" onClick={() => setEditPopupActive(true)}>
                {todo.title}
              </div>

              <div className="size-[20px] absolute top-0 right-0 px-[14px] transition-opacity opacity-0 group-hover:opacity-100 bg-[#292929]" />

              <RemoveIcon
                className="size-[20px] absolute top-0 right-0 text-[#9c9c9c] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white"
                onClick={() => onDelete(todo.id)}
              />
            </div>

            {(todo.completedAt || todo.dueDate || todo.tag || todo.file || todo.description) && (
              <div className='flex flex-row  w-full truncate justify-between text-[14px] font-[600] text-[#d3d3d3]'>


                <div className="font-mono gap-3 select-none cursor-pointer justify-center items-end flex flex-row tracking-tight" onClick={() => setEditPopupActive(true)}>

                  {(todo.dueDate || todo.completedAt) && (<div className=" flex bg-amber-600 rounded-[2px] p-0.5 flex-row items-end gap-1 leading-[15px]">
                    <ClockIcon className="size-3.5" />
                    <span className="">
                      {todo.completed ? formatDate(todo.completedAt) : formatDate(todo.dueDate)}
                    </span>
                  </div>)}

                  <div className="flex flex-row justify-center gap-2 items-end text-[#d3d3d3]">


                    {todo.description && <DescriptionIcon className="size-4.5 translate-y-[2px]" />}

                    {!todo.file && (
                      <div className="flex flex-row gap-1 items-end font-mono">
                        <ClipIcon className="size-3.translate-y-[1px]" />
                        <div className="leading-[15px]">1</div>
                      </div>
                    )}

                  </div>
                </div>

                <div className="select-none cursor-pointer gap-2 items-end flex flex-row font-mono" onClick={() => setEditPopupActive(true)}>
                  {todo.tag && <span className="flex leading-3.5 ">{todo.tag}</span>}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}