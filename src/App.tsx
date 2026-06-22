import { TaskItem } from './components/TaskItem';
import type { Category, Task } from './types';
import { act, useState } from 'react';
import { AddTaskForm } from './components/AddTaskForm';
import { useEffect } from 'react';
import { CATEGORIES } from './types';

import { Card, Select, ListBox } from "@heroui/react";




const INITIAL_TASKS: Task[] = [
  { id: "task-2", text: "Запиздить дракона у горы", isDone: true, categoryId: "misc", coordinates: { x: 228, y: 67, z: 322 }, createdAt: 1000 },
  { id: "task-1", text: "Построить ядерный реактор у дома", isDone: false, categoryId: "tech", coordinates: { x: 100, y: 64, z: -200 }, createdAt: 3000 },
  { id: "task-3", text: "Добыть алмазы", isDone: false, categoryId: "resources", createdAt: 2000 },
];



function App() {

  const [tasks, setTasks] = useState<Task[]>(() => {

    const savedTasksString = localStorage.getItem('minecraft_tasks');

    if (savedTasksString) {
      return JSON.parse(savedTasksString);
    }

    return INITIAL_TASKS;
  });

  useEffect(() => {
    const stringifiedTasks = JSON.stringify(tasks);
    localStorage.setItem('minecraft_tasks', stringifiedTasks);
  }, [tasks]);


  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone: !task.isDone};
        }
        return task;
      })
    );
  };


  const addTask = (text: string, coordinates?: { x: number; y: number; z: number }, categoryId?: string) => {
    
    const newTask: Task = {
      id: Date.now().toString(),
      text: text,
      isDone: false,
      categoryId: categoryId, 
      coordinates: coordinates,
      createdAt: Date.now()
    };

    setTasks([...tasks, newTask])
  };


  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  const editTask = (taskId: string, newText: string, newCoords?: { x: number; y: number; z: number }) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: newText, coordinates: newCoords};
        }
        return task;
      })
    );
  };


  const [activeFilter, setActiveFilter] = useState('all');
  

  let filteredTasks: Task[] = [];

  if (activeFilter ===  'all') {
    filteredTasks = tasks;
  } else {
    filteredTasks = tasks.filter((task) => task.categoryId === activeFilter);
  }


  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.isDone === b.isDone) {
      return b.createdAt - a.createdAt
    } else {
      return a.isDone ? 1 : -1
    }
  })
  




return (
  <div className="min-h-screen w-full bg-gradient-to-br from-slate-300 to-slate-400 flex justify-center pt-24 p-4 font-sans text-slate-700">

  <Card className="w-full max-w-4xl min-h-[600px] p-8 flex flex-col gap-6 bg-white/40 backdrop-blur-2xl border-2 border-white/60 shadow-2xl rounded-[2.5rem]">
    
    <header className="flex justify-between items-center w-full">

      <h1 className="text-2xl font-semibold text-gray-500 drop-shadow-sm">Minecraft To Do</h1>
      
      <div className="flex gap-2">
          <Select 
              aria-label="Filter tasks"
              placeholder="Filter: All"
              value={activeFilter}
              onChange={(val) => setActiveFilter(val !== null ? String(val) : 'all')}
              className="w-30"
          >
              <Select.Trigger className="bg-white/50 text-slate-700 border border-white/40 shadow-sm">
                  <Select.Value />
                  <Select.Indicator />
              </Select.Trigger>
              
              <Select.Popover>
                <ListBox className="bg-white/50 text-slate-700 border border-white/40 shadow-sm rounded-lg">
                  <ListBox.Item id="all" textValue="Filter: All">All</ListBox.Item>
                  {CATEGORIES.map((cat) => (
                    <ListBox.Item key={cat.id} id={cat.id} textValue={cat.name}>
                      {cat.name}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
          </Select>
      </div>
    </header>


      <div className="flex gap-2">
        <AddTaskForm onAdd={addTask}/>

      </div>


      <div className="flex flex-col gap-2">

        {
        sortedTasks.map((task) => (
          <TaskItem 
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          />
        ))
        }
      </div>


      <footer className="text-center">
        <p>Tasks: {tasks.length} • Completed: {tasks.filter((task) => task.isDone).length}</p>
      </footer>

    </Card>

    </div>
    
  )
}

export default App