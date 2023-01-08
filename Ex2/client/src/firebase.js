import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/database'
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAB9QJHG-XWJLUVI9S64fSRdFUpnLNC7j4",
  authDomain: "fifth-coral-367309.firebaseapp.com",
  projectId: "fifth-coral-367309",
  storageBucket: "fifth-coral-367309.appspot.com",
  messagingSenderId: "31780247175",
  appId: "1:31780247175:web:9c9ae627a9658dfa9bca22",
  measurementId: "G-CEGDDS6ZW9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db