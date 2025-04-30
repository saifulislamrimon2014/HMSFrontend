// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANMDPNUTU8jpsHiiK1GGJIRhLqM6K3GsM",
  authDomain: "hssm-2cbfc.firebaseapp.com",
  projectId: "hssm-2cbfc",
  storageBucket: "hssm-2cbfc.firebasestorage.app",
  messagingSenderId: "379890412457",
  appId: "1:379890412457:web:f3d8e5bd0efcd763a5b2b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;