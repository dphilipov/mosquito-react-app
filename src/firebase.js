import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBCMln0h6g_-FSQVHS9k0uUeeZaJy-k17E",
    authDomain: "react-project-a8679.firebaseapp.com",
    projectId: "react-project-a8679",
    storageBucket: "react-project-a8679.appspot.com",
    messagingSenderId: "840804714972",
    appId: "1:840804714972:web:fb6aef59bc3cdef2462719"
};

firebase.initializeApp(firebaseConfig);

export default firebase;