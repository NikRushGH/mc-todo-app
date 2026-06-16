import { TaskItem } from './components/TaskItem';
import type { Category, Task } from './types';
import { act, useState } from 'react';
import { AddTaskForm } from './components/AddTaskForm';
import { useEffect } from 'react';
import { CATEGORIES } from './types';


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
    <div style={{ padding: '2em' }}>
      <h1>Minecraft To-Do</h1>

      <AddTaskForm onAdd={addTask}/>

      {/* filter */}
      <div>
        {
          [{ id: "all", name: "All", color: ""}, ...CATEGORIES].map((category) => (
            <button 
            key={category.id} 
            type="button"
            style={{ background: category.id === activeFilter ? 'lightgrey' : ''}}
            onClick={() => setActiveFilter(category.id)}>{category.name}</button>
          ))
        }
      </div>



      <div>
        
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
    </div>
  )
}

export default App