import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Register from './components/Register';
import Todo from './ToDo';

function App() {
  const [user, setUser] = useState(null);
  const [isLoginPage, setIsLoginPage] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('ログイン状態:', currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (user) {
    return <Todo user={user} />;
  }

  return (
    <div>
      {isLoginPage ? (
        <Login setIsLoginPage={setIsLoginPage} />
      ) : (
        <Register setIsLoginPage={setIsLoginPage} />
      )}
    </div>
  );
}

export default App;
