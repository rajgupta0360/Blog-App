// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbA5B9-2vouH-aYo-WRIT1kMPiFp3xYt4",
  authDomain: "blog-app-549f8.firebaseapp.com",
  projectId: "blog-app-549f8",
  storageBucket: "blog-app-549f8.firebasestorage.app",
  messagingSenderId: "548821422432",
  appId: "1:548821422432:web:b620984ff19461017b8e05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);