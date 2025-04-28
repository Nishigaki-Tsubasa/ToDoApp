function TaskList({ tasks, onDelete }) {
    if (!tasks.length) {
        return <div>タスクがまだありません！</div>;
    }

    return (
        <div>
            <h1>タスク一覧</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <strong>タスク：</strong> {task.title}

                        <button onClick={() => onDelete(task.id)}>削除</button>

                    </li>
                ))}

            </ul>
        </div>
    );
}

export default TaskList;
