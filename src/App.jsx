import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './Login';
import Register from './Register';
import Todo from './ToDo';


function App() {
  const [user, setUser] = useState(null); // Firebaseのログインユーザー
  const [isLoginPage, setIsLoginPage] = useState(true);

  useEffect(() => {
    // ログイン状態を監視
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('ログイン状態:', currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ログイン済み → ToDo画面へ
  if (user) {
    return <Todo user={user} />;
  }

  // 未ログイン → ログイン or 登録画面
  return (
    <div>
      {isLoginPage ? <Login /> : <Register />}
      <div className="text-center mt-3">
        {isLoginPage ? (
          <button className="btn btn-link" onClick={() => setIsLoginPage(false)}>新規登録へ</button>
        ) : (
          <button className="btn btn-link" onClick={() => setIsLoginPage(true)}>ログインへ</button>
        )}
      </div>
    </div>
  );
}

export default App;
