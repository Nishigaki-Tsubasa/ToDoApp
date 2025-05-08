function TaskList({ tasks, onDelete, onToggle }) {
    return (
        <>
            <h2>タスクリスト</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} {task.completed ? "✅" : ""}
                        <button onClick={() => onToggle(task.id)}>完了</button>
                        <button onClick={() => onDelete(task.id)}>削除</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TaskList;
