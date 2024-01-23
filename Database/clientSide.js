import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA35tDTwqfgVjq5B9ImzQT9s9i1v15ZkvE",
  authDomain: "rekebishaapp.firebaseapp.com",
  databaseURL: "https://rekebishaapp-default-rtdb.firebaseio.com",
  projectId: "rekebishaapp",
  storageBucket: "rekebishaapp.appspot.com",
  messagingSenderId: "869728077538",
  appId: "1:869728077538:web:be42ce795dbcec341740bb",
  measurementId: "G-Q9V25PRBFF"
};

// Initialize Firebase
const otherfirebaseConfig = initializeApp(firebaseConfig, 'otherfirebaseConfig');

// Initialize Cloud Firestore and get a reference to the service
export const dbc = getFirestore(otherfirebaseConfig);
export const storagec = getStorage(otherfirebaseConfig);
export const authc = getAuth(otherfirebaseConfig);
