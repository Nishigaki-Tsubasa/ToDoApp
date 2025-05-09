import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function App() {
  const [tasks, setTasks] = useState([]);

  // Firestoreからタスクを取得
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(query(collection(db, "tasks"), orderBy("createdAt", "asc")));
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
      const taskDocRef = doc(db, "tasks", taskId);
      const taskSnap = await getDoc(taskDocRef);

      if (taskSnap.exists()) {
        const currentCompleted = taskSnap.data().completed;


        await updateDoc(taskDocRef, {
          completed: !currentCompleted,
        });
        fetchTasks();

      } else {
        console.error("指定されたタスクが存在しません");
      }
    } catch (error) {
      console.error("更新エラー:", error);
    }
  };

  const handleEdit = async (id, newTitle) => {
    const docRef = doc(db, "tasks", id);
    await updateDoc(docRef, { title: newTitle });
    fetchTasks(); // 再取得 or 状態更新
  };


  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <h2 className="mb-0">ToDoリスト</h2>
          </Navbar.Brand>
        </Container>
      </Navbar>


      <div className="d-flex justify-content-center mt-4">
        <div className="w-100" style={{ maxWidth: '600px', fontSize: '0.9rem' }}>
          <TaskForm onTaskAdded={handleTaskAdded} />
          <TaskList tasks={tasks} onDelete={handleDeleteTask} onToggle={handleOnTask} onEdit={handleEdit} />
        </div>
      </div>
    </>

  );
}

export default App;
