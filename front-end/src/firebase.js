import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import firebaseConfig from "./firebaseConfig";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// wrapped auth functions
export const SignUpWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};
export const handleSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// wrapped firebase functions
export const create = async (collection, id, data) => {
    return await setDoc(doc(db, collection, id), data);
};

export const read = async (collection, id) => {
    return await getDoc(doc(db, collection, id));
};

export const update = async (collection, id, data) => {
    return await setDoc(doc(db, collection, id), data);
};

export const createUser = (id, data) => {
    return create('users', id, data)
};

export const fetchProductDetails = async (id) => {
    let docSnap = await read('products', id);
    if (docSnap.exists())
        return docSnap.data();
    return null;
};
