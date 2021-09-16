import firebase from "firebase";
import { v4 as uuidv4 } from 'uuid';

import "firebase/auth";
import "firebase/firestore";

const provider = new firebase.auth.GoogleAuthProvider();

var firebaseConfig = {
    apiKey: "AIzaSyDA9u8dP9FRbsoEQk7RmyH5ci38y8npYGE",
    authDomain: "project-management-3cb8f.firebaseapp.com",
    projectId: "project-management-3cb8f",
    storageBucket: "project-management-3cb8f.appspot.com",
    messagingSenderId: "496276255747",
    appId: "1:496276255747:web:529ed0f6dda8c093224a36"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider).then(function(result) {
        window.location.href = "/dashboard";

        const isNewUser = result.additionalUserInfo.isNewUser;

        console.log("new user: " + isNewUser);

        if (isNewUser) {
            const fire = firestore.collection("users").doc(auth.currentUser.uid);
        
            fire.set({
                uid: auth.currentUser.uid,
                displayName: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                level: 0,
                xp: 0,
                roles: ["ADMIN"],
                classrooms: [],
            });
        }
    });
};