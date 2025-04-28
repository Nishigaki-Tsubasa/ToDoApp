import { useState } from "react";

const TaskForm = ({ onTaskAdded }) => {
    const [title, setInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        const timestamp = new Date().toISOString();
        const isCompleted = false;

        try {
            await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, timestamp, isCompleted }),
            });

            setInput(''); // 入力欄リセット

            if (onTaskAdded) {
                onTaskAdded(); // 親に通知！
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <h1>ToDoリスト</h1>
            <input
                type="text"
                placeholder="タスクを入力"
                value={title}
                onChange={(e) => setInput(e.target.value)}
                className="task-input"
            />
            <button type="submit" className="add-button">
                追加
            </button>
        </form>
    );
};

export default TaskForm;
