// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  apiKey: "AIzaSyAiwKMzlwMPpm-WWc0PuYkUFpBIUpYaPMk",

  authDomain: "simpe-web-chat.firebaseapp.com",

  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  projectId: "simpe-web-chat",

  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  storageBucket: "simpe-web-chat.appspot.com",

  messagingSenderId: "572827711415",

  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  appId: "1:572827711415:web:caa35924586ae90df09a32",

  measurementId: "G-9P2CN811B8"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default function Firebase() {
  // Initialize Firebase and Firestore

  return { app,db };
}
