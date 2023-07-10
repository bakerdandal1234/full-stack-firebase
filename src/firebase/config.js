// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfZg5nj8iQCtLSy9756x_nbnE0E6QaO28",
  authDomain: "react-c4469.firebaseapp.com",
  projectId: "react-c4469",
  storageBucket: "react-c4469.appspot.com",
  messagingSenderId: "256060230440",
  appId: "1:256060230440:web:fa9570e4a7fbbdc5869e1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export const db = getFirestore(app);
