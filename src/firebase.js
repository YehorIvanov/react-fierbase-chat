import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore, } from 'firebase/firestore';
// import { createContext } from 'react';
const firebaseConfig = {
  apiKey: 'AIzaSyDnC3YGgl4pR95N_nKILweJrKqcwfv4-vg',
  authDomain: 'superchat-f613e.firebaseapp.com',
  projectId: 'superchat-f613e',
  storageBucket: 'superchat-f613e.appspot.com',
  messagingSenderId: '600915123212',
  appId: '1:600915123212:web:3a45a4e6bad65563392229',
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

// export const firebaseContext = createContext({});
