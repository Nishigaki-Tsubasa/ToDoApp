import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { serverTimestamp } from 'firebase/firestore';


function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

        try {
            await addDoc(collection(db, "tasks"), {
                title,
                completed: false,
                createdAt: serverTimestamp()
            });
            setTitle('');
            onTaskAdded(); // 親コンポーネントに通知
        } catch (error) {
            console.error("追加失敗:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>タスク追加</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タスク名" />
            <button type="submit">追加</button>
        </form>
    );
}

export default TaskForm;
