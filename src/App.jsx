import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  // タスク一覧を取得する関数
  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/api/tasks");
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleTaskAdded = () => {
    fetchTasks();
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      fetchTasks(); // 削除後にリストを更新
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
}



export default App;
