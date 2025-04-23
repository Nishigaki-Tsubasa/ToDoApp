import { useState } from "react";
import TaskForm from "./components/TaskForm";

import { auth } from "./firebase.js";
console.log(auth);

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
    };
    setTasks([newTask, ...tasks]);
  };


  return (
    <div className="app">
      <h1>ToDoリスト</h1>
      <TaskForm onAdd={addTask} />

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
