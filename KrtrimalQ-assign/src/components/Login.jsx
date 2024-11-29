import React, { useState } from 'react';
import  { signInWithGoogle } from '../firebase';
import logo from '../assets/logo.svg'
import googleIcon from '../assets/google.svg'


const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const handleGoogleLogin = async () => {
      setLoading(true);
      setError("");
      try {
       
        const result = await signInWithGoogle();
        const user = result.user;
  
        const userData = {
          uid: updatedUser.uid,
          displayName: updatedUser.displayName,
          email: updatedUser.email,
          photoURL: updatedUser.photoURL,
          creationTime: updatedUser.metadata.creationTime,
          lastSignInTime: updatedUser.metadata.lastSignInTime,
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
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-indigo-200 flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-indigo-600">
            <img src={logo} width={220}/>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
            <div className="p-8 space-y-6 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
              <p className="text-gray-600 text-lg">
                Sign in to access your personalized dashboard
              </p>
              
              <div className="pt-6">
                <button 
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center py-3 
                    bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-gray-300
                    text-gray-700 font-medium rounded-lg 
                    shadow-md transition duration-300 
                    ease-in-out transform hover:scale-105 
                    focus:outline-none focus:ring-2 
                    focus:ring-blue-200 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    hover:bg-gray-50 space-x-3"
                >
                 {loading ? (
                    <div className="flex items-center">
                      <svg 
                        className="animate-spin h-5 w-5 mr-3" 
                        viewBox="0 0 24 24"
                      >
                        <circle 
                          className="opacity-25" 
                          cx="12" 
                          cy="12" 
                          r="10" 
                          stroke="currentColor" 
                          strokeWidth="4"
                        ></circle>
                        <path 
                          className="opacity-75" 
                          fill="currentColor" 
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <>
                      <img src={googleIcon} className="text-red-500" width={24} />
                      <span>Sign in with Google</span>
                    </>
                  )}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
            <div className="mt-2 text-xs text-gray-400">
              Secure login powered by Google
            </div>
          </div>
        </div>
      </main>
    </div>
  );
  
    // return (
    //   <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
    //   <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
    //     <div className="flex items-center">
    //       <img src={logo} width={200} height={80}/>
         
    //     </div>
      
    //   </header>

    //   <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
    //     <div className="w-full max-w-md">
    //       <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
    //         <div className="p-8 space-y-6 text-center">
    //           <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
    //           <p className="text-gray-600">Sign in to continue to your account</p>
              
    //           <div className="pt-4">
    //             <button 
    //               onClick={handleGoogleLogin}
    //               className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
    //             >
    //               {loading ? 'Signing in...': 'Sign in with Google'}
    //             </button>
    //           </div>
    //           <p className='text-danger'>{error}</p>
              
           
    //         </div>
    //       </div>
          
    //       <div className="mt-6 text-center">
    //         <p className="text-xs text-gray-500">
    //           © 2024 Your Company. All rights reserved.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // );
  };

  export default LoginPage