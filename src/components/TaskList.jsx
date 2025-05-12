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
        <div className="mt-5">
            <h4 className="fs-5 mb-3">タスクの一覧</h4>
            <ul className="list-group">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''
                            }`}

                    >
                        {/* 丸いチェックボックス */}
                        <button
                            onClick={() => onToggle(task.id)}
                            className={`rounded-circle border me-2 d-flex align-items-center justify-content-center`}
                            style={{
                                width: '28px',
                                height: '28px',
                                backgroundColor: task.completed ? '#28a745' : '#fff',
                                border: '2px solid #ccc',
                                color: '#fff',
                                fontWeight: 'bold',
                            }}
                        >
                            {task.completed && '✓'}
                        </button>
                        <span className="fs-6 flex-grow-1 me-2" >
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
                        <span className="fs-6 flex-grow-1 me-2">{/* タイトル or 編集欄 */}</span>

                        <span className="d-flex align-items-center">

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
