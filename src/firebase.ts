import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2YK7jsE6wUS7rbhUack3qDjjYlVaobps",
    authDomain: "simple-cinema.firebaseapp.com",
    projectId: "simple-cinema",
    storageBucket: "simple-cinema.appspot.com",
    messagingSenderId: "756831189027",
    appId: "1:756831189027:web:15c857fc545e858cbfd996",
    measurementId: "G-GE4X0JDPYK",
};

firebase.initializeApp(firebaseConfig);

export default firebase;