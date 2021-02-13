import { writable } from 'svelte/store'
import { notification } from './utils.js'
const firebaseConfig = {
    apiKey: "AIzaSyDucnhtBFM0HOg8dxk3lUIRcV8pHmifzXc",
    authDomain: "unify-tn.firebaseapp.com",
    databaseURL: "https://unify-tn.firebaseio.com",
    projectId: "unify-tn",
    storageBucket: "unify-tn.appspot.com",
    messagingSenderId: "393516846997",
    appId: "1:393516846997:web:616a0b2f63d1ab7d82b09c"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const auth = firebase.auth()
    /*      0 => uninitialized 
            undefined => there is no user logged in
            else (object) => user logged in
    */

export const user = writable(0)
auth.onAuthStateChanged(async function(kuser) {
    if (kuser) {


        let tokenRes = await kuser.getIdTokenResult()

        kuser.claims = tokenRes.claims
        if (!kuser.claims.admin) {
            notification.set({
                accentColor: 'error',
                title: 'Error',
                content: 'Unauthorized'
            })
            await firebase.auth().signOut()
            return
        }

        user.set(kuser)
    } else {
        user.set(0)
    }
});