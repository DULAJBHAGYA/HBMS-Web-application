import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyz8pNPjFx1hzKVmVXccEZvD7J-UV05-Q",
  authDomain: "verify-3deb0.firebaseapp.com",
  projectId: "verify-3deb0",
  storageBucket: "verify-3deb0.appspot.com",
  messagingSenderId: "230057117086",
  appId: "1:230057117086:web:9203fae6e7a0a0e2d9028f",
  measurementId: "G-B7ZX9P4WCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;