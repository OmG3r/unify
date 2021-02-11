import { writable } from "svelte/store";

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
export const auth = firebase.auth()
export const db = firebase.firestore()
    /* 0 => uninitialized 
        undefined => there is no user logged in
        else (object) => user logged in
    */
export const user = writable(0)
auth.onAuthStateChanged(async function(kuser) {
    if (kuser) {

        console.log(kuser)
        kuser.docData = (await db.collection('users').doc(kuser.uid).get()).data() || {}
        user.set(kuser)
    } else {
        // No user is signed in.
        console.log('no user')
        user.set(undefined)
    }
});

let cacheHours = 3
class FirebaseDBWrapper {
    constructor(db) {
        this.db = db
        this.activeListeners = {}


    }

    async get(path, fresh = false) {
        if (fresh) {
            console.log(path)
            let doc = await this.db.doc(path).get()
            let docData = doc.data()
            console.log(docData)
                //console.log(docData)
                //console.log(path)
            if (docData) {
                let writing = {
                    data: docData,
                    timestamp: Date.now() / 1000
                }
                localStorage.setItem(path, JSON.stringify(writing))
                    //console.log("serving from db and saving")
                return docData
            } else {
                localStorage.setItem(path, JSON.stringify({}))
                return {}
            }
        }
        let lData = localStorage.getItem(path)
        if (lData != null) {
            /* if we have cached data send it */
            let pData = JSON.parse(lData)
            if (pData.data) {
                if (((Date.now() / 1000) - pData.timestamp) < cacheHours * 3600) {
                    console.log("serving from localStorage")
                    return pData.data
                }
            } else {
                //console.log(path + " is unavaiable")
                return {}
            }


        }
        /* no cache, read from db then cache */
        let doc = await this.db.doc(path).get()
        let docData = doc.data()

        //console.log(docData)
        //console.log(path)
        if (docData) {
            let writing = {
                data: docData,
                timestamp: Date.now() / 1000
            }
            localStorage.setItem(path, JSON.stringify(writing))
                //console.log("serving from db and saving")
            return docData
        } else {
            localStorage.setItem(path, JSON.stringify({}))
        }


        /* code should never reach here */
        console.warn("no documents in path " + path)
        return {}


    }



    onsnapshot(path) {
        /* we are here making sure that each path has only ONE active firebase connection */

        if (this.activeListeners[path] != undefined) {

            this.activeListeners[path]['hasListener'] = true
                /* if we have an active listening store 
                    return that store
                */


            return this.activeListeners[path]['store']
        } else {
            /* create a read only store cause we'll be just listening for new 
            docs no need for writing to the store externally
            */


            const activeListeners = this.activeListeners
            const db = this.db
            activeListeners[path] = {}
            activeListeners[path]['hasListener'] = true
            activeListeners[path]['emits'] = 0
            let unsubscribe = () => console.log("store unsubscribe from store.js uniti")
            const resp = readable(undefined, function start(set) {





                if (!activeListeners[path]['listening']) {
                    activeListeners[path]['listening'] = true
                    unsubscribe = db.doc(path).onSnapshot(function(xdoc) {


                        activeListeners[path]['emits']++
                            set(xdoc)
                    });
                }


                return function stop() {

                    activeListeners[path]['hasListener'] = false

                    setTimeout(() => {

                        if (activeListeners[path]['hasListener'] == true) {

                            return
                        }

                        unsubscribe()
                        delete activeListeners[path]
                    }, 4000)

                };
            });
            activeListeners[path]['store'] = resp

            return activeListeners[path]['store']
        }
    }

}

export const dbWrapper = new FirebaseDBWrapper(db)