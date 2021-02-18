import { writable } from 'svelte/store'
import { accentColor } from "./store.js"
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
export const user = writable("init")
export const storage = firebase.storage()
import { notification } from './utils.js'
auth.onAuthStateChanged(async function(kuser) {
    if (kuser) {
        let resp = {}
        console.log(kuser)

        let tokenRes = await kuser.getIdTokenResult()
        console.log(tokenRes)
        kuser.claims = tokenRes.claims
        if (kuser.claims.username == undefined) {
            notification.set({
                accentColor: 'error',
                title: 'Error',
                content: 'This is user account, not a content creator account'
            })
            await firebase.auth().signOut()
            return
        }
        console.log(tokenRes)
        kuser.docData = (await db.collection("creators").doc(tokenRes.claims.username).get()).data()
        if (kuser.docData && kuser.docData.accentColor) {
            accentColor.set(kuser.docData.accentColor)
        }
        console.log("the kuser")
        console.log(kuser)
        user.set(kuser)
    } else {
        user.set(0)
    }
});