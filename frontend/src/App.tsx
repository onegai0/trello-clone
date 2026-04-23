import { useState } from 'react';
import './App.css'
import AddIcon from '/src/assets/add.svg?react'
import RemoveIcon from '/src/assets/trash.svg?react'
import FilterIcon from '/src/assets/filter.svg?react'

import { useServerStatus } from './hooks/serverStatus'
import { TodoList } from './components/TodoList';
import { Popup } from './components/Popup';
import { ListForm } from './forms/ListForm';
import { useLists } from './hooks/useList';
import { useTodos } from "./hooks/useTodos"


function App() {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Selecionar Projeto");
  const { status } = useServerStatus();
  const handleSelect = (value: string) => {
    setSelected(value);
    setOpen(false);

  };


  const statusColor: Record<number, string> = {
    0: 'bg-yellow-400',
    1: 'bg-red-500',
    2: 'bg-green-500',
  }


  const [options, setOptions] = useState<string[]>(["Onai",
    "Micro Machines",
    "Blender Tutorials",
    "Supermarket",]);

  function addItem(newItem: string) {
    setOptions(prev => {
      const exist = prev.some(item => item === newItem);
      if (!exist) return handleSelect(newItem), [...prev, newItem];

      let n = 0;

      while (prev.some(item => item === `${newItem} (${n})`)) {
        n++;
      }

      return handleSelect(`${newItem} (${n})`), [...prev, `${newItem} (${n})`];
    })
  }

  function removeItem(value: string) {
    setOptions(prev => {
      const newOptions = prev.filter(item => item !== value)

      const deletedIndex = prev.indexOf(value)
      const previousItem = prev[deletedIndex - 1]

      handleSelect(previousItem ?? newOptions[0] ?? "")

      return newOptions
    })
  }

  const [popupActive, setPopupActive] = useState(false);
  const {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
  } = useTodos();
  const { lists, addList, deleteList, editList } = useLists();




  return (
    <>

      <div className="h-screen flex flex-col overflow-hidden">



        <header id="header" className=' bg-[#161616] '>

          <div className='top-left'>

            <h1>
              <a href="https://www.youtube.com/@onegai_01" className="text-button">
                Ooka
              </a>
            </h1>

            <div className=' bar-position-fix'>


              <div className="relative w-[350px]  rounded  select-none">

                <div
                  className="text-white cursor-pointer text-xs flex justify-between py-1.5 hover:bg-[#161616]   items-center "
                  onClick={() => setOpen(!open)}
                >
                  <h2 className="line-clamp-1">{selected}</h2>
                  <img
                    className="invert brightness-200"
                    width="20"
                    src="/src/assets/down-arrow.svg"
                  />
                </div>

                <div className=' bg-white h-px '></div>

                <div
                  className={`absolute left-0 w-full  bg-[#161616]  rounded top-12 overflow-y-auto max-h-[222px] custom-scroll z-100 ${open ? "block" : "hidden"}`}
                >
                  {options
                    .filter((option) => option !== selected)
                    .map((option) => (
                      <div
                        key={option}
                        onClick={() => handleSelect(option)}
                        className="pl-2 text-white cursor-pointer text-xs hover:bg-[#161616] py-1.5"
                      >
                        {option}
                      </div>
                    ))}
                </div>
              </div>

              <AddIcon className="w-[20px] h-[20px]   text-gray-400 cursor-pointer hover:text-white" onClick={() => addItem("New Option")} />
              <RemoveIcon className="w-[20px] h-[20px]  text-gray-400 cursor-pointer hover:text-white" onClick={() => removeItem(selected)} />

            </div>

          </div>




          <div className='bar-position-fix '>

            {/* Status */}
            <div className="relative group">
              <div className={`h-2 w-2  rounded-full  ${statusColor[status]}`}></div>

              <div className="absolute hidden group-hover:block  text-[14px] bg-gray-800 text-gray-200 px-2 rounded mr-2 right-full top-1/2 -translate-y-1/2 ml-2 whitespace-nowrap">
                {status === 0 ? "Loading" : status === 1 ? "Offline" : "Online"}
              </div>
            </div>

            {/* Search */}
            <div className="relative w-[350px]   rounded  select-none">

              <div
                className="text-white cursor-pointer text-xs flex justify-between py-1.5 hover:bg-[#161616]   items-center "            >
                <h2 className="line-clamp-1"> Pesquisar</h2>
                <img
                  className="invert brightness-200"
                  width="16"
                  src="/src/assets/search.svg"
                />
              </div>

              <div className=' bg-white h-px'></div>

            </div>


            <FilterIcon className="w-[20px] h-[20px]  text-gray-400 cursor-pointer hover:text-white" />


          </div>


        </header>

        <section className="flex h-full py-[18px]  overflow-hidden z-0">

          {/* <div className="bg-[#161616] w-[1200px] rounded-md">
    
          </div>

          <div className=' w-[1px] bg-white rounded-xl h-full'></div> */}


          <div className="flex flex-row overflow-y-auto w-full h-full items-start">

            <div>
              <div className='w-[15px] flex bg-amber-400 '>

              </div>

            </div>


            {lists.map(list => {
              return (
                <TodoList
                  key={list.id}
                  list={list}
                  onEditList={editList}
                  onDeleteList={deleteList}
                  onAddTodo={addTodo}
                  onDeleteTodo={deleteTodo}
                  onToggleTodo={toggleTodo}
                  onEditTodo={editTodo}

                />
              );
            })}

            <div className=' flex'>
              <div className=" bg-[#4e4e4e] w-[300px]  h-[45px] rounded-md flex  px-2 items-center gap-2 text-[#e9e9e9] text-[14px] font-[600] 
                        select-none  cursor-pointer leading-0 hover:bg-[#555555]" onClick={() => setPopupActive(true)} >
                <AddIcon className=" size-[20px] text-[#e9e9e9]" />
                <div >Adicionar outra lista</div>

                {popupActive && (
                  <Popup title="" onClose={() => setPopupActive(false)}>
                    <ListForm
                      onConfirm={(newList) => {
                        addList({ title: "", id: 0, items: [], ...newList });
                        setPopupActive(false);
                      }}
                      onCancel={() => setPopupActive(false)}
                    />
                  </Popup>
                )}
              </div>

              <div className='w-[15px] flex '>

              </div>

            </div>


          </div>

        </section>




      </div>






    </>
  )
}

export default App