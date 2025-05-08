import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [tasks, setTasks] = useState([]);

  // Firestoreからタスクを取得
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"), orderBy("createdAt", "asc"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
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
      await deleteDoc(doc(db, "tasks", taskId));
      fetchTasks();
    } catch (error) {
      console.error("削除エラー:", error);
    }
  };

  const handleOnTask = async (taskId) => {
    try {
      const taskDoc = doc(db, "tasks", taskId);
      await updateDoc(taskDoc, {
        completed: true, // 任意の状態更新
      });
      fetchTasks();
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  return (
    <div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList tasks={tasks} onDelete={handleDeleteTask} onToggle={handleOnTask} />
    </div>
  );
}

export default App;
