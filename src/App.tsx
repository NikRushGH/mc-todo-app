import { TaskItem } from './components/TaskItem';
import type { Task } from './types';
import { useState } from 'react';
import { AddTaskForm } from './components/AddTaskForm';
import { useEffect } from 'react';


const INITIAL_TASKS: Task[] = [
  { id: "task-2", text: "Запиздить дракона у горы", isDone: true, categoryId: "misc", coordinates: { x: 228, y: 67, z: 322 } },
  { id: "task-1", text: "Построить ядерный реактор у дома", isDone: false, categoryId: "tech", coordinates: { x: 100, y: 64, z: -200 } },
  { id: "task-3", text: "Добыть алмазы", isDone: false, categoryId: "resources" },
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
      coordinates: coordinates
    };

    setTasks([...tasks, newTask])
  };


  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }



  return (
    <div style={{ padding: '2em' }}>
      <h1>Minecraft To-Do</h1>

      <AddTaskForm onAdd={addTask}/>

      <div>
        
        {tasks.map((task) => (
          <TaskItem 
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          />
        ))}

      </div>
    </div>
  )
}

export default App