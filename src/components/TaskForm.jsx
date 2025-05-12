import { useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { db, auth } from '../firebase';



function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;

        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                setError('ログインしてください');
                return;
            }

            await addDoc(collection(db, "tasks"), {
                title,
                completed: false,
                createdAt: serverTimestamp(),
                userId: auth.currentUser.uid, // 現在のユーザーIDを取得
            });

            setTitle('');
            onTaskAdded(); // 親コンポーネントに通知
        } catch (error) {
            console.error("追加失敗:", error);
            setError('タスクの追加に失敗しました。もう一度お試しください。');
        }
    };

    return (
        <div className="container mt-5" style={{ fontSize: '0.9rem' }}>
            <div className="bg-white p-4 rounded shadow-sm border">
                <h4 className="text-center mb-3">新しいタスクを追加</h4>

                {error && <div className="alert alert-danger">{error}</div>}

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
        </div>

    );
}

export default TaskForm;
