import { writable } from "svelte/store";
import { auth, db } from "../lib/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, updateDoc, setDoc, getDoc } from "@firebase/firestore";

export const authStore = writable({
    user: null,
    loading: true,
    data: {}
});

export const authHandler = {
    signin: async(email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
    },
    login: async(email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    },
    signout: async() => {
        await signOut(auth);
    }
};

export const dbHandler = {
    updateDoc: async(collection, document, data) => {
        await updateDoc(doc(db, collection, document), data)
    },
    setDoc: async(collection, document, data) => {
        await setDoc(doc(db, collection, document), data);
    },
    getDoc: async(collection, document) => {
        const docSnap = await getDoc(doc(db, collection, document))
        return docSnap;
    }
}