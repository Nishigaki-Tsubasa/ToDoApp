function TaskList({ tasks, onDelete, onToggle }) {
    return (
        <>
            <div className="mt-4">
                <h2 className="fs-5 mb-3">タスクリスト</h2>
                <ul className="list-group">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'list-group-item-success' : ''
                                }`}
                        >
                            <span className="fs-6">{task.title}</span>
                            <span>
                                {task.completed && <span className="badge bg-success">完了</span>}
                                <button
                                    onClick={() => onToggle(task.id)}
                                    className="btn btn-sm btn-outline-primary ms-2"
                                >
                                    完了
                                </button>
                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="btn btn-sm btn-outline-danger ms-2"
                                >
                                    削除
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default TaskList;
