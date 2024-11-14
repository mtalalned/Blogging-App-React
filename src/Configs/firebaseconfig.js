// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvuxgDi6ngbhj3AW8tQSW0_Ki4EG1SWI8",
    authDomain: "blogging-app-9bc32.firebaseapp.com",
    projectId: "blogging-app-9bc32",
    storageBucket: "blogging-app-9bc32.firebasestorage.app",
    messagingSenderId: "988284817315",
    appId: "1:988284817315:web:78d108ed33c9d6b8c8d416",
    measurementId: "G-MR34Z0Q0GJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);