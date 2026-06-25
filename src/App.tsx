import { TaskItem } from './components/TaskItem';
import type { Category, Task } from './types';
import { act, useState } from 'react';
import { AddTaskForm } from './components/AddTaskForm';
import { useEffect } from 'react';
import { CATEGORIES } from './types';

import { Card, Select, ListBox } from "@heroui/react";




const INITIAL_TASKS: Task[] = [
  { 
    id: "tutorial-1", 
    text: "Welcome! Click the checkbox on the left to complete a task.", 
    isDone: false, 
    categoryId: "exploration",
    createdAt: 6000 
  },
  { 
    id: "tutorial-2", 
    text: "You can save locations with X, Y, Z coordinates. Never lose your base!", 
    isDone: false, 
    categoryId: "tech", 
    coordinates: { x: 125, y: -14, z: 850 }, 
    createdAt: 5000 
  },
  { 
    id: "tutorial-3", 
    text: "Click the pencil icon to edit text, coordinates, or category.", 
    isDone: false, 
    categoryId: "building", 
    coordinates: { x: 1042, y: 64, z: -100 }, 
    createdAt: 4000 
  },
  { 
    id: "tutorial-4", 
    text: "Categories are also optional, but great for organizing your goals. Try the filter above!", 
    isDone: false, 
    categoryId: "resources", 
    createdAt: 3000 
  },
  { 
    id: "tutorial-5", 
    text: "You can write really long notes here. Blah, blah, blah, blah, blah, blah, blah, blah, blah, blah, blah... the text area will expand automatically!", 
    isDone: false, 
    categoryId: "magic", 
    coordinates: { x: -200, y: 70, z: 431 }, 
    createdAt: 2000 
  },
  { 
    id: "tutorial-6", 
    text: "Click the trash bin to delete this task. Good luck!", 
    isDone: false, 
    coordinates: { x: 100, y: 83, z: 97 },
    createdAt: 1000 
  },
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

  const editTask = (taskId: string, newText: string, newCoords?: { x: number; y: number; z: number }, newCategoryId?: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: newText, coordinates: newCoords, categoryId: newCategoryId};
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
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-300 to-slate-400 flex justify-center pt-16 pb-16 p-4 font-sans text-slate-700">

            <Card className="w-full max-w-4xl h-[85vh] min-h-[600px] max-h-[900px] p-8 flex flex-col gap-6 bg-white/40 backdrop-blur-2xl border-1 border-white/60 shadow-2xl rounded-[2.5rem]">
              
              <header className="flex justify-between items-center w-full shrink-0">
                <h1 className="text-2xl font-semibold text-gray-500 drop-shadow-sm">Game Task Tracker</h1>
                
                <div className="flex gap-2">
                    <Select 
                        aria-label="Filter tasks"
                        placeholder="Filter: All"
                        value={activeFilter}
                        onChange={(val) => setActiveFilter(val !== null ? String(val) : 'all')}
                        className="w-32"
                    >
                        <Select.Trigger className="bg-white/50 text-slate-700 border border-white/40 shadow-sm rounded-xl h-10 min-h-10 flex items-center">
                            <Select.Value className="text-sm" />
                            <Select.Indicator className="text-slate-500" />
                        </Select.Trigger>
                        
                        <Select.Popover className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl">
                          <ListBox className="bg-transparent p-1">
                            <ListBox.Item className="text-slate-700 hover:bg-white/90" id="all" textValue="Filter: All">
                                All
                            </ListBox.Item>
                            {CATEGORIES.map((cat) => (
                              <ListBox.Item className="text-slate-700 hover:bg-white/90" key={cat.id} id={cat.id} textValue={cat.name}>
                                <div className="flex items-center gap-2">
                                    <span 
                                        className="w-2 h-2 rounded-full shrink-0" 
                                        style={{ backgroundColor: cat.color }} 
                                    />
                                    {cat.name}
                                </div>
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                    </Select>
                </div>
              </header>

              <div className="flex gap-2 shrink-0">
                <AddTaskForm onAdd={addTask}/>
              </div>

              <div className="flex-1 overflow-y-auto pr-3 flex flex-col gap-2 [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-400/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/50">
                
                <div className="pt-2">
                  {sortedTasks.map((task) => (
                    <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={editTask}
                    />
                  ))}
                </div>

              </div>

              <footer className="text-center shrink-0 text-sm text-slate-500 font-medium">
                <p>Tasks: {tasks.length} • Completed: {tasks.filter((task) => task.isDone).length}</p>
              </footer>

            </Card>
        </div>
    );
}

export default App