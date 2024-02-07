// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy5MTfh-J87iRZG-0g4ClyKMGYzE8cY04",
  authDomain: "blogging-app-4b94f.firebaseapp.com",
  projectId: "blogging-app-4b94f",
  storageBucket: "blogging-app-4b94f.appspot.com",
  messagingSenderId: "362753028587",
  appId: "1:362753028587:web:0aa2c6b5c209d6981229ae",
  measurementId: "G-1XYRBBTV8S"
};
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
