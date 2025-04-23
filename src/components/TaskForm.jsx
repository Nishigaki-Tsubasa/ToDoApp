import { useState } from "react";

const TaskForm = ({ onAdd }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        onAdd(input);     // Appコンポーネントに追加を伝える
        setInput("");     // 入力欄をリセット
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="タスクを入力"
                value={input}
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
