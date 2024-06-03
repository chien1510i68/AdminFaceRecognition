// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcbhYnciFis6ZRn2oyrAwqiX8hIygUCDk",
  authDomain: "adminattended.firebaseapp.com",
  projectId: "adminattended",
  storageBucket: "adminattended.appspot.com",
  messagingSenderId: "79002860690",
  appId: "1:79002860690:web:70152230b0d5bd75ae3a4b",
  measurementId: "G-B6VEG059S4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);