// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: 'AIzaSyBmEm_NrtiLJkF8TqDlVZQ3nUVgUsvsh8o',
  // authDomain: 'tech-thunders-meet.firebaseapp.com',
  // projectId: 'tech-thunders-meet',
  // storageBucket: 'tech-thunders-meet.appspot.com',
  // messagingSenderId: '845122047501',
  // appId: '1:845122047501:web:b2e1601d6d8d525ddc4f44',
  //   apiKey: import.meta.env.VITE_APIKEY,
  //   authDomain: import.meta.env.VITE_AUTHDOMAIN,
  //   projectId: import.meta.env.VITE_PROJECTID,
  //   storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  //   messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  //   appId: import.meta.env.VITE_APPID,

  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
