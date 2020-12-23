import {writable} from 'svelte/store'

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

auth.onAuthStateChanged(async function(kuser) {
    if (kuser) {
        let resp = {}
        await db.collection("creators").where('email', "==", kuser.email).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                resp = doc.data()
            });
        })
        kuser.docData = resp
        console.log(kuser)
        user.set(kuser)
    } else {
        user.set(0)
    }
});