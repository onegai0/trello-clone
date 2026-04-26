import { useState, useEffect } from 'react';
import './App.css'
import AddIcon from '/src/assets/add.svg?react'
import RemoveIcon from '/src/assets/trash.svg?react'
import FilterIcon from '/src/assets/filter.svg?react'
import SearchIcon from '/src/assets/search.svg?react'

import { TodoList } from './components/TodoList';
import { Popup } from './components/Popup';
import { ListForm } from './forms/ListForm';
import { ProjectForm } from './forms/ProjectForm';

import { useLists } from './hooks/useLists';
import { useTodos } from "./hooks/useTodos"
import { generateKeyBetween } from "fractional-indexing";
import { useProjects } from './hooks/useProjects';
import type { Project } from './interfaces/IProject';
import bg from './assets/images/musashi.png';

function App() {

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>();


  const [listPupActive, setListPupActive] = useState(false);
  const [projPupActive, setProjPupActive] = useState(false);

  const { projects, addProject, deleteProject, isLoading } = useProjects();
  const { addList, deleteList, editList } = useLists();
  const { addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();


  useEffect(() => {

    if (projects.length === 0 && !isLoading) {
      addProject({ id: 0, title: "Novo Projeto", lists: [] });
    }
  }, [projects.length]);

  const selected = projects.find(p => p.id === selectedId) ?? projects[0];

  const lists = selected?.lists ?? [];
  const lastOrder = lists.length > 0 ? [...lists].sort((a, b) => a.order < b.order ? -1 : 1).at(-1)!.order : null;
  async function addSelect(newProject: Project) {
    const created = await addProject(newProject);
    setSelectedId(created.id);
  }

  async function handleDeleteProject(id: number) {
    const remaining = projects.filter(p => p.id !== id);
    const last = remaining.at(-1);
    deleteProject(id);
    setSelectedId(last?.id);
  }

  function handleSelected(value: Project) {
    setSelectedId(value.id);
    setOpen(false);
  }

  return (
    <>

      <div className="h-screen flex flex-col overflow-hidden ">



        <header id="header" className=' bg-[#161616] '>

          <div className='top-left '>

            <h1>
              <a href="https://www.youtube.com/@onegai_01" className="text-button text-[10px] translate-y-[3px]">
                Ooka
              </a>
            </h1>

            <div className=' bar-position-fix'>


              <div className="relative w-[300px]  rounded  select-none">

                <div className=' mt-2.5'>


                  <div className=' flex flex-col gap-0.5'>
                    <div
                      className="text-white cursor-pointer text-xs flex justify-between  hover:bg-[#161616]   items-center "
                      onClick={() => setOpen(!open)}
                    >
                      <div className="line-clamp-1">{selected?.title}</div>
                      <img
                        className="invert brightness-200"
                        width="20"
                        src="/src/assets/down-arrow.svg"
                      />
                    </div>

                    <div className=' bg-white h-px '></div>

                  </div>
                  <div
                    className={`absolute left-0 w-full  bg-[#161616]  rounded top-[48px] overflow-y-auto max-h-[222px] custom-scroll z-100 ${open ? "block" : "hidden"}`}
                  >
                    {projects
                      .map((project) => (
                        <div
                          key={project.id}
                          onClick={() => handleSelected(project)}
                          className="pl-2 text-white cursor-pointer text-xs hover:bg-[#161616] py-1.5"
                        >
                          {project.title}
                        </div>
                      ))}
                  </div>
                </div>


              </div>


              <div className='mt-2.5 flex gap-3'>
                <AddIcon className="size-4  text-[#969696] cursor-pointer hover:text-white" onClick={() => setProjPupActive(true)} />

                <RemoveIcon className="size-4  text-[#969696] cursor-pointer hover:text-white" onClick={() => handleDeleteProject(selected.id)} />

              </div>

              {projPupActive && (
                <Popup title="" onClose={() => setProjPupActive(false)}>
                  <ProjectForm
                    onConfirm={(newProject) => {
                      addSelect({ id: 0, title: "alguma coisa", lists: [], ...newProject })
                      setProjPupActive(false);
                    }}
                    onCancel={() => setProjPupActive(false)}
                  />
                </Popup>
              )}


            </div>

          </div>




          <div className='bar-position-fix '>

            <div className="relative w-[230px]  rounded  select-none">

              <div className=' mt-2.5'>
                <div className=' gap-0.5 flex flex-col'>
                  <div
                    className="text-[#969696] cursor-pointer text-xs flex justify-between  hover:bg-[#161616]   items-center "                  >
                    <div className="line-clamp-1">Pesquisar</div>

                    <SearchIcon className="size-3.5  text-white cursor-pointer hover:text-white"></SearchIcon>

                  </div>

                  <div className=' bg-white h-px '></div>

                </div>
                <div
                  className={`absolute left-0 w-full  bg-[#161616]  rounded top-[48px] overflow-y-auto max-h-[222px] custom-scroll z-100 ${open ? "block" : "hidden"}`}
                >
                  {projects
                    .map((project) => (
                      <div
                        key={project.id}
                        onClick={() => handleSelected(project)}
                        className="pl-2 text-white cursor-pointer text-xs hover:bg-[#161616] py-1.5"
                      >
                        {project.title}
                      </div>
                    ))}
                </div>
              </div>


            </div>


            <div className='mt-3 flex gap-3'>

              <FilterIcon className="size-4  text-[#969696] cursor-pointer hover:text-white" />

            </div>


          </div>


        </header>

        <section className="flex h-full py-[18px]  bg-black overflow-hidden z-0 bg-cover " style={{ backgroundImage: `url(${bg})`     ,backgroundPosition: "center 40%"
 }}>

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
              <div className=" bg-[#4e4e4e] w-[300px]  h-[40px] rounded-md flex  px-2 items-center gap-2 text-[#e9e9e9] text-[14px] font-[600] 
                        select-none  cursor-pointer leading-0 hover:bg-[#555555]" onClick={() => setListPupActive(true)} >
                <AddIcon className=" size-[20px] text-[#e9e9e9]" />
                <div >Adicionar outra lista</div>

                {listPupActive && (
                  <Popup title="" onClose={() => setListPupActive(false)}>
                    <ListForm
                      onConfirm={(newList) => {
                        addList({ title: "", id: 0, projectId: selected!.id, order: generateKeyBetween(lastOrder, null), items: [], ...newList });
                        setListPupActive(false);
                      }}
                      onCancel={() => setListPupActive(false)}
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