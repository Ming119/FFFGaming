import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// wrapped auth functions
export const getUser = () => { return onAuthStateChanged; };
export const handleSignUpWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};
export const handleSignInWithEmailPassword = () => { return signInWithEmailAndPassword; };

// wrapped firebase functions
export const create = async (collection, id, data) => {
    return await setDoc(doc(db, collection, id), data);
};

export const read = async (collection, id) => {
    return await getDoc(doc(db, collection, id));
}

export const update = async (collection, id, data) => {
    return await setDoc(doc(db, collection, id), data);
}