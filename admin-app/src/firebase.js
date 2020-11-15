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