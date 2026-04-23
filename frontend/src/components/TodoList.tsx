import { TodoItem } from "./TodoItem";
import AddIcon from '/src/assets/add.svg?react'
import RemoveIcon from '/src/assets/trash.svg?react'

import type { Todo } from '../interfaces/ITodo';
import type { TodoListType } from "../interfaces/ITodoList";
import { Popup } from "./Popup";
import { useState } from 'react';
import { ListForm } from "../forms/ListForm";
import { TodoForm } from "../forms/TodoForm";

export interface TodoListProps {
    list: TodoListType;
    onAddTodo: (addTodo: Omit<Todo, "createdAt" | "id">) => void;
    onEditTodo: (editTodo: Todo) => void;
    onToggleTodo: (toggleTodo: Todo) => void;
    onDeleteTodo: (listId: number, todoId: number) => void;
    onEditList: (editList: TodoListType) => void;
    onDeleteList: (listId: number) => void;
}
export function TodoList({ list, onAddTodo, onToggleTodo, onDeleteTodo, onEditList, onDeleteList, onEditTodo }: TodoListProps) {

    const [editPopupActive, setEditPopupActive] = useState(false);
    const [addPopupActive, setAddPopupActive] = useState(false);
    const completed = list.items.filter(todo => todo.completed).length;
    const percentage = list.items.length > 0 ? (completed / list.items.length) * 100 : 0;

    const [percentageType, setPercentageType] = useState(true);





    return (

        <div className=" flex ">
            <div className=" bg-[#161616] w-[300px] h-fit flex   justify-center p-1.5 items-center rounded-md ">

                <div className="   flex w-full h-full flex-col">



                    <div className="  p-1 gap-2 flex flex-col h-full">

                        <div className="rounded-md relative group text-[#e9e9e9] wrap-break-word font-[600] text-[14px] leading-4 p-1.5 hover:bg-[#252525]"
                            onClick={() => setEditPopupActive(false)}>

                            <span className="break-words">{list.title}</span>



                            <div className=" size-[20px] absolute top-1.5 right-1.5 px-[15px] opacity-0 group-hover:opacity-100  bg-[#252525]"

                            />

                            <RemoveIcon className="size-[20px] text-[#9c9c9c] absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" onClick={() => onDeleteList(list.id)} />


                            {editPopupActive && (
                                <Popup title="" onClose={() => setEditPopupActive(false)}>
                                    <ListForm
                                        onConfirm={(editList) => {
                                            onEditList({ ...list, ...editList });
                                            setEditPopupActive(false);
                                        }}
                                        onCancel={() => setEditPopupActive(false)}
                                        initialValue={list}
                                    />
                                </Popup>
                            )}

                        </div>


                        <div className="h-[4px] w-full rounded-md flex flex-row items-center gap-1">

                            <div className="bg-[#4e4e4e] w-full h-full rounded-md">
                                <div className="bg-yellow-500 h-full  rounded-md" style={{ width: `${percentage}%` }} />

                            </div>

                            <span className="text-[12px] font-bold font-mono tabular-nums text-center  shrink-0 w-[4ch] hover:text-white select-none cursor-pointer" onClick={() => setPercentageType(!percentageType)}>
                                {percentageType ? `${Math.round(percentage)}%` : `${completed}/${list.items.length}`}
                            </span>

                        </div>



                        {list.items.length > 0 && (
                            <div className="  max-h-[72.2vh] flex flex-col  gap-2">



                                <div className="flex flex-col gap-2 overflow-y-auto">
                                    {list.items.map((todo: Todo) => (
                                        <TodoItem key={todo.id} todo={todo} onToggle={() => onToggleTodo(todo)} onDelete={() => onDeleteTodo(todo.id, list.id)} onEdit={(editTodo) => onEditTodo(editTodo)} />
                                    ))}
                                </div>

                            </div>
                        )}

                        <div className=" bg-[#4e4e4e] h-[35px] rounded-md flex  px-2 items-center gap-2 text-[#e9e9e9] text-[14px] font-[600] 
                        select-none  cursor-pointer leading-0 hover:bg-[#555555]" onClick={() => setAddPopupActive(true)} >
                            <AddIcon className=" size-[20px] text-[#e9e9e9]" />
                            <div >Adicionar tarefa</div>


                            {addPopupActive && (
                                <Popup title="" onClose={() => setAddPopupActive(false)}>
                                    <TodoForm
                                        onConfirm={(newTodo) => {
                                            onAddTodo({ title: "", completed: false, todoListId: list.id, ...newTodo });
                                            setAddPopupActive(false);
                                        }}
                                        onCancel={() => setAddPopupActive(false)}
                                    />
                                </Popup>
                            )}
                        </div>
                    </div>

                </div>

            </div>
            <div className="  w-[18px] "></div>

        </div>

    );
}