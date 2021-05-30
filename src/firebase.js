import firebase from "firebase"

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCmCf6B-K2uetutUoaujDKV1eiDP0L3kkQ",
    authDomain: "instagram-clone-78a8d.firebaseapp.com",
    projectId: "instagram-clone-78a8d",
    storageBucket: "instagram-clone-78a8d.appspot.com",
    messagingSenderId: "1013049591068",
    appId: "1:1013049591068:web:e2a07787fc1d120a7b26d9",
    measurementId: "G-092TQ0PSY8"
})

const db= firebaseApp.firestore()
const auth=firebase.auth()
const storage=firebase.storage()

export {db,auth,storage}