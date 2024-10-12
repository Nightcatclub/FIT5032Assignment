// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7qjWcIQk5UQDWU9GHN9ftG_NiII_9Az4",
  authDomain: "assignment-5032.firebaseapp.com",
  projectId: "assignment-5032",
  storageBucket: "assignment-5032.appspot.com",
  messagingSenderId: "704666761426",
  appId: "1:704666761426:web:411b11e2356e620e0c150b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth()
export { db, auth } 
