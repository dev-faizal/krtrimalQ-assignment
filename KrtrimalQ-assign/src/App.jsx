import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import './index.css';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import auth from './firebase';
import { handleLoad } from './util';
import profile from './assets/profile.png';

// Login Component
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString()
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      const token = await user.getIdToken();
      localStorage.setItem('userToken', token);
      // handleLoad();
    } catch (error) {
      setError("Failed to log in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Sign-in</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
        >
          {loading ? "Signing in..." : "Sign-in with Google"}
        </button>
      </div>
    </div>
  );
};

// Dashboard Component
const DashboardPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Dummy API fetch with pagination
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users?page=${page}`);
        const data = await response.json();
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
    signOut(auth); // Firebase sign out
    handleLoad();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img
              src={profile}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h1 className="text-xl font-semibold">{user.displayName}</h1>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            <LogOut className="mr-2" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">User List</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">First Name</th>
                    <th className="p-3 text-left">Last Name</th>
                    <th className="p-3 text-left">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t">
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.first_name}</td>
                      <td className="p-3">{user.last_name}</td>
                      <td className="p-3">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
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

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return user ? <DashboardPage user={user} /> : <LoginPage />;
};

export default App;
