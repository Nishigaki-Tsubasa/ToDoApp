import { useState } from "react";

function TaskList({ tasks, onDelete, onToggle, onEdit }) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const handleEditClick = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
    };

    const handleSaveClick = (taskId) => {
        onEdit(taskId, editTitle); // 親に更新依頼
        setEditingId(null); // 編集終了
        setEditTitle("");
    };

    return (
        <div className="mt-4">
            <h2 className="fs-5 mb-3">タスクリスト</h2>
            <ul className="list-group">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''
                            }`}
                    >
                        <span className="fs-6 flex-grow-1 me-2">
                            {editingId === task.id ? (
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="form-control"
                                />
                            ) : (
                                task.title
                            )}
                        </span>
                        <span>
                            {task.completed && <span className="badge bg-success">完了</span>}
                            <button
                                onClick={() => onToggle(task.id)}
                                className="btn btn-sm btn-outline-primary ms-2"
                            >
                                完了
                            </button>
                            {editingId === task.id ? (
                                <button
                                    onClick={() => handleSaveClick(task.id)}
                                    className="btn btn-sm btn-success ms-2"
                                >
                                    保存
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEditClick(task)}
                                    className="btn btn-sm btn-outline-secondary ms-2"
                                >
                                    編集
                                </button>
                            )}
                            <button
                                onClick={() => onDelete(task.id)}
                                className="btn btn-sm btn-danger ms-2"
                            >
                                削除
                            </button>

                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
