import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useState, useEffect } from 'react';
import { collection, deleteDoc, doc, updateDoc, query, orderBy, getDoc, where, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { signOut } from 'firebase/auth'; // FirebaseのsignOutメソッドをインポート
import { auth } from './firebase'; // firebase.js から auth をインポート



function Todo({ user }) {
    const handleLogout = async () => {
        try {
            await signOut(auth); // FirebaseのsignOutでログアウト
            console.log('ログアウト成功');
        } catch (err) {
            console.error('ログアウト失敗：', err.message);
        }
    };

    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");


    useEffect(() => {
        const uid = auth.currentUser?.uid;
        if (uid) {
            fetchUserName(uid).then((username) => {
                if (username) setName(username);
            });
        }
    }, []);

    const fetchUserName = async (uid) => {
        const userDocRef = doc(db, "users", uid);
        const userSnap = await getDoc(userDocRef);


        if (userSnap.exists()) {
            return userSnap.data().name;
        } else {
            return user.displayName
        }
    };

    const fetchTasks = () => {
        try {
            // 'userId'でフィルタリングし、'createdAt'で昇順に並べる
            const q = query(
                collection(db, "tasks"),
                where("userId", "==", auth.currentUser.uid),  // ユーザーIDでフィルタリング
                orderBy("createdAt", "asc")     // 作成日で昇順に並べる
            );

            // onSnapshotを使用してリアルタイムでデータを取得
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTasks(data);  // タスクデータを状態にセット
            });

            // コンポーネントがアンマウントされる際にリスナーをクリーンアップ
            return unsubscribe;
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = () => {
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, "tasks", taskId));
            fetchTasks();
        } catch (error) {
            console.error("削除エラー:", error);
        }
    };

    const handleOnTask = async (taskId) => {
        try {
            const taskDocRef = doc(db, "tasks", taskId);
            const taskSnap = await getDoc(taskDocRef);

            if (taskSnap.exists()) {
                const currentCompleted = taskSnap.data().completed;

                // まずローカルで完了状態を変更
                const updatedTasks = tasks.map((task) =>
                    task.id === taskId ? { ...task, completed: !currentCompleted } : task
                );
                setTasks(updatedTasks); // ステートを更新して即座にUIを変更

                // Firestoreを更新
                await updateDoc(taskDocRef, {
                    completed: !currentCompleted,
                });

                // 更新後に再度タスクを取得
                fetchTasks();
            } else {
                console.error("指定されたタスクが存在しません");
            }
        } catch (error) {
            console.error("更新エラー:", error);
        }
    };


    const handleEdit = async (id, newTitle, deadline) => {
        const docRef = doc(db, "tasks", id);
        await updateDoc(docRef, { title: newTitle, deadline: deadline });
        fetchTasks(); // 再取得 or 状態更新
    };


    return (
        <>
            <Navbar className="bg-light shadow-sm py-3">
                <Container className="d-flex justify-content-between align-items-center">
                    <Navbar.Brand href="#home">
                        <h2 className="mb-0 text-primary">ToDoリスト</h2>
                    </Navbar.Brand>

                    <div className="d-flex align-items-center gap-3">
                        <p className="mb-0 fw-semibold text-secondary">
                            {/* <User /> */}
                            ようこそ, {name} さん</p>
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            ログアウト

                        </button>
                    </div>
                </Container>
            </Navbar>




            <div className="d-flex justify-content-center mt-4">
                <div className="w-100" style={{ maxWidth: '600px', fontSize: '0.9rem' }}>
                    <TaskForm onTaskAdded={handleTaskAdded} />
                    <TaskList tasks={tasks} onDelete={handleDeleteTask} onToggle={handleOnTask} onEdit={handleEdit} />
                </div>
            </div>
        </>

    );
}

export default Todo;
