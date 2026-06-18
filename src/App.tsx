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

  const editTask = (taskId: string, newText: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: newText};
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
    <div className="min-h-screen flex justify-center items-center p-4">

    
    <Card className="w-full max-w-4xl p-6 flex flex-col gap-6 bg-white/10 backdrop-blur-md">
      
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-8 drop-shadow-md" >Трекер задач</h1>
        <div className="flex gap-2">
           <Select name="" id="">Сортировка</Select>
           <Select name="" id="">Фильтр</Select>
           <Select name="" id="">Профиль</Select>

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
        <p>Задач: {tasks.length} • Выполнено: {tasks.filter((task) => task.isDone).length}</p>
      </footer>

    </Card>


      {/* filter */}
      {/* <div>
        {
          [{ id: "all", name: "All", color: ""}, ...CATEGORIES].map((category) => (
            <Button
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-sm data-[hover=true]:bg-white/20"
            key={category.id} 
            type="button"
            style={{ background: category.id === activeFilter ? 'black' : ''}}
            onClick={() => setActiveFilter(category.id)}>{category.name}</Button>
            
          ))
        }
      </div> */}

    </div>
    
  )
}

export default App