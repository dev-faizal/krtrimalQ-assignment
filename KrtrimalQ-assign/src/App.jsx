import React, { useState, useEffect } from 'react';
import './index.css';
import {
  onAuthStateChanged
} from 'firebase/auth';
import auth from './firebase';
import LoginPage from './components/Login.jsx';
import DashboardPage from './components/Dashboard.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user || localStorage.getItem('userToken') ? <DashboardPage user={user} /> : <LoginPage />;
};

export default App;
