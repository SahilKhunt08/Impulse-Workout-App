import { initializeApp } from "firebase/app";
// import "firebase/storage";
// import "firebase/firestore";
// import firebase from "firebase/app";
// import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB5SWr-2KOZT855ie79W4tw2ps_bdak9sw",
    authDomain: "impulse-workout-app.firebaseapp.com",
    projectId: "impulse-workout-app",
    storageBucket: "impulse-workout-app.appspot.com",
    messagingSenderId: "134273052545",
    appId: "1:134273052545:web:a6c2b681a304f3a5058280",
    measurementId: "G-74PDHEYD5V"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export {db};

// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app();
// }

// const auth = firebase.auth;
// export { auth };



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);