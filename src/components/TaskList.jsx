import { useState } from "react";
import { Trash2 } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { Check } from 'lucide-react';
import { Save } from 'lucide-react';// 保存アイコンをインポート




function TaskList({ tasks, onDelete, onToggle, onEdit }) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [deadline, setDeadline] = useState('');

    const handleEditClick = (task) => {
        setEditingId(task.id);
        setEditTitle(task.title);
        setDeadline(task.deadline); // 期限をセット
    };

    const handleSaveClick = (taskId) => {
        onEdit(taskId, editTitle, deadline); // 親に更新依頼
        setEditingId(null); // 編集終了
        setEditTitle("");
    };

    // 期限のクラスを決定する関数
    const getDeadlineClass = (deadline) => {
        const now = new Date();
        const due = new Date(deadline);
        const diffDays = (due - now) / (1000 * 60 * 60 * 24);

        if (diffDays < 0) {
            return 'text-danger';    // 期限切れ：赤
        } else if (diffDays <= 2) {
            return 'text-warning';   // 締切間近：オレンジ
        } else {
            return 'text-muted';     // 通常：薄いグレー
        }
    }

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
                            {task.completed && <Check size={18} color="#fff" />}
                        </button>

                        {/* タスクタイトルの表示 */}
                        <span className="fs-6 flex-grow-1 me-2" >
                            {editingId === task.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="form-control"
                                    />
                                    <input type="date"
                                        className="form-control"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                    />
                                </div>

                            ) : (
                                task.title
                            )}
                        </span>

                        {/* 期限の表示 */}
                        <span
                            className={`small d-flex me-2 ${task.deadline ? getDeadlineClass(task.deadline) : 'text-muted'
                                }`}
                        >
                            {task.deadline
                                ? new Date(task.deadline).toLocaleDateString('ja-JP', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })
                                : ''}
                        </span>

                        {/* 編集と削除ボタン */}
                        <span className="d-flex align-items-center gap-1">
                            {editingId === task.id ? (
                                <button
                                    onClick={() => handleSaveClick(task.id)}
                                    className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center"
                                    style={{ width: '36px', height: '36px' }}
                                >
                                    <Save size={18} color="#28a745" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleEditClick(task)}
                                    className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center"
                                    style={{ width: '36px', height: '36px' }}
                                >
                                    <SquarePen size={18} color="#6c757d" />
                                </button>
                            )}

                            <button
                                onClick={() => onDelete(task.id)}
                                className="border-0 bg-transparent p-0 d-flex align-items-center justify-content-center"
                                style={{ width: '36px', height: '36px' }}
                            >
                                <Trash2 size={18} color="#dc3545" />
                            </button>
                        </span>



                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
