import React, { useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import auth from '../firebase';
import logo from '../assets/logo.svg'



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
      } catch (error) {
        setError("Failed to log in with Google.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} width={200} height={80}/>
         
        </div>
      
      </header>

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="p-8 space-y-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
              <p className="text-gray-600">Sign in to continue to your account</p>
              
              <div className="pt-4">
                <button 
                  onClick={handleGoogleLogin}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  {loading ? 'Signing in...': 'Sign in with Google'}
                </button>
              </div>
              <p className='text-danger'>{error}</p>
              
           
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © 2024 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  };

  export default LoginPage