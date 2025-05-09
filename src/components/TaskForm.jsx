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
                createdAt: serverTimestamp(),
            });
            setTitle('');
            onTaskAdded(); // 親コンポーネントに通知
        } catch (error) {
            console.error("追加失敗:", error);
        }
    };

    return (
        <div className="container mt-4" style={{ fontSize: '0.9rem' }}>
            <h2 className="text-center mb-3">タスク追加</h2>
            <form onSubmit={handleSubmit}>
                <div className="row g-2">
                    <div className="col-9">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="タスク名を入力"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="col-3 d-grid">
                        <button type="submit" className="btn btn-primary">追加</button>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default TaskForm;
