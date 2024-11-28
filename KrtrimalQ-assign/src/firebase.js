// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoPDqjwZlz0C0xCeLRTMNXWNNrRaAp43g",
  authDomain: "krtimalq.firebaseapp.com",
  projectId: "krtimalq",
  storageBucket: "krtimalq.firebasestorage.app",
  messagingSenderId: "959700973169",
  appId: "1:959700973169:web:75c34ccb65a38dccec4dd0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default auth;
