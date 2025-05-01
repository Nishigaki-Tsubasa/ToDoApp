function TaskList({ tasks, onDelete, onclick }) {
    if (!tasks.length) {
        return <div>タスクがまだありません！</div>;
    }

    return (
        <div>
            <h1>タスク一覧</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>

                        {/* <button coclick={() => onclick(task.id)}>完了</button>
                        <strong>タスク：</strong> {task.title} */}

                        <span onClick={() => onclick(task.id)}>
                            {task.title} {task.isCompleted ? "(完了)" : "(未完了)"}
                        </span>

                        <button onClick={() => onDelete(task.id)}>削除</button>

                    </li>
                ))}

            </ul>
        </div>
    );
}

export default TaskList;
