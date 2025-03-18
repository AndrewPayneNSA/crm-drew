import { initializeApp, getApps } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQD4K2Ad3QjTFjjySA7TWCxe8anHlfb9c",
  authDomain: "crm-drew.firebaseapp.com",
  projectId: "crm-drew",
  storageBucket: "crm-drew.appspot.com",
  messagingSenderId: "75812192063",
  appId: "1:75812192063:web:16da715bf6c00728861d8a"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error('Error setting auth persistence:', error);
  });

export { app, auth, db }; 