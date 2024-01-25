import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDnQjdg7HNuO5CQhCKD2DS8R__hr2f4_ys",
  authDomain: "rekebishafundi-94607.firebaseapp.com",
  projectId: "rekebishafundi-94607",
  storageBucket: "rekebishafundi-94607.appspot.com",
  messagingSenderId: "27983586788",
  appId: "1:27983586788:web:2615cfffbdbc199efd93f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});