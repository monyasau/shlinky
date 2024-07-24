// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh2AoGUzxeIFKKrOMv6Jn2P5G06qKnpm4",
  authDomain: "shlinky-1.firebaseapp.com",
  projectId: "shlinky-1",
  storageBucket: "shlinky-1.appspot.com",
  messagingSenderId: "646881062718",
  appId: "1:646881062718:web:4e3ddedb306aed955e466f",
  measurementId: "G-RH5SPMH35K"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);