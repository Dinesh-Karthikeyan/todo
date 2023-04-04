import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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